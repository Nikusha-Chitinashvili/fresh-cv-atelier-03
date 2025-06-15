
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CVData } from '@/types/cv';
import { Download, FileText, Share2, Printer, Image, Loader2, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { useState } from 'react';

interface ExportToolsProps {
  cvData: CVData;
  template: string;
}

interface LoadingState {
  isLoading: boolean;
  progress: number;
  step: string;
}

export const ExportTools = ({ cvData, template }: ExportToolsProps) => {
  const [imageLoading, setImageLoading] = useState<LoadingState>({ isLoading: false, progress: 0, step: '' });
  const [pdfLoading, setPdfLoading] = useState<LoadingState>({ isLoading: false, progress: 0, step: '' });
  const [lastError, setLastError] = useState<string | null>(null);

  const updateProgress = (setter: React.Dispatch<React.SetStateAction<LoadingState>>, progress: number, step: string) => {
    setter(prev => ({ ...prev, progress, step }));
  };

  const getCVElement = (): HTMLElement | null => {
    const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
    if (!cvElement) {
      throw new Error('CV preview not found. Please ensure the CV is fully loaded before exporting.');
    }
    return cvElement;
  };

  const prepareElementForCapture = (cvElement: HTMLElement) => {
    const scaledContainer = cvElement.closest('.transform') as HTMLElement;
    let originalTransform = '';
    
    if (scaledContainer) {
      originalTransform = scaledContainer.style.transform;
      scaledContainer.style.transform = 'scale(1)';
      scaledContainer.style.transformOrigin = 'top left';
    }
    
    return { scaledContainer, originalTransform };
  };

  const restoreElement = (scaledContainer: HTMLElement | null, originalTransform: string) => {
    if (scaledContainer) {
      scaledContainer.style.transform = originalTransform;
    }
  };

  const generateCanvas = async (cvElement: HTMLElement, onProgress?: (progress: number) => void): Promise<HTMLCanvasElement> => {
    const rect = cvElement.getBoundingClientRect();
    
    onProgress?.(20);
    
    // Optimized canvas settings for better performance
    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
      logging: false,
      removeContainer: true,
      foreignObjectRendering: false,
      imageTimeout: 15000
    });

    onProgress?.(80);
    return canvas;
  };

  const handlePrint = () => {
    try {
      window.print();
      toast.success('Print dialog opened successfully!');
    } catch (error) {
      console.error('Print error:', error);
      toast.error('Failed to open print dialog. Please try again.');
    }
  };

  const handleDownloadImage = async () => {
    setImageLoading({ isLoading: true, progress: 0, step: 'Preparing CV for export...' });
    setLastError(null);

    try {
      let cvElement: HTMLElement;
      let preparedElement: ReturnType<typeof prepareElementForCapture>;

      // Step 1: Find and prepare element
      updateProgress(setImageLoading, 10, 'Locating CV element...');
      cvElement = getCVElement();
      
      updateProgress(setImageLoading, 15, 'Preparing element for capture...');
      preparedElement = prepareElementForCapture(cvElement);

      // Step 2: Wait for layout stabilization
      updateProgress(setImageLoading, 25, 'Stabilizing layout...');
      await new Promise(resolve => setTimeout(resolve, 150));

      // Step 3: Generate canvas
      updateProgress(setImageLoading, 30, 'Capturing CV as image...');
      const canvas = await generateCanvas(cvElement, (progress) => {
        updateProgress(setImageLoading, 30 + (progress * 0.5), 'Rendering high-quality image...');
      });

      // Step 4: Restore element immediately
      restoreElement(preparedElement.scaledContainer, preparedElement.originalTransform);

      // Step 5: Process and download
      updateProgress(setImageLoading, 85, 'Processing image data...');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      updateProgress(setImageLoading, 95, 'Preparing download...');
      const currentDate = new Date().toISOString().split('T')[0];
      const cleanName = (cvData.personalInfo.fullName || 'CV')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40);
      const fileName = `${cleanName}_CV_${currentDate}.png`;
      
      const link = document.createElement('a');
      link.download = fileName;
      link.href = imgData;
      link.click();
      
      updateProgress(setImageLoading, 100, 'Download complete!');
      toast.success(`High-quality CV image downloaded as ${fileName}! 🎉`);
      
    } catch (error) {
      console.error('Image download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setLastError(`Image export failed: ${errorMessage}`);
      toast.error("Failed to download image. Please try again or refresh the page.");
    } finally {
      setTimeout(() => {
        setImageLoading({ isLoading: false, progress: 0, step: '' });
      }, 1000);
    }
  };

  const handleDownloadPDF = async () => {
    setPdfLoading({ isLoading: true, progress: 0, step: 'Preparing PDF generation...' });
    setLastError(null);

    try {
      let cvElement: HTMLElement;
      let preparedElement: ReturnType<typeof prepareElementForCapture>;

      // Step 1: Find and prepare element
      updateProgress(setPdfLoading, 10, 'Locating CV element...');
      cvElement = getCVElement();
      
      updateProgress(setPdfLoading, 15, 'Preparing element for PDF...');
      preparedElement = prepareElementForCapture(cvElement);

      // Step 2: Wait for layout stabilization
      updateProgress(setPdfLoading, 25, 'Stabilizing layout...');
      await new Promise(resolve => setTimeout(resolve, 150));

      // Step 3: Generate canvas
      updateProgress(setPdfLoading, 30, 'Capturing CV for PDF...');
      const canvas = await generateCanvas(cvElement, (progress) => {
        updateProgress(setPdfLoading, 30 + (progress * 0.4), 'Rendering PDF content...');
      });

      // Step 4: Restore element immediately
      restoreElement(preparedElement.scaledContainer, preparedElement.originalTransform);

      // Step 5: Create PDF
      updateProgress(setPdfLoading, 75, 'Creating PDF document...');
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const scaleFactor = 72 / (96 * 2);
      const pdfWidth = canvasWidth * scaleFactor;
      const pdfHeight = canvasHeight * scaleFactor;
      
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true
      });

      updateProgress(setPdfLoading, 85, 'Adding content to PDF...');
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

      // Add metadata
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} - CV`,
        subject: 'Professional CV',
        author: cvData.personalInfo.fullName || 'CV Builder User',
        creator: 'Professional CV Builder'
      });

      updateProgress(setPdfLoading, 95, 'Finalizing PDF...');
      const currentDate = new Date().toISOString().split('T')[0];
      const cleanName = (cvData.personalInfo.fullName || 'Professional_CV')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40);
      const fileName = `${cleanName}_CV_${currentDate}.pdf`;
      
      pdf.save(fileName);
      
      updateProgress(setPdfLoading, 100, 'PDF ready!');
      toast.success(`Perfect PDF generated as ${fileName}! 🎉`);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setLastError(`PDF generation failed: ${errorMessage}`);
      toast.error("Failed to generate PDF. Please try again or refresh the page.");
    } finally {
      setTimeout(() => {
        setPdfLoading({ isLoading: false, progress: 0, step: '' });
      }, 1000);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${cvData.personalInfo.fullName}'s CV`,
          text: 'Check out my professional CV',
          url: window.location.href,
        });
        toast.success('CV shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('CV link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('CV link copied to clipboard!');
      } catch (clipboardError) {
        toast.error('Failed to share or copy link. Please try again.');
      }
    }
  };

  const handleSaveData = () => {
    try {
      const dataStr = JSON.stringify(cvData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${cvData.personalInfo.fullName || 'cv'}-data.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('CV data saved successfully!');
    } catch (error) {
      console.error('Save data error:', error);
      toast.error('Failed to save CV data. Please try again.');
    }
  };

  const retryLastOperation = () => {
    setLastError(null);
    if (imageLoading.isLoading) {
      handleDownloadImage();
    } else if (pdfLoading.isLoading) {
      handleDownloadPDF();
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Export & Share</h2>
      
      {lastError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{lastError}</span>
            <Button variant="outline" size="sm" onClick={retryLastOperation}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {(imageLoading.isLoading || pdfLoading.isLoading) && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="font-medium text-blue-900">
              {imageLoading.isLoading ? 'Generating Image...' : 'Generating PDF...'}
            </span>
          </div>
          <Progress 
            value={imageLoading.isLoading ? imageLoading.progress : pdfLoading.progress} 
            className="mb-2" 
          />
          <p className="text-sm text-blue-700">
            {imageLoading.isLoading ? imageLoading.step : pdfLoading.step}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={handleDownloadImage} 
          disabled={imageLoading.isLoading || pdfLoading.isLoading}
          className="flex items-center justify-center"
        >
          {imageLoading.isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Image className="h-4 w-4 mr-2" />
          )}
          Download Image
        </Button>
        
        <Button 
          onClick={handleDownloadPDF} 
          variant="outline" 
          disabled={imageLoading.isLoading || pdfLoading.isLoading}
          className="flex items-center justify-center"
        >
          {pdfLoading.isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download PDF
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          disabled={imageLoading.isLoading || pdfLoading.isLoading}
          className="flex items-center justify-center"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print CV
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          disabled={imageLoading.isLoading || pdfLoading.isLoading}
          className="flex items-center justify-center"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share CV
        </Button>
        
        <Button 
          onClick={handleSaveData} 
          variant="outline" 
          disabled={imageLoading.isLoading || pdfLoading.isLoading}
          className="flex items-center justify-center col-span-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          Save Data
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">⚡ Optimized Export Process</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Real-time progress tracking with detailed steps</li>
          <li>• Enhanced error handling with retry functionality</li>
          <li>• Optimized rendering for faster generation</li>
          <li>• Perfect replica preservation of layout and spacing</li>
        </ul>
      </div>
    </Card>
  );
};
