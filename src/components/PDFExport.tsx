
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
      // Find the CV preview element
      const element = document.querySelector('.cv-preview-content');
      
      if (!element) {
        console.error('CV preview element not found');
        return;
      }

      // Create high-quality canvas
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 3, // Higher resolution
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Calculate dimensions for A4 format
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let heightLeft = imgHeight;
      let position = 0;

      // Add the image to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `CV_${timestamp}.pdf`;

      // Download the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportToPDF}
      disabled={isExporting}
      className="flex items-center gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating PDF...
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
