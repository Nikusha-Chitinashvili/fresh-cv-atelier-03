
import { useState } from 'react';
import { CVForm } from '@/components/CVForm';
import { CVPreview } from '@/components/CVPreview';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ExportTools } from '@/components/ExportTools';
import { Header } from '@/components/Header';
import { CVData } from '@/types/cv';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      summary: '',
      profilePicture: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional CV Creator
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Create stunning, professional CVs with our modern template. Add your photo, customize your content, and export in various formats.
          </p>
        </div>

        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <CVForm 
              cvData={cvData}
              setCvData={setCvData}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <ExportTools cvData={cvData} template={selectedTemplate} />
          </div>
          
          <div className="lg:sticky lg:top-8">
            <CVPreview 
              cvData={cvData}
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
