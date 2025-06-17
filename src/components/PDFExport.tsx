
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      // Find the CV preview element with the specific class
      const element = document.querySelector('.cv-preview-content');
      
      if (!element) {
        console.error('CV preview element not found');
        alert('CV preview element not found. Please try again.');
        return;
      }

      console.log('Starting PDF export...');

      // Temporarily reset transform for capturing
      const originalStyle = (element as HTMLElement).style.transform;
      const originalWidth = (element as HTMLElement).style.width;
      
      (element as HTMLElement).style.transform = 'scale(1)';
      (element as HTMLElement).style.width = 'auto';

      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create high-quality canvas with enhanced settings
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2, // High DPI for crisp text
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          // Ignore any overlay elements or buttons that might interfere
          return element.classList?.contains('no-pdf') || false;
        }
      });

      // Restore original styles
      (element as HTMLElement).style.transform = originalStyle;
      (element as HTMLElement).style.width = originalWidth;

      // Calculate dimensions for A4 format (210 x 297 mm)
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF with A4 format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Convert canvas to high-quality image
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename with current date
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const filename = `CV_${dateStr}.pdf`;

      // Save the PDF
      pdf.save(filename);
      
      console.log('PDF exported successfully');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF}
      disabled={isExporting}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      size="sm"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
};
