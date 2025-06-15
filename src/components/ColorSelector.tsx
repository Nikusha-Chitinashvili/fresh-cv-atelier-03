
import { Card } from '@/components/ui/card';

interface ColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const colorThemes = [
  {
    id: 'blue',
    name: 'Classic Blue',
    description: 'Professional blue theme',
    preview: 'bg-gradient-to-br from-blue-100 to-blue-200',
    primary: 'blue'
  },
  {
    id: 'green',
    name: 'Nature Green',
    description: 'Fresh green theme',
    preview: 'bg-gradient-to-br from-green-100 to-green-200',
    primary: 'green'
  },
  {
    id: 'purple',
    name: 'Creative Purple',
    description: 'Modern purple theme',
    preview: 'bg-gradient-to-br from-purple-100 to-purple-200',
    primary: 'purple'
  },
  {
    id: 'red',
    name: 'Bold Red',
    description: 'Confident red theme',
    preview: 'bg-gradient-to-br from-red-100 to-red-200',
    primary: 'red'
  },
  {
    id: 'teal',
    name: 'Ocean Teal',
    description: 'Calming teal theme',
    preview: 'bg-gradient-to-br from-teal-100 to-teal-200',
    primary: 'teal'
  },
  {
    id: 'orange',
    name: 'Energy Orange',
    description: 'Vibrant orange theme',
    preview: 'bg-gradient-to-br from-orange-100 to-orange-200',
    primary: 'orange'
  }
];

export const ColorSelector = ({ selectedColor, onColorChange }: ColorSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Choose Your Color Theme</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {colorThemes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedColor === theme.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => onColorChange(theme.id)}
          >
            <div className="p-3">
              <div className={`h-20 rounded-lg mb-2 ${theme.preview} flex items-center justify-center`}>
                <div className="text-xs text-gray-600 font-medium">Preview</div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900">{theme.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
