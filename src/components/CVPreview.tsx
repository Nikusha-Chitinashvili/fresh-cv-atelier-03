
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';

interface CVPreviewProps {
  cvData: CVData;
  template: string;
}

export const CVPreview = ({ cvData, template }: CVPreviewProps) => {
  const renderTemplate = () => {
    return <ModernTemplate cvData={cvData} />;
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500 capitalize">Modern Professional</span>
        </div>
      </div>
      
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
          {renderTemplate()}
        </div>
      </div>
    </Card>
  );
};
