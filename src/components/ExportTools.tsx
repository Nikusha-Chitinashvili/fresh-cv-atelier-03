
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
      toast("Generating crystal-clear PDF...");
      
      // Find the CV preview element - look for the actual template inside the preview
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast.error("Error: CV preview not found");
        return;
      }

      // Remove any scaling transforms temporarily to get the natural size
      const previewContainer = cvElement.closest('.transform') as HTMLElement;
      let originalTransform = '';
      let originalWidth = '';
      
      if (previewContainer) {
        originalTransform = previewContainer.style.transform;
        originalWidth = previewContainer.style.width;
        previewContainer.style.transform = 'scale(1)';
        previewContainer.style.width = 'auto';
      }

      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 200));

      // Get the actual dimensions of the unscaled CV
      const rect = cvElement.getBoundingClientRect();
      const actualWidth = cvElement.scrollWidth || rect.width;
      const actualHeight = cvElement.scrollHeight || rect.height;

      // Create ultra high-quality canvas
      const canvas = await html2canvas(cvElement, {
        scale: 3, // High DPI for crisp text and graphics
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: actualWidth,
        height: actualHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: actualWidth,
        windowHeight: actualHeight,
        removeContainer: false,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Ensure fonts render properly in the clone
          const clonedElement = clonedDoc.querySelector('[data-cv-template]') as HTMLElement;
          if (clonedElement) {
            // Force font loading
            clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            
            // Ensure all elements are visible
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: any) => {
              el.style.webkitPrintColorAdjust = 'exact';
              el.style.colorAdjust = 'exact';
            });
          }
        }
      });

      // Restore original transforms
      if (previewContainer) {
        previewContainer.style.transform = originalTransform;
        previewContainer.style.width = originalWidth;
      }

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate PDF dimensions to fit the content perfectly
      // Use points (72 DPI standard)
      const pdfWidth = (imgWidth * 72) / (canvas.width / actualWidth) / 3; // Adjust for scale factor
      const pdfHeight = (imgHeight * 72) / (canvas.height / actualHeight) / 3; // Adjust for scale factor
      
      // Create PDF with exact dimensions to match content
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: [pdfWidth, pdfHeight], // Custom format to match content exactly
        compress: false
      });

      // Add the image to fill the entire PDF page
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0, // No margins - fill entire page
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST' // Use FAST for better quality with our high-res canvas
      );

      // Add professional metadata
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} CV`,
        subject: 'Curriculum Vitae',
        author: cvData.personalInfo.fullName || 'CV Creator',
        creator: 'Professional CV Creator'
      });

      // Generate filename
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${(cvData.personalInfo.fullName || 'CV').replace(/[^a-zA-Z0-9]/g, '_')}_${currentDate}.pdf`;
      
      pdf.save(fileName);
      
      toast.success("Crystal-clear PDF downloaded successfully!");
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Error generating PDF. Please try again.");
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
      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">✨ Crystal Clear PDF</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Perfect replica of your live preview</li>
          <li>• High-resolution rendering (3x DPI)</li>
          <li>• Custom page size to fit your CV exactly</li>
          <li>• Professional print quality</li>
          <li>• Zero compression for maximum clarity</li>
        </ul>
      </div>
    </Card>
  );
};
