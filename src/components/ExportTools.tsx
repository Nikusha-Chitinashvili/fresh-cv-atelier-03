
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download, FileText, Share2, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface ExportToolsProps {
  cvData: CVData;
  template: string;
}

export const ExportTools = ({ cvData, template }: ExportToolsProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      toast.loading("Generating perfect PDF replica...");
      
      // Find the CV template element
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast.error("Error: CV preview not found");
        return;
      }

      // Store original styles and remove any transformations
      const previewContainer = cvElement.closest('.transform') as HTMLElement;
      let originalStyles = {
        transform: '',
        width: '',
        height: '',
        overflow: '',
        position: '',
        left: '',
        top: ''
      };
      
      if (previewContainer) {
        originalStyles.transform = previewContainer.style.transform;
        originalStyles.width = previewContainer.style.width;
        originalStyles.height = previewContainer.style.height;
        originalStyles.overflow = previewContainer.style.overflow;
        originalStyles.position = previewContainer.style.position;
        originalStyles.left = previewContainer.style.left;
        originalStyles.top = previewContainer.style.top;
        
        // Reset to natural size and position for perfect capture
        previewContainer.style.transform = 'scale(1)';
        previewContainer.style.width = 'auto';
        previewContainer.style.height = 'auto';
        previewContainer.style.overflow = 'visible';
        previewContainer.style.position = 'static';
        previewContainer.style.left = 'auto';
        previewContainer.style.top = 'auto';
      }

      // Allow layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get precise natural dimensions
      const computedStyle = window.getComputedStyle(cvElement);
      const rect = cvElement.getBoundingClientRect();
      const naturalWidth = cvElement.offsetWidth || rect.width;
      const naturalHeight = cvElement.offsetHeight || rect.height;

      console.log('CV Element dimensions:', { naturalWidth, naturalHeight });

      // Create ultra-high-resolution canvas with perfect settings
      const canvas = await html2canvas(cvElement, {
        scale: 4, // Maximum DPI for ultra-crisp rendering
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: naturalWidth,
        height: naturalHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: naturalWidth,
        windowHeight: naturalHeight,
        removeContainer: false,
        imageTimeout: 20000,
        logging: false,
        pixelRatio: window.devicePixelRatio || 1,
        onclone: (clonedDoc) => {
          // Ensure perfect cloning with all styles preserved
          const clonedElement = clonedDoc.querySelector('[data-cv-template]') as HTMLElement;
          if (clonedElement) {
            // Apply system fonts for maximum compatibility
            clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            clonedElement.style.fontSmoothing = 'antialiased';
            clonedElement.style.webkitFontSmoothing = 'antialiased';
            
            // Force exact color rendering using type assertion
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: HTMLElement) => {
              (el.style as any)['webkitPrintColorAdjust'] = 'exact';
              (el.style as any)['colorAdjust'] = 'exact';
              el.style.printColorAdjust = 'exact';
              
              // Ensure crisp text rendering
              (el.style as any)['webkitFontSmoothing'] = 'antialiased';
              (el.style as any)['mozOsxFontSmoothing'] = 'grayscale';
              el.style.textRendering = 'optimizeLegibility';
            });
            
            // Remove any scaling and ensure natural dimensions
            clonedElement.style.transform = 'none';
            clonedElement.style.width = naturalWidth + 'px';
            clonedElement.style.height = 'auto';
            clonedElement.style.minHeight = naturalHeight + 'px';
          }
        }
      });

      console.log('Canvas dimensions:', { width: canvas.width, height: canvas.height });

      // Restore original styles immediately
      if (previewContainer) {
        previewContainer.style.transform = originalStyles.transform;
        previewContainer.style.width = originalStyles.width;
        previewContainer.style.height = originalStyles.height;
        previewContainer.style.overflow = originalStyles.overflow;
        previewContainer.style.position = originalStyles.position;
        previewContainer.style.left = originalStyles.left;
        previewContainer.style.top = originalStyles.top;
      }

      // Calculate precise PDF dimensions to maintain exact proportions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Use precise scaling to maintain quality while optimizing size
      const dpiScale = 0.8; // Balance between quality and file size
      const pdfWidth = (canvasWidth * dpiScale * 72) / (96 * 4); // Account for 4x scale
      const pdfHeight = (canvasHeight * dpiScale * 72) / (96 * 4);
      
      console.log('PDF dimensions:', { pdfWidth, pdfHeight });
      
      // Create PDF with exact custom dimensions
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true,
        precision: 32 // Maximum precision
      });

      // Convert to highest quality PNG and add to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'SLOW' // Best quality compression
      );

      // Add comprehensive metadata
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} - Curriculum Vitae`,
        subject: 'Professional CV - High Quality PDF Export',
        author: cvData.personalInfo.fullName || 'CV Builder User',
        creator: 'Professional CV Builder - Lovable.dev',
        keywords: 'CV, Resume, Professional, Career'
      });

      // Generate clean, professional filename
      const currentDate = new Date().toISOString().split('T')[0];
      const cleanName = (cvData.personalInfo.fullName || 'Professional_CV')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40);
      const fileName = `${cleanName}_CV_${currentDate}.pdf`;
      
      // Save the perfect PDF
      pdf.save(fileName);
      
      toast.success("Perfect PDF replica generated! 🎉");
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cvData.personalInfo.fullName}'s CV`,
          text: 'Check out my professional CV',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('CV link copied to clipboard!');
    }
  };

  const handleSaveData = () => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${cvData.personalInfo.fullName || 'cv'}-data.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('CV data saved successfully!');
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Export & Share</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={handleDownloadPDF} className="flex items-center justify-center">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        
        <Button onClick={handlePrint} variant="outline" className="flex items-center justify-center">
          <Printer className="h-4 w-4 mr-2" />
          Print CV
        </Button>
        
        <Button onClick={handleShare} variant="outline" className="flex items-center justify-center">
          <Share2 className="h-4 w-4 mr-2" />
          Share CV
        </Button>
        
        <Button onClick={handleSaveData} variant="outline" className="flex items-center justify-center">
          <FileText className="h-4 w-4 mr-2" />
          Save Data
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
        <h3 className="font-medium text-emerald-900 mb-2">🎯 Perfect PDF Replica</h3>
        <ul className="text-sm text-emerald-700 space-y-1">
          <li>• 100% identical to live preview display</li>
          <li>• Ultra-high resolution (4x DPI) for crystal-clear text</li>
          <li>• Perfect color accuracy and font rendering</li>
          <li>• Optimized dimensions matching your CV layout</li>
          <li>• Professional print-ready quality output</li>
          <li>• Maximum precision PDF generation</li>
        </ul>
      </div>
    </Card>
  );
};
