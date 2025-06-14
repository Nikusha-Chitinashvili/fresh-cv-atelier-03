
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional with accent colors',
    preview: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout with serif fonts',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design with creative elements',
    preview: 'bg-gradient-to-br from-purple-100 to-pink-200'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean design',
    preview: 'bg-gradient-to-br from-green-100 to-green-200'
  }
];

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Choose Your Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-4">
              <div className={`h-32 rounded-lg mb-3 ${template.preview} flex items-center justify-center`}>
                <div className="text-xs text-gray-600 font-medium">Preview</div>
              </div>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
