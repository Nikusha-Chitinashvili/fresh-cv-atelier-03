
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CVData } from '@/types/cv';
import { FileText, Share2, Printer, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface ExportToolsProps {
  cvData: CVData;
  template: string;
}

export const ExportTools = ({ cvData, template }: ExportToolsProps) => {
  const [lastError, setLastError] = useState<string | null>(null);

  const handlePrint = () => {
    try {
      window.print();
      toast.success('Print dialog opened successfully!');
    } catch (error) {
      console.error('Print error:', error);
      toast.error('Failed to open print dialog. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${cvData.personalInfo.fullName}'s CV`,
          text: 'Check out my professional CV',
          url: window.location.href,
        });
        toast.success('CV shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('CV link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('CV link copied to clipboard!');
      } catch (clipboardError) {
        toast.error('Failed to share or copy link. Please try again.');
      }
    }
  };

  const handleSaveData = () => {
    try {
      const dataStr = JSON.stringify(cvData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${cvData.personalInfo.fullName || 'cv'}-data.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('CV data saved successfully!');
    } catch (error) {
      console.error('Save data error:', error);
      toast.error('Failed to save CV data. Please try again.');
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Export & Share</h2>
      
      {lastError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <span>{lastError}</span>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center justify-center"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print CV
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="flex items-center justify-center"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share CV
        </Button>
        
        <Button 
          onClick={handleSaveData} 
          variant="outline" 
          className="flex items-center justify-center col-span-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          Save Data
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">📤 Available Export Options</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Print your CV directly from the browser</li>
          <li>• Share your CV link with others</li>
          <li>• Save your CV data as JSON for backup</li>
        </ul>
      </div>
    </Card>
  );
};
