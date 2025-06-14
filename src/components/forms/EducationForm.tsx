
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Education } from '@/types/cv';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    onChange([...education, newEducation]);
    setExpandedItem(newEducation.id);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <Card key={edu.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Education {index + 1}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedItem(expandedItem === edu.id ? null : edu.id)}
              >
                {expandedItem === edu.id ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expandedItem === edu.id && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor's, Master's, PhD, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, honors, activities..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <Button onClick={addEducation} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Education
          </Button>
        </div>
      )}
    </div>
  );
};
