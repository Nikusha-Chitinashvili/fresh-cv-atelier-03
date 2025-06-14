
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Experience } from '@/types/cv';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export const ExperienceForm = ({ experience, onChange }: ExperienceFormProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onChange([...experience, newExperience]);
    setExpandedItem(newExperience.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === expId);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const addAchievement = (expId: string) => {
    const exp = experience.find(e => e.id === expId);
    if (exp) {
      updateExperience(expId, 'achievements', [...exp.achievements, '']);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const exp = experience.find(e => e.id === expId);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.map((exp, index) => (
        <Card key={exp.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium">Experience {index + 1}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedItem(expandedItem === exp.id ? null : exp.id)}
              >
                {expandedItem === exp.id ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expandedItem === exp.id && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
              </div>

              <div>
                <Label>Job Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Key Achievements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(exp.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                      placeholder="• Key achievement or responsibility"
                    />
                    {exp.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(exp.id, achIndex)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}

      {experience.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <Button onClick={addExperience} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );
};
