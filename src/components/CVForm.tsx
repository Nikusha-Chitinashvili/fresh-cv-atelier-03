
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { CVData } from '@/types/cv';
import { User, Briefcase, GraduationCap, Code, FolderOpen, Award, Globe } from 'lucide-react';

interface CVFormProps {
  cvData: CVData;
  setCvData: (data: CVData) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const CVForm = ({ cvData, setCvData, activeSection, setActiveSection }: CVFormProps) => {
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: Globe }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">CV Information</h2>
      
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-4 md:grid-cols-7 gap-1 h-auto p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center p-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <IconComponent className="h-4 w-4 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal">
            <PersonalInfoForm
              personalInfo={cvData.personalInfo}
              onChange={(personalInfo) => setCvData({ ...cvData, personalInfo })}
            />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceForm
              experience={cvData.experience}
              onChange={(experience) => setCvData({ ...cvData, experience })}
            />
          </TabsContent>

          <TabsContent value="education">
            <EducationForm
              education={cvData.education}
              onChange={(education) => setCvData({ ...cvData, education })}
            />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsForm
              skills={cvData.skills}
              onChange={(skills) => setCvData({ ...cvData, skills })}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsForm
              projects={cvData.projects}
              onChange={(projects) => setCvData({ ...cvData, projects })}
            />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsForm
              certifications={cvData.certifications}
              onChange={(certifications) => setCvData({ ...cvData, certifications })}
            />
          </TabsContent>

          <TabsContent value="languages">
            <LanguagesForm
              languages={cvData.languages}
              onChange={(languages) => setCvData({ ...cvData, languages })}
            />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
