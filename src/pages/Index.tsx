
import { useState } from 'react';
import { CVForm } from '@/components/CVForm';
import { CVPreview } from '@/components/CVPreview';
import { ColorSelector } from '@/components/ColorSelector';
import { ExportTools } from '@/components/ExportTools';
import { Header } from '@/components/Header';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CVData } from '@/types/cv';
import { Sparkles, Zap, Download, Eye } from 'lucide-react';

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
  const [language, setLanguage] = useState<'en' | 'ka'>('en');

  const features = [
    {
      icon: Sparkles,
      title: language === 'en' ? 'Professional Templates' : 'პროფესიონალური შაბლონები',
      description: language === 'en' ? 'Beautiful, modern CV templates designed by professionals' : 'ლამაზი, თანამედროვე CV შაბლონები, შექმნილი პროფესიონალების მიერ'
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Real-time Preview' : 'რეალურ დროში ნახვა',
      description: language === 'en' ? 'See your changes instantly as you type' : 'იხილეთ ცვლილებები მყისიერად, როდესაც აკრეფთ'
    },
    {
      icon: Download,
      title: language === 'en' ? 'Easy Export' : 'მარტივი ექსპორტი',
      description: language === 'en' ? 'Download your CV in multiple formats' : 'ჩამოტვირთეთ თქვენი CV რამდენიმე ფორმატში'
    },
    {
      icon: Eye,
      title: language === 'en' ? 'Multiple Themes' : 'მრავალი თემა',
      description: language === 'en' ? 'Choose from various color themes to match your style' : 'აირჩიეთ სხვადასხვა ფერადი თემებიდან თქვენი სტილის შესაბამისად'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              {language === 'en' ? 'Create Your Perfect CV' : 'შექმენით თქვენი სრულყოფილი CV'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Build a professional resume that stands out with our modern, customizable templates. Choose your style, add your information, and download instantly.'
                : 'შექმენით პროფესიონალური რეზიუმე, რომელიც გამოირჩევა ჩვენი თანამედროვე, მორგებადი შაბლონებით. აირჩიეთ თქვენი სტილი, დაამატეთ ინფორმაცია და ჩამოტვირთეთ მყისიერად.'
              }
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <ColorSelector 
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          language={language}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <CVForm 
              cvData={cvData}
              setCvData={setCvData}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              language={language}
            />
            <ExportTools cvData={cvData} template="modern" />
          </div>
          
          <div className="lg:sticky lg:top-8">
            <CVPreview 
              cvData={cvData}
              colorTheme={selectedColor}
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
