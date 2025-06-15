
import { Card } from '@/components/ui/card';

interface ColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  language?: 'en' | 'ka';
}

const colorThemes = [
  {
    id: 'blue',
    name: { en: 'Classic Blue', ka: 'კლასიკური ლურჯი' },
    description: { en: 'Professional blue theme', ka: 'პროფესიონალური ლურჯი თემა' },
    preview: 'bg-gradient-to-br from-blue-100 to-blue-200',
    primary: 'blue'
  },
  {
    id: 'green',
    name: { en: 'Nature Green', ka: 'ბუნებრივი მწვანე' },
    description: { en: 'Fresh green theme', ka: 'ახალი მწვანე თემა' },
    preview: 'bg-gradient-to-br from-green-100 to-green-200',
    primary: 'green'
  },
  {
    id: 'purple',
    name: { en: 'Creative Purple', ka: 'შემოქმედებითი იისფერი' },
    description: { en: 'Modern purple theme', ka: 'თანამედროვე იისფერი თემა' },
    preview: 'bg-gradient-to-br from-purple-100 to-purple-200',
    primary: 'purple'
  },
  {
    id: 'red',
    name: { en: 'Bold Red', ka: 'მკაფიო წითელი' },
    description: { en: 'Confident red theme', ka: 'თავდაჯერებული წითელი თემა' },
    preview: 'bg-gradient-to-br from-red-100 to-red-200',
    primary: 'red'
  },
  {
    id: 'teal',
    name: { en: 'Ocean Teal', ka: 'ოკეანის ფირუზისფერი' },
    description: { en: 'Calming teal theme', ka: 'დამამშვიდებელი ფირუზისფერი თემა' },
    preview: 'bg-gradient-to-br from-teal-100 to-teal-200',
    primary: 'teal'
  },
  {
    id: 'orange',
    name: { en: 'Energy Orange', ka: 'ენერგიული ნარინჯისფერი' },
    description: { en: 'Vibrant orange theme', ka: 'ცოცხალი ნარინჯისფერი თემა' },
    preview: 'bg-gradient-to-br from-orange-100 to-orange-200',
    primary: 'orange'
  },
  {
    id: 'black',
    name: { en: 'Professional Black', ka: 'პროფესიონალური შავი' },
    description: { en: 'Elegant black theme', ka: 'ელეგანტური შავი თემა' },
    preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
    primary: 'black'
  }
];

export const ColorSelector = ({ selectedColor, onColorChange, language = 'en' }: ColorSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {language === 'en' ? 'Choose Your Color Theme' : 'აირჩიეთ თქვენი ფერადი თემა'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {colorThemes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedColor === theme.id 
                ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => onColorChange(theme.id)}
          >
            <div className="p-4">
              <div className={`h-24 rounded-lg mb-3 ${theme.preview} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="text-xs text-white font-semibold bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                  {language === 'en' ? 'Preview' : 'ნახვა'}
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{theme.name[language]}</h3>
              <p className="text-xs text-gray-600">{theme.description[language]}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
