
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFExportProps {
  cvData: CVData;
  colorTheme: string;
}

export const PDFExport = ({ cvData, colorTheme }: PDFExportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Find the CV preview element
      const previewElement = document.querySelector('.cv-preview-content') as HTMLElement;
      
      if (!previewElement) {
        toast.error('Preview not found. Please wait for the preview to load.');
        return;
      }

      // Create canvas from the preview element
      const canvas = await html2canvas(previewElement, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: previewElement.scrollWidth,
        height: previewElement.scrollHeight,
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      if (imgHeight <= pageHeight) {
        // Single page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multiple pages
        let heightLeft = imgHeight;
        let position = 0;
        
        while (heightLeft >= 0) {
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
          
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }
      }

      // Save the PDF
      const fileName = `${cvData.personalInfo.fullName || 'CV'}.pdf`;
      pdf.save(fileName);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Export CV</h2>
      
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating}
        className="w-full flex items-center justify-center"
      >
        <Download className="h-4 w-4 mr-2" />
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </Button>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">📄 PDF Export</h3>
        <p className="text-sm text-blue-700">
          Download your CV as a professional PDF document that matches the live preview exactly.
        </p>
      </div>
    </Card>
  );
};
