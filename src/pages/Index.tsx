
import { useState } from 'react';
import { CVForm } from '@/components/CVForm';
import { CVPreview } from '@/components/CVPreview';
import { ColorSelector } from '@/components/ColorSelector';
import { ExportTools } from '@/components/ExportTools';
import { Header } from '@/components/Header';
import { CVData } from '@/types/cv';

const Index = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: 'Full Name',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      address: 'City, State, Country',
      linkedin: 'linkedin.com/in/yourname',
      website: 'www.yourwebsite.com',
      summary: 'Your professional summary will appear here. Describe your experience, skills, and career objectives in a few sentences.',
      profilePicture: ''
    },
    experience: [
      {
        id: '1',
        company: 'Company Name',
        position: 'Job Title',
        startDate: '2023-01',
        endDate: '',
        current: true,
        description: 'Brief description of your role and responsibilities',
        achievements: [
          'Key achievement or responsibility',
          'Another important accomplishment',
          'Third notable contribution'
        ]
      },
      {
        id: '2',
        company: 'Previous Company',
        position: 'Previous Job Title',
        startDate: '2021-01',
        endDate: '2022-12',
        current: false,
        description: 'Description of your previous role',
        achievements: [
          'Major accomplishment in this role',
          'Another significant contribution',
          'Third key achievement'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University Name',
        degree: 'Bachelor of Science',
        field: 'Your Field of Study',
        startDate: '2017-09',
        endDate: '2021-05',
        gpa: '3.8',
        description: 'Relevant coursework, honors, or activities'
      }
    ],
    skills: [
      { id: '1', name: 'Technical Skill 1', level: 'expert', category: 'technical' },
      { id: '2', name: 'Technical Skill 2', level: 'advanced', category: 'technical' },
      { id: '3', name: 'Technical Skill 3', level: 'intermediate', category: 'technical' },
      { id: '4', name: 'Soft Skill 1', level: 'advanced', category: 'soft' },
      { id: '5', name: 'Soft Skill 2', level: 'expert', category: 'soft' }
    ],
    projects: [
      {
        id: '1',
        name: 'Project Name',
        description: 'Brief description of your project and what it accomplishes',
        technologies: ['Technology 1', 'Technology 2', 'Technology 3'],
        link: 'https://project-demo.com',
        github: 'https://github.com/username/project',
        startDate: '2023-01',
        endDate: '2023-06'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'Certification Name',
        issuer: 'Issuing Organization',
        date: '2023-03',
        credentialId: 'CERT-ID-123',
        link: 'https://certification-link.com'
      }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'native' },
      { id: '2', name: 'Second Language', proficiency: 'conversational' }
    ]
  });

  const [selectedColor, setSelectedColor] = useState('blue');
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
            Create stunning, professional CVs with our modern template. Choose your color theme and upload your photo.
          </p>
        </div>

        <ColorSelector 
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <CVForm 
              cvData={cvData}
              setCvData={setCvData}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <ExportTools cvData={cvData} template="modern" />
          </div>
          
          <div className="lg:sticky lg:top-8">
            <CVPreview 
              cvData={cvData}
              colorTheme={selectedColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
