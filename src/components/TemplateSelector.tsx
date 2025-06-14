
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and professional with accent colors and modern layout',
    preview: 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200'
  }
];

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Your Professional Template</h2>
      <div className="max-w-sm">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer transition-all duration-300 ring-2 ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-6">
              <div className={`h-40 rounded-xl mb-4 ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-sm text-gray-700 font-medium bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  Live Preview
                </div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{template.description}</p>
              <div className="mt-3 flex items-center text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                Selected Template
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
