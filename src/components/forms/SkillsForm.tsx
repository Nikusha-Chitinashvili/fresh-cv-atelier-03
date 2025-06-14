
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skill } from '@/types/cv';
import { Plus, X } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate', category: 'technical' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level as Skill['level'],
        category: newSkill.category as Skill['category']
      };
      onChange([...skills, skill]);
      setNewSkill({ name: '', level: 'intermediate', category: 'technical' });
    }
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-red-100 text-red-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="JavaScript, Leadership, etc."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {['technical', 'soft', 'language'].map(category => {
        const categorySkills = getSkillsByCategory(category);
        const categoryTitle = category === 'technical' ? 'Technical Skills' : 
                            category === 'soft' ? 'Soft Skills' : 'Languages';
        
        return categorySkills.length > 0 && (
          <div key={category}>
            <h4 className="font-medium mb-3 capitalize">{categoryTitle}</h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map(skill => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className={`${getLevelColor(skill.level)} flex items-center gap-2 px-3 py-1`}
                >
                  <span>{skill.name}</span>
                  <span className="text-xs opacity-70">({skill.level})</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        );
      })}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet.</p>
          <p className="text-sm">Add your technical skills, soft skills, and languages above.</p>
        </div>
      )}
    </div>
  );
};
