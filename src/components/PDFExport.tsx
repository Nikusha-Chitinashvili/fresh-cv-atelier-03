
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

      // Temporarily reset transform and get original dimensions
      const originalStyle = (element as HTMLElement).style.transform;
      const originalWidth = (element as HTMLElement).style.width;
      
      (element as HTMLElement).style.transform = 'scale(1)';
      (element as HTMLElement).style.width = 'auto';

      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get the actual dimensions of the CV content
      const rect = element.getBoundingClientRect();
      const actualWidth = element.scrollWidth;
      const actualHeight = element.scrollHeight;

      // Create high-quality canvas at original size
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2, // High DPI for crisp text
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: actualWidth,
        height: actualHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          return element.classList?.contains('no-pdf') || false;
        }
      });

      // Restore original styles
      (element as HTMLElement).style.transform = originalStyle;
      (element as HTMLElement).style.width = originalWidth;

      // Calculate PDF dimensions based on canvas size
      // Convert pixels to mm (assuming 96 DPI: 1 inch = 25.4mm, 1 inch = 96px)
      const pdfWidth = (canvas.width / 2) * 0.264583; // Convert to mm (scale/2 because we used scale:2)
      const pdfHeight = (canvas.height / 2) * 0.264583; // Convert to mm

      // Create PDF with custom dimensions to fit the entire CV
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
        compress: true
      });

      // Convert canvas to high-quality image
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Add the entire CV as one image on one page
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

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
