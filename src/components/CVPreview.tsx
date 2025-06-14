
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';

interface CVPreviewProps {
  cvData: CVData;
  template: string;
}

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="text-sm text-gray-500">Modern Template</div>
      </div>
      
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
          <ModernTemplate cvData={cvData} />
        </div>
      </div>
    </Card>
  );
};
