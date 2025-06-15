
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
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
      // Create new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Helper function to add text with word wrapping
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * fontSize * 0.4);
      };

      // Header
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(cvData.personalInfo.fullName || 'Your Name', margin, yPosition);
      yPosition += 15;

      // Contact Info
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const contactInfo = [
        cvData.personalInfo.email,
        cvData.personalInfo.phone,
        cvData.personalInfo.address,
        cvData.personalInfo.linkedin,
        cvData.personalInfo.website
      ].filter(Boolean).join(' | ');
      
      if (contactInfo) {
        yPosition = addText(contactInfo, margin, yPosition, pageWidth - 2 * margin);
        yPosition += 10;
      }

      // Summary
      if (cvData.personalInfo.summary) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SUMMARY', margin, yPosition);
        yPosition += 8;
        
        pdf.setFont('helvetica', 'normal');
        yPosition = addText(cvData.personalInfo.summary, margin, yPosition, pageWidth - 2 * margin, 10);
        yPosition += 10;
      }

      // Experience
      if (cvData.experience.length > 0) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('EXPERIENCE', margin, yPosition);
        yPosition += 8;

        cvData.experience.forEach((exp) => {
          if (yPosition > pageHeight - 50) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(exp.position, margin, yPosition);
          
          pdf.setFont('helvetica', 'normal');
          const dateText = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
          pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), yPosition);
          yPosition += 6;

          pdf.setFontSize(10);
          pdf.text(exp.company, margin, yPosition);
          yPosition += 6;

          if (exp.description) {
            yPosition = addText(exp.description, margin, yPosition, pageWidth - 2 * margin, 9);
            yPosition += 3;
          }

          if (exp.achievements.length > 0 && exp.achievements[0]) {
            exp.achievements.filter(achievement => achievement.trim()).forEach((achievement) => {
              yPosition = addText(`• ${achievement}`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 9);
              yPosition += 2;
            });
          }
          yPosition += 8;
        });
      }

      // Education
      if (cvData.education.length > 0) {
        if (yPosition > pageHeight - 50) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('EDUCATION', margin, yPosition);
        yPosition += 8;

        cvData.education.forEach((edu) => {
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`, margin, yPosition);
          yPosition += 6;

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.text(edu.institution, margin, yPosition);
          yPosition += 5;

          const dateText = `${edu.startDate} - ${edu.endDate}`;
          pdf.text(dateText, margin, yPosition);
          yPosition += 8;
        });
      }

      // Skills
      if (cvData.skills.length > 0) {
        if (yPosition > pageHeight - 50) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('SKILLS', margin, yPosition);
        yPosition += 8;

        const skillsByCategory = cvData.skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill.name);
          return acc;
        }, {} as Record<string, string[]>);

        Object.entries(skillsByCategory).forEach(([category, skills]) => {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          const categoryTitle = category === 'technical' ? 'Technical Skills' : 
                               category === 'soft' ? 'Soft Skills' : 'Languages';
          pdf.text(`${categoryTitle}:`, margin, yPosition);
          yPosition += 5;

          pdf.setFont('helvetica', 'normal');
          yPosition = addText(skills.join(', '), margin + 5, yPosition, pageWidth - 2 * margin - 5, 9);
          yPosition += 8;
        });
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
          Download your CV as a professional PDF document ready for sharing or printing.
        </p>
      </div>
    </Card>
  );
};
