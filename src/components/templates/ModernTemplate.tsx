
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink, Github } from 'lucide-react';

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
      case 'beginner': return 'from-blue-300 to-blue-400';
      case 'intermediate': return 'from-blue-400 to-blue-500';
      case 'advanced': return 'from-blue-500 to-blue-600';
      case 'expert': return 'from-blue-600 to-purple-600';
      default: return 'from-gray-300 to-gray-400';
    }
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'beginner': return 'w-1/4';
      case 'intermediate': return 'w-2/4';
      case 'advanced': return 'w-3/4';
      case 'expert': return 'w-full';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex items-start space-x-6 flex-1">
              {/* Profile Picture */}
              {personalInfo.profilePicture && (
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-white to-blue-200 rounded-full blur-sm"></div>
                    <img
                      src={personalInfo.profilePicture}
                      alt={personalInfo.fullName || 'Profile'}
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-xl backdrop-blur-sm"
                    />
                  </div>
                </div>
              )}
              
              {/* Name and Summary */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                {personalInfo.summary && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-blue-50 text-lg leading-relaxed">
                      {personalInfo.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 md:mt-0 space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              {personalInfo.email && (
                <div className="flex items-center text-sm hover:text-blue-200 transition-colors">
                  <div className="bg-white/20 rounded-full p-1.5 mr-3">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center text-sm hover:text-blue-200 transition-colors">
                  <div className="bg-white/20 rounded-full p-1.5 mr-3">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center text-sm hover:text-blue-200 transition-colors">
                  <div className="bg-white/20 rounded-full p-1.5 mr-3">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  {personalInfo.address}
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center text-sm hover:text-blue-200 transition-colors">
                  <div className="bg-white/20 rounded-full p-1.5 mr-3">
                    <Linkedin className="h-3.5 w-3.5" />
                  </div>
                  {personalInfo.linkedin}
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center text-sm hover:text-blue-200 transition-colors">
                  <div className="bg-white/20 rounded-full p-1.5 mr-3">
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                  {personalInfo.website}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 mr-3">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Professional Experience
                </h2>
              </div>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline line */}
                    {index !== experience.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-200 to-transparent"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.position}</h3>
                            <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {exp.company}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                        
                        {exp.description && (
                          <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                        )}
                        
                        {exp.achievements.length > 0 && exp.achievements[0] && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Key Achievements</h4>
                            <ul className="space-y-2">
                              {exp.achievements.filter(achievement => achievement.trim()).map((achievement, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-gray-600 leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-2 mr-3">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
              </div>
              <div className="grid gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                      <div className="flex space-x-2">
                        {project.link && (
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <ExternalLink className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {project.github && (
                          <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <Github className="h-4 w-4 text-white" />
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
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm rounded-full font-medium border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-colors"
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

        {/* Sidebar */}
        <div className="lg:w-80 bg-gradient-to-br from-gray-100 to-gray-50 p-8">
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2 mr-3">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-gray-800 mb-1">{edu.degree}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 text-sm mb-2">{edu.field}</p>}
                    <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                      <span className="text-green-700 text-xs font-medium">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <p className="text-gray-600 text-sm mt-2 font-medium">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2 mr-3">
                  <div className="h-4 w-4 bg-white rounded-sm"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Skills</h2>
              </div>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{skill.name}</span>
                      <span className="text-xs font-medium text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} ${getSkillWidth(skill.level)} transition-all duration-500 ease-out rounded-full shadow-sm`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-2 mr-3">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-gray-800 text-sm mb-1">{cert.name}</h3>
                    <p className="text-blue-600 font-semibold text-sm mb-1">{cert.issuer}</p>
                    <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                      <span className="text-orange-700 text-xs font-medium">
                        {formatDate(cert.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-2 mr-3">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Languages</h2>
              </div>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="bg-white rounded-lg p-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{lang.name}</span>
                      <span className="text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-2 py-1 rounded-full capitalize">
                        {lang.proficiency}
                      </span>
                    </div>
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
