
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
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      address: 'New York, NY, USA',
      linkedin: 'linkedin.com/in/johnsmith',
      website: 'www.johnsmith.dev',
      summary: 'Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating innovative solutions and leading development teams to deliver high-quality applications.',
      profilePicture: ''
    },
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        position: 'Senior Software Developer',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description: 'Lead development of web applications using React and Node.js',
        achievements: [
          'Increased application performance by 40% through code optimization',
          'Led a team of 4 developers on major client projects',
          'Implemented CI/CD pipelines reducing deployment time by 60%'
        ]
      },
      {
        id: '2',
        company: 'Digital Innovations LLC',
        position: 'Software Developer',
        startDate: '2020-03',
        endDate: '2021-12',
        current: false,
        description: 'Developed and maintained web applications for various clients',
        achievements: [
          'Built responsive web applications serving 10,000+ users',
          'Collaborated with design team to implement pixel-perfect UIs',
          'Reduced bug reports by 50% through comprehensive testing'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
        description: 'Graduated Magna Cum Laude'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', level: 'expert', category: 'technical' },
      { id: '2', name: 'React', level: 'advanced', category: 'technical' },
      { id: '3', name: 'Node.js', level: 'advanced', category: 'technical' },
      { id: '4', name: 'Python', level: 'intermediate', category: 'technical' },
      { id: '5', name: 'Leadership', level: 'advanced', category: 'soft' },
      { id: '6', name: 'Communication', level: 'expert', category: 'soft' }
    ],
    projects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        link: 'https://github.com/johnsmith/ecommerce',
        github: 'https://github.com/johnsmith/ecommerce',
        startDate: '2023-01',
        endDate: '2023-06'
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Collaborative task management application with real-time updates',
        technologies: ['Vue.js', 'Express.js', 'Socket.io', 'PostgreSQL'],
        link: 'https://taskmanager.demo.com',
        github: 'https://github.com/johnsmith/taskmanager',
        startDate: '2022-08',
        endDate: '2022-12'
      }
    ],
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-03',
        credentialId: 'AWS-DEV-2023-001',
        link: 'https://aws.amazon.com/certification/'
      },
      {
        id: '2',
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022-11',
        credentialId: 'META-REACT-2022-456'
      }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'native' },
      { id: '2', name: 'Spanish', proficiency: 'conversational' },
      { id: '3', name: 'French', proficiency: 'basic' }
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
