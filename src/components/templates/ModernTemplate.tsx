
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink, Github, Award, Star, Zap, TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ModernTemplateProps {
  cvData: CVData;
}

export const ModernTemplate = ({ cvData }: ModernTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-gradient-to-r from-blue-300 to-blue-400';
      case 'intermediate': return 'bg-gradient-to-r from-blue-400 to-blue-500';
      case 'advanced': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'expert': return 'bg-gradient-to-r from-blue-600 to-purple-600';
      default: return 'bg-gray-400';
    }
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'beginner': return 'w-1/4';
      case 'intermediate': return 'w-1/2';
      case 'advanced': return 'w-3/4';
      case 'expert': return 'w-full';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Enhanced Header with Profile Picture */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <Avatar className="w-24 h-24 border-4 border-white/30 shadow-xl ring-4 ring-white/20">
              <AvatarImage src={personalInfo.profilePicture} alt={personalInfo.fullName} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500 text-white text-2xl font-bold">
                {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'CV'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-3"></div>
              {personalInfo.summary && (
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                  {personalInfo.summary}
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 text-sm border border-white/20">
            {personalInfo.email && (
              <div className="flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Mail className="h-4 w-4 mr-3 text-yellow-300" />
                <span className="font-medium">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Phone className="h-4 w-4 mr-3 text-green-300" />
                <span className="font-medium">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors">
                <MapPin className="h-4 w-4 mr-3 text-red-300" />
                <span className="font-medium">{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Linkedin className="h-4 w-4 mr-3 text-blue-300" />
                <span className="font-medium">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Globe className="h-4 w-4 mr-3 text-purple-300" />
                <span className="font-medium">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Enhanced Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Experience with enhanced design */}
          {experience.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Experience</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent ml-4"></div>
              </div>
              
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-400"></div>
                    <div className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -left-[7px] top-6 border-2 border-white shadow-lg"></div>
                    
                    <div className="ml-8 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.position}</h3>
                          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {exp.company}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                          <span className="text-gray-700 text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                      )}
                      
                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-700 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-yellow-500" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.filter(achievement => achievement.trim()).map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-600 leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Projects */}
          {projects.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg mr-3">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent ml-4"></div>
              </div>
              
              <div className="grid gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                      <div className="flex space-x-3">
                        {project.link && (
                          <div className="bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition-colors">
                            <ExternalLink className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        {project.github && (
                          <div className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <Github className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-shadow"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Enhanced Sidebar with creative elements */}
        <div className="lg:w-80 bg-gradient-to-b from-slate-50 to-gray-100 p-8 border-l border-gray-200">
          {/* Skills with animated progress bars */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                Skills
              </h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getSkillColor(skill.level)} ${getSkillWidth(skill.level)} transition-all duration-1000 ease-out`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-800 mb-1">{edu.degree}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 text-sm mb-2">{edu.field}</p>}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-xs">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Certifications */}
          {certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-lg">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight">{cert.name}</h3>
                        <p className="text-blue-600 text-sm font-medium">{cert.issuer}</p>
                        <p className="text-gray-500 text-xs mt-1">{formatDate(cert.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                Languages
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{lang.name}</span>
                    <span className="text-gray-600 text-sm capitalize bg-gray-100 px-3 py-1 rounded-full">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
