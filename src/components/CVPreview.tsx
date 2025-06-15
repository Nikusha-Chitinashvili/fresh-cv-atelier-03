
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';

interface CVPreviewProps {
  cvData: CVData;
  colorTheme: string;
  language?: 'en' | 'ka';
}

export const CVPreview = ({ cvData, colorTheme, language = 'en' }: CVPreviewProps) => {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {language === 'en' ? 'Live Preview' : 'ცოცხალი ნახვა'}
        </h2>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {language === 'en' ? 'Modern Template' : 'თანამედროვე შაბლონი'}
        </div>
      </div>
      
      <div className="border rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="transform scale-75 origin-top-left" style={{ width: '133.33%', height: 'auto' }}>
          <ModernTemplate cvData={cvData} colorTheme={colorTheme} language={language} />
        </div>
      </div>
    </Card>
  );
};
