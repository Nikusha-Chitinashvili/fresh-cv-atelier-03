
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/cv';
import { Plus, Trash2, GripVertical, X, ExternalLink, Github } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    onChange([...projects, newProject]);
    setExpandedItem(newProject.id);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string, technology: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && technology.trim() && !project.technologies.includes(technology.trim())) {
      updateProject(projectId, 'technologies', [...project.technologies, technology.trim()]);
    }
  };

  const removeTechnology = (projectId: string, technology: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(tech => tech !== technology));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((project, index) => (
        <Card key={project.id} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{project.name || `Project ${index + 1}`}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedItem(expandedItem === project.id ? null : project.id)}
              >
                {expandedItem === project.id ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expandedItem === project.id && (
            <div className="space-y-4">
              <div>
                <Label>Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="My Amazing Project"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what this project does, your role, and key achievements..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Live Demo URL</Label>
                  <div className="relative">
                    <Input
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="https://myproject.com"
                    />
                    <ExternalLink className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label>GitHub Repository</Label>
                  <div className="relative">
                    <Input
                      value={project.github}
                      onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                    <Github className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, tech)}
                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology (React, Node.js, Python...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTechnology(project.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addTechnology(project.id, input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet.</p>
          <Button onClick={addProject} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};
