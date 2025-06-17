
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';
import { PDFExport } from './PDFExport';

interface CVPreviewProps {
  cvData: CVData;
  colorTheme: string;
}

export const CVPreview = ({ cvData, colorTheme }: CVPreviewProps) => {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">Modern Template</div>
          <PDFExport />
        </div>
      </div>
      
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div 
          className="cv-preview-content transform scale-75 origin-top-left" 
          style={{ width: '133.33%', height: 'auto' }}
        >
          <ModernTemplate cvData={cvData} colorTheme={colorTheme} />
        </div>
      </div>
    </Card>
  );
};
