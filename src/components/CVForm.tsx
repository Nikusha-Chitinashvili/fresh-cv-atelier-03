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
  language?: 'en' | 'ka';
}

export const CVForm = ({ cvData, setCvData, activeSection, setActiveSection, language = 'en' }: CVFormProps) => {
  const tabs = [
    { 
      id: 'personal', 
      label: { en: 'Personal', ka: 'პირადი' }, 
      icon: User 
    },
    { 
      id: 'experience', 
      label: { en: 'Experience', ka: 'გამოცდილება' }, 
      icon: Briefcase 
    },
    { 
      id: 'education', 
      label: { en: 'Education', ka: 'განათლება' }, 
      icon: GraduationCap 
    },
    { 
      id: 'skills', 
      label: { en: 'Skills', ka: 'უნარები' }, 
      icon: Code 
    },
    { 
      id: 'projects', 
      label: { en: 'Projects', ka: 'პროექტები' }, 
      icon: FolderOpen 
    },
    { 
      id: 'certifications', 
      label: { en: 'Certifications', ka: 'სერტიფიკატები' }, 
      icon: Award 
    },
    { 
      id: 'languages', 
      label: { en: 'Languages', ka: 'ენები' }, 
      icon: Globe 
    }
  ];

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {language === 'en' ? 'CV Information' : 'CV ინფორმაცია'}
      </h2>
      
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-4 md:grid-cols-7 gap-1 h-auto p-1 bg-gray-100/80">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center p-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 transition-all duration-200 hover:bg-white/50"
              >
                <IconComponent className="h-4 w-4 mb-1" />
                <span className="text-xs">{tab.label[language]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal">
            <PersonalInfoForm
              personalInfo={cvData.personalInfo}
              onChange={(personalInfo) => setCvData({ ...cvData, personalInfo })}
              language={language}
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
