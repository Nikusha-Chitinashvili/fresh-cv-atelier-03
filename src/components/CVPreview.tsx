
import { Card } from '@/components/ui/card';
import { CVData } from '@/types/cv';
import { ModernTemplate } from './templates/ModernTemplate';
import { Eye, Palette } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
  colorTheme: string;
}

export const CVPreview = ({ cvData, colorTheme }: CVPreviewProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-2 border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Eye className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200">
          <Palette className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700 capitalize">{colorTheme} Theme</span>
        </div>
      </div>
      
      <div className="relative border-2 border-blue-200 rounded-xl bg-white shadow-lg overflow-hidden">
        {/* PDF Export optimization overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 pointer-events-none"></div>
        
        <div 
          className="transform scale-75 origin-top-left cv-preview-content relative z-10" 
          style={{ 
            width: '133.33%', 
            height: 'auto',
            // Enhanced rendering for PDF export
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            imageRendering: 'crisp-edges'
          }}
        >
          <ModernTemplate cvData={cvData} colorTheme={colorTheme} />
        </div>
        
        {/* Quality indicator */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
          Print Ready
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700 text-center">
          ✨ This preview shows exactly how your PDF will look when downloaded
        </p>
      </div>
    </Card>
  );
};
