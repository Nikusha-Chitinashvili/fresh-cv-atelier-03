
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { Download, FileText, Share2, Printer } from 'lucide-react';

interface ExportToolsProps {
  cvData: CVData;
  template: string;
}

export const ExportTools = ({ cvData, template }: ExportToolsProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    console.log('Downloading PDF with template:', template);
    // This is a placeholder for the actual PDF generation
    alert('PDF download functionality would be implemented here');
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
          <li>• Use Print to save as PDF in most browsers</li>
          <li>• Save your data to continue editing later</li>
          <li>• Share your CV link with potential employers</li>
          <li>• Try different templates for various industries</li>
        </ul>
      </div>
    </Card>
  );
};
