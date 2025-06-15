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
      toast("Generating PDF...");
      
      // Find the CV preview element
      const cvElement = document.querySelector('[data-cv-template]') as HTMLElement;
      
      if (!cvElement) {
        toast("Error: CV preview not found");
        return;
      }

      // Create high-quality canvas
      const canvas = await html2canvas(cvElement, {
        scale: 3, // High DPI scaling for crisp graphics
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: cvElement.scrollWidth,
        height: cvElement.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: cvElement.scrollWidth,
        windowHeight: cvElement.scrollHeight
      });

      // Calculate dimensions to fit entire CV on one page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // A4 dimensions in mm
      const a4Width = 210;
      const a4Height = 297;
      
      // Calculate the best fit scaling
      const scaleX = a4Width / (imgWidth * 0.264583); // Convert pixels to mm
      const scaleY = a4Height / (imgHeight * 0.264583);
      const scale = Math.min(scaleX, scaleY);
      
      const finalWidth = imgWidth * 0.264583 * scale;
      const finalHeight = imgHeight * 0.264583 * scale;

      // Create PDF
      const pdf = new jsPDF({
        orientation: finalHeight > finalWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add image to PDF, centered
      const x = (pdf.internal.pageSize.getWidth() - finalWidth) / 2;
      const y = (pdf.internal.pageSize.getHeight() - finalHeight) / 2;
      
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        x,
        y,
        finalWidth,
        finalHeight,
        undefined,
        'FAST'
      );

      // Save PDF
      const fileName = `${cvData.personalInfo.fullName || 'CV'}.pdf`;
      pdf.save(fileName);
      
      toast("PDF downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast("Error generating PDF. Please try again.");
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
      alert('CV link copied to clipboard!');
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
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• PDF will be generated as a single page with high quality</li>
          <li>• Save your data to continue editing later</li>
          <li>• Share your CV link with potential employers</li>
          <li>• Try different color themes for various industries</li>
        </ul>
      </div>
    </Card>
  );
};
