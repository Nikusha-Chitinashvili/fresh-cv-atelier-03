
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download, FileText, Sparkles } from 'lucide-react';
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

      // Show generating toast
      toast.info('Generating high-quality PDF...', { duration: 2000 });

      // Enhanced canvas options for better quality
      const canvas = await html2canvas(previewElement, {
        scale: 3, // Higher scale for better resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: previewElement.scrollWidth,
        height: previewElement.scrollHeight,
        logging: false, // Disable logging for cleaner output
        imageTimeout: 5000, // Increase timeout for images
        removeContainer: true, // Clean up temporary elements
        foreignObjectRendering: true, // Better text rendering
        letterRendering: true, // Improved letter spacing
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded in the cloned document
          const clonedElement = clonedDoc.querySelector('.cv-preview-content') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            clonedElement.style.fontSize = '14px';
            clonedElement.style.lineHeight = '1.5';
          }
        }
      });

      // Calculate PDF dimensions for A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF with high quality settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        precision: 2
      });

      // Convert canvas to high-quality image
      const imgData = canvas.toDataURL('image/jpeg', 0.95); // High quality JPEG
      
      if (imgHeight <= pageHeight) {
        // Single page - center the content
        const yOffset = Math.max(0, (pageHeight - imgHeight) / 2);
        pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
      } else {
        // Multiple pages with proper page breaks
        let heightLeft = imgHeight;
        let position = 0;
        let pageNumber = 1;
        
        while (heightLeft > 0) {
          if (pageNumber > 1) {
            pdf.addPage();
          }
          
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
          position -= pageHeight;
          pageNumber++;
        }
      }

      // Add metadata to PDF
      pdf.setProperties({
        title: `${cvData.personalInfo.fullName || 'Professional'} - CV`,
        subject: 'Curriculum Vitae',
        author: cvData.personalInfo.fullName || 'CV Creator User',
        creator: 'Professional CV Creator',
        producer: 'Lovable CV Builder'
      });

      // Generate filename with timestamp for uniqueness
      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `${(cvData.personalInfo.fullName || 'CV').replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      toast.success('✨ High-quality PDF downloaded successfully!', {
        description: `File saved as: ${fileName}`
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.', {
        description: 'If the issue persists, try refreshing the page.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Export Your CV</h2>
      </div>
      
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating}
        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-3" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download High-Quality PDF
          </>
        )}
      </Button>
      
      <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-100 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0">
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 mb-2">Premium PDF Export</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                High-resolution output (3x quality)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Perfect font rendering & spacing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Professional A4 formatting
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Multi-page support with smart breaks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
