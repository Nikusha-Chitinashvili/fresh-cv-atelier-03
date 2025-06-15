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
      toast("Generating high-quality PDF...");
      
      // Find the CV preview element
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast.error("Error: CV preview not found");
        return;
      }

      // Temporarily remove any transforms that might affect rendering
      const originalTransform = cvElement.style.transform;
      const originalTransformOrigin = cvElement.style.transformOrigin;
      cvElement.style.transform = 'none';
      cvElement.style.transformOrigin = 'initial';

      // Wait a bit for layout to settle
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create ultra high-quality canvas with professional settings
      const canvas = await html2canvas(cvElement, {
        scale: 4, // Ultra high DPI for crisp graphics
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: cvElement.scrollWidth,
        height: cvElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200, // Fixed width for consistency
        windowHeight: cvElement.scrollHeight,
        ignoreElements: (element) => {
          // Ignore any elements that might cause issues
          return element.classList?.contains('no-print') || false;
        },
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded in the cloned document
          const clonedElement = clonedDoc.querySelector('[data-cv-template]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            // Ensure all text is black for better contrast
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el: any) => {
              const computedStyle = window.getComputedStyle(el);
              if (computedStyle.color && computedStyle.color.includes('rgb')) {
                // Keep colored elements but ensure good contrast
                el.style.color = computedStyle.color;
              }
            });
          }
        }
      });

      // Restore original transform
      cvElement.style.transform = originalTransform;
      cvElement.style.transformOrigin = originalTransformOrigin;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Professional A4 dimensions in points (72 DPI)
      const a4WidthPt = 595.28;
      const a4HeightPt = 841.89;
      
      // Calculate optimal scaling to fit content while maintaining quality
      const margin = 20; // 20pt margin on all sides
      const maxWidth = a4WidthPt - (margin * 2);
      const maxHeight = a4HeightPt - (margin * 2);
      
      // Calculate scale to fit the content optimally
      const scaleX = maxWidth / imgWidth;
      const scaleY = maxHeight / imgHeight;
      const optimalScale = Math.min(scaleX, scaleY);
      
      const finalWidth = imgWidth * optimalScale;
      const finalHeight = imgHeight * optimalScale;

      // Create PDF with professional settings
      const pdf = new jsPDF({
        orientation: finalHeight > finalWidth ? 'portrait' : 'landscape',
        unit: 'pt',
        format: 'a4',
        compress: false, // Don't compress for better quality
        precision: 16
      });

      // Center the content on the page
      const x = (pdf.internal.pageSize.getWidth() - finalWidth) / 2;
      const y = (pdf.internal.pageSize.getHeight() - finalHeight) / 2;
      
      // Add image with maximum quality settings
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0), // Use PNG for better quality
        'PNG',
        x,
        y,
        finalWidth,
        finalHeight,
        undefined,
        'MEDIUM' // Better compression balance
      );

      // Add metadata for professionalism
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} CV`,
        subject: 'Curriculum Vitae',
        author: cvData.personalInfo.fullName || 'CV Creator',
        creator: 'Professional CV Creator'
      });

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${(cvData.personalInfo.fullName || 'CV').replace(/[^a-zA-Z0-9]/g, '_')}_${currentDate}.pdf`;
      
      // Save with professional filename
      pdf.save(fileName);
      
      toast.success("Professional PDF downloaded successfully!");
      
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
        <h3 className="font-medium text-blue-900 mb-2">✨ Professional Features</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Ultra high-quality PDF generation (4x DPI)</li>
          <li>• Perfect replica of your live preview</li>
          <li>• Optimized for professional printing</li>
          <li>• Automatic filename with date stamp</li>
          <li>• Single page layout with smart scaling</li>
        </ul>
      </div>
    </Card>
  );
};
