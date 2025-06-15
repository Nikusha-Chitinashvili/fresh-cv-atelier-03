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
      toast.loading("Generating pixel-perfect PDF...");
      
      // Find the CV template element
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast.error("Error: CV preview not found");
        return;
      }

      // Get the preview container and temporarily remove scaling
      const previewContainer = cvElement.closest('.transform') as HTMLElement;
      let originalStyles = {
        transform: '',
        width: '',
        height: '',
        overflow: ''
      };
      
      if (previewContainer) {
        originalStyles.transform = previewContainer.style.transform;
        originalStyles.width = previewContainer.style.width;
        originalStyles.height = previewContainer.style.height;
        originalStyles.overflow = previewContainer.style.overflow;
        
        // Reset to natural size for capture
        previewContainer.style.transform = 'scale(1)';
        previewContainer.style.width = 'auto';
        previewContainer.style.height = 'auto';
        previewContainer.style.overflow = 'visible';
      }

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get natural dimensions
      const rect = cvElement.getBoundingClientRect();
      const naturalWidth = cvElement.scrollWidth || rect.width;
      const naturalHeight = cvElement.scrollHeight || rect.height;

      // Create high-resolution canvas with better settings
      const canvas = await html2canvas(cvElement, {
        scale: 2, // High DPI for crisp rendering
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
        imageTimeout: 15000,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure the cloned document renders properly
          const clonedElement = clonedDoc.querySelector('[data-cv-template]') as HTMLElement;
          if (clonedElement) {
            // Fix font loading issues
            clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            
            // Ensure all elements have proper color adjustment for PDF
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: HTMLElement) => {
              el.style.webkitPrintColorAdjust = 'exact';
              el.style.colorAdjust = 'exact';
              el.style.printColorAdjust = 'exact';
            });
            
            // Fix any scaling issues in the clone
            clonedElement.style.transform = 'none';
            clonedElement.style.width = naturalWidth + 'px';
            clonedElement.style.height = 'auto';
          }
        }
      });

      // Restore original styles
      if (previewContainer) {
        previewContainer.style.transform = originalStyles.transform;
        previewContainer.style.width = originalStyles.width;
        previewContainer.style.height = originalStyles.height;
        previewContainer.style.overflow = originalStyles.overflow;
      }

      // Calculate PDF dimensions (A4 proportions but custom size to fit content)
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Convert to points (72 DPI standard) with proper scaling
      const pdfWidth = (canvasWidth * 72) / 96; // 96 DPI to 72 DPI conversion
      const pdfHeight = (canvasHeight * 72) / 96;
      
      // Create PDF with exact dimensions to match the CV
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true,
        precision: 2
      });

      // Add the high-quality image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );

      // Add professional metadata
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} - CV`,
        subject: 'Curriculum Vitae',
        author: cvData.personalInfo.fullName || 'CV Creator',
        creator: 'Professional CV Builder'
      });

      // Generate clean filename
      const currentDate = new Date().toISOString().split('T')[0];
      const cleanName = (cvData.personalInfo.fullName || 'CV')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      const fileName = `${cleanName}_CV_${currentDate}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      toast.success("Perfect PDF generated! 🎉");
      
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
      
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-900 mb-2">🎯 Pixel-Perfect PDF</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Exact replica of your live preview</li>
          <li>• Professional high-resolution output</li>
          <li>• Perfect color and font rendering</li>
          <li>• Custom page size optimized for your CV</li>
          <li>• Ready for professional printing</li>
        </ul>
      </div>
    </Card>
  );
};
