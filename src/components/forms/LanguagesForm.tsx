
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Language } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export const LanguagesForm = ({ languages, onChange }: LanguagesFormProps) => {
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'conversational' });

  const addLanguage = () => {
    if (newLanguage.name.trim()) {
      const language: Language = {
        id: Date.now().toString(),
        name: newLanguage.name.trim(),
        proficiency: newLanguage.proficiency as Language['proficiency']
      };
      onChange([...languages, language]);
      setNewLanguage({ name: '', proficiency: 'conversational' });
    }
  };

  const removeLanguage = (id: string) => {
    onChange(languages.filter(lang => lang.id !== id));
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'basic': return 'bg-red-100 text-red-800';
      case 'conversational': return 'bg-yellow-100 text-yellow-800';
      case 'fluent': return 'bg-blue-100 text-blue-800';
      case 'native': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProficiencyLabel = (proficiency: string) => {
    switch (proficiency) {
      case 'basic': return 'Basic';
      case 'conversational': return 'Conversational';
      case 'fluent': return 'Fluent';
      case 'native': return 'Native';
      default: return proficiency;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Languages</h3>
        
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Language</Label>
              <Input
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                placeholder="English, Spanish, French..."
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
              />
            </div>
            <div>
              <Label>Proficiency Level</Label>
              <Select
                value={newLanguage.proficiency}
                onValueChange={(value) => setNewLanguage({ ...newLanguage, proficiency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="fluent">Fluent</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={addLanguage} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {languages.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Your Languages</h4>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <Badge
                key={language.id}
                variant="secondary"
                className={`${getProficiencyColor(language.proficiency)} flex items-center gap-2 px-3 py-2`}
              >
                <span className="font-medium">{language.name}</span>
                <span className="text-xs opacity-70">({getProficiencyLabel(language.proficiency)})</span>
                <button
                  onClick={() => removeLanguage(language.id)}
                  className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {languages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No languages added yet.</p>
          <p className="text-sm">Add the languages you speak and your proficiency level.</p>
        </div>
      )}
    </div>
  );
};
