
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface CVPreviewProps {
  cvData: CVData;
  template: string;
}

export const CVPreview = ({ cvData, template }: CVPreviewProps) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate cvData={cvData} />;
      case 'classic':
        return <ClassicTemplate cvData={cvData} />;
      case 'creative':
        return <CreativeTemplate cvData={cvData} />;
      case 'minimal':
        return <MinimalTemplate cvData={cvData} />;
      default:
        return <ModernTemplate cvData={cvData} />;
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="text-sm text-gray-500 capitalize">{template} Template</div>
      </div>
      
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
          {renderTemplate()}
        </div>
      </div>
    </Card>
  );
};
