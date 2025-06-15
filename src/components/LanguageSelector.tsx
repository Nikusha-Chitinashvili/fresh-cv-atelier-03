
import { Card } from '@/components/ui/card';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'ka';
  onLanguageChange: (language: 'en' | 'ka') => void;
}

export const LanguageSelector = ({ language, onLanguageChange }: LanguageSelectorProps) => {
  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ka', name: 'ქართული', flag: '🇬🇪' }
  ];

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-700">Language:</span>
        </div>
        
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLanguageChange(lang.id as 'en' | 'ka')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                language === lang.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
