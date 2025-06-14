
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
  }
];

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Modern Professional Template</h2>
      <div className="max-w-xs">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="ring-2 ring-blue-500 shadow-lg cursor-default"
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
