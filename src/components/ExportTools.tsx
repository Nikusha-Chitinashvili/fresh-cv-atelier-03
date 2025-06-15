import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download, FileText, Share2, Printer, Image } from 'lucide-react';
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

  const handleDownloadImage = async () => {
    try {
      toast.loading("Capturing CV preview as image...");
      
      // Find the CV template element directly (not the scaled container)
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast.error("Error: CV preview not found");
        return;
      }

      // Find the scaled container and temporarily remove scaling
      const scaledContainer = cvElement.closest('.transform') as HTMLElement;
      let originalTransform = '';
      
      if (scaledContainer) {
        originalTransform = scaledContainer.style.transform;
        scaledContainer.style.transform = 'scale(1)';
        scaledContainer.style.transformOrigin = 'top left';
      }

      // Allow layout to stabilize after removing scale
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get the full dimensions including all margins and padding
      const rect = cvElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(cvElement);
      
      // Create high-resolution canvas with full element dimensions
      const canvas = await html2canvas(cvElement, {
        scale: 2, // High DPI for crisp image
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        logging: false
      });

      // Restore original transform immediately
      if (scaledContainer) {
        scaledContainer.style.transform = originalTransform;
      }

      // Convert to high-quality PNG and download
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create download link
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
      
      toast.success("CV image downloaded successfully! 🎉");
      
    } catch (error) {
      console.error('Image download error:', error);
      toast.error("Failed to download image. Please try again.");
    }
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

      // Find the scaled container and temporarily remove scaling
      const scaledContainer = cvElement.closest('.transform') as HTMLElement;
      let originalTransform = '';
      
      if (scaledContainer) {
        originalTransform = scaledContainer.style.transform;
        scaledContainer.style.transform = 'scale(1)';
        scaledContainer.style.transformOrigin = 'top left';
      }

      // Allow layout to stabilize after removing scale
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get the full dimensions including all margins and padding
      const rect = cvElement.getBoundingClientRect();
      
      // Create ultra-high-resolution canvas with same settings as image
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Same as image for consistency
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        logging: false
      });

      // Restore original transform immediately
      if (scaledContainer) {
        scaledContainer.style.transform = originalTransform;
      }

      // Calculate PDF dimensions to match the captured canvas exactly
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Convert canvas dimensions to PDF points (72 DPI standard)
      // Scale factor accounts for the 2x scale we used in html2canvas
      const scaleFactor = 72 / (96 * 2); // 96 DPI default, 2x scale, 72 points per inch
      const pdfWidth = canvasWidth * scaleFactor;
      const pdfHeight = canvasHeight * scaleFactor;
      
      // Create PDF with exact dimensions matching the image
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true
      });

      // Convert to high-quality PNG and add to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST' // Use FAST for better compatibility
      );

      // Add metadata
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} - CV`,
        subject: 'Professional CV',
        author: cvData.personalInfo.fullName || 'CV Builder User',
        creator: 'Professional CV Builder'
      });

      // Generate filename
      const currentDate = new Date().toISOString().split('T')[0];
      const cleanName = (cvData.personalInfo.fullName || 'Professional_CV')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40);
      const fileName = `${cleanName}_CV_${currentDate}.pdf`;
      
      // Save the PDF
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
        <Button onClick={handleDownloadImage} className="flex items-center justify-center">
          <Image className="h-4 w-4 mr-2" />
          Download Image
        </Button>
        
        <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center justify-center">
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
        
        <Button onClick={handleSaveData} variant="outline" className="flex items-center justify-center col-span-full">
          <FileText className="h-4 w-4 mr-2" />
          Save Data
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">📸 High-Quality Image Export</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Perfect replica of your live preview</li>
          <li>• High-resolution PNG format (2x DPI)</li>
          <li>• Full width and natural dimensions with all spacing</li>
          <li>• Ready for sharing on social media or portfolios</li>
        </ul>
      </div>
    </Card>
  );
};
