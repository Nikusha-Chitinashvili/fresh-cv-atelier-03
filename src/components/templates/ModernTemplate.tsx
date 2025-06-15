import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, ExternalLink, Github, User } from 'lucide-react';

interface ModernTemplateProps {
  cvData: CVData;
  colorTheme?: string;
}

export const ModernTemplate = ({ cvData, colorTheme = 'blue' }: ModernTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, any> = {
      blue: {
        gradient: 'from-blue-600 to-blue-800',
        accent: 'text-blue-600',
        accentBg: 'bg-blue-600',
        lightAccent: 'text-blue-100',
        border: 'border-blue-600',
        borderLight: 'border-blue-200',
        dot: 'bg-blue-600',
        tag: 'bg-blue-100 text-blue-800',
        skill: {
          beginner: 'bg-blue-200',
          intermediate: 'bg-blue-400',
          advanced: 'bg-blue-600',
          expert: 'bg-blue-800'
        }
      },
      green: {
        gradient: 'from-green-600 to-green-800',
        accent: 'text-green-600',
        accentBg: 'bg-green-600',
        lightAccent: 'text-green-100',
        border: 'border-green-600',
        borderLight: 'border-green-200',
        dot: 'bg-green-600',
        tag: 'bg-green-100 text-green-800',
        skill: {
          beginner: 'bg-green-200',
          intermediate: 'bg-green-400',
          advanced: 'bg-green-600',
          expert: 'bg-green-800'
        }
      },
      purple: {
        gradient: 'from-purple-600 to-purple-800',
        accent: 'text-purple-600',
        accentBg: 'bg-purple-600',
        lightAccent: 'text-purple-100',
        border: 'border-purple-600',
        borderLight: 'border-purple-200',
        dot: 'bg-purple-600',
        tag: 'bg-purple-100 text-purple-800',
        skill: {
          beginner: 'bg-purple-200',
          intermediate: 'bg-purple-400',
          advanced: 'bg-purple-600',
          expert: 'bg-purple-800'
        }
      },
      red: {
        gradient: 'from-red-600 to-red-800',
        accent: 'text-red-600',
        accentBg: 'bg-red-600',
        lightAccent: 'text-red-100',
        border: 'border-red-600',
        borderLight: 'border-red-200',
        dot: 'bg-red-600',
        tag: 'bg-red-100 text-red-800',
        skill: {
          beginner: 'bg-red-200',
          intermediate: 'bg-red-400',
          advanced: 'bg-red-600',
          expert: 'bg-red-800'
        }
      },
      teal: {
        gradient: 'from-teal-600 to-teal-800',
        accent: 'text-teal-600',
        accentBg: 'bg-teal-600',
        lightAccent: 'text-teal-100',
        border: 'border-teal-600',
        borderLight: 'border-teal-200',
        dot: 'bg-teal-600',
        tag: 'bg-teal-100 text-teal-800',
        skill: {
          beginner: 'bg-teal-200',
          intermediate: 'bg-teal-400',
          advanced: 'bg-teal-600',
          expert: 'bg-teal-800'
        }
      },
      orange: {
        gradient: 'from-orange-600 to-orange-800',
        accent: 'text-orange-600',
        accentBg: 'bg-orange-600',
        lightAccent: 'text-orange-100',
        border: 'border-orange-600',
        borderLight: 'border-orange-200',
        dot: 'bg-orange-600',
        tag: 'bg-orange-100 text-orange-800',
        skill: {
          beginner: 'bg-orange-200',
          intermediate: 'bg-orange-400',
          advanced: 'bg-orange-600',
          expert: 'bg-orange-800'
        }
      },
      black: {
        gradient: 'from-gray-800 to-gray-900',
        accent: 'text-gray-800',
        accentBg: 'bg-gray-800',
        lightAccent: 'text-gray-100',
        border: 'border-gray-800',
        borderLight: 'border-gray-300',
        dot: 'bg-gray-800',
        tag: 'bg-gray-100 text-gray-800',
        skill: {
          beginner: 'bg-gray-300',
          intermediate: 'bg-gray-500',
          advanced: 'bg-gray-700',
          expert: 'bg-gray-900'
        }
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(colorTheme);

  const getSkillColor = (level: string) => {
    return colors.skill[level as keyof typeof colors.skill] || 'bg-gray-400';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} text-white p-8`}>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex items-start space-x-6 flex-1">
            {/* Profile Picture or User Icon */}
            <div className="flex-shrink-0">
              {personalInfo.profilePicture ? (
                <img
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName || 'Profile'}
                  className={`w-24 h-24 rounded-full object-cover border-4 border-${colorTheme}-300 shadow-lg`}
                />
              ) : (
                <div className={`w-24 h-24 rounded-full border-4 border-${colorTheme}-300 shadow-lg bg-white/20 flex items-center justify-center`}>
                  <User className="h-12 w-12 text-white/70" />
                </div>
              )}
            </div>
            
            {/* Name and Summary */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
              {personalInfo.summary && (
                <p className={`${colors.lightAccent} text-lg leading-relaxed max-w-2xl`}>
                  {personalInfo.summary}
                </p>
              )}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="mt-4 md:mt-0 space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {personalInfo.address}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className={`text-2xl font-bold text-gray-800 mb-4 border-b-2 ${colors.border} pb-2`}>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className={`relative pl-4 border-l-2 ${colors.borderLight}`}>
                    <div className={`absolute w-3 h-3 ${colors.dot} rounded-full -left-[7px] top-2`}></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                        <p className={`${colors.accent} font-medium`}>{exp.company}</p>
                      </div>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 mb-3">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && exp.achievements[0] && (
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className={`text-2xl font-bold text-gray-800 mb-4 border-b-2 ${colors.border} pb-2`}>
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                      <div className="flex space-x-2 mt-2 md:mt-0">
                        {project.link && (
                          <ExternalLink className={`h-4 w-4 ${colors.accent}`} />
                        )}
                        {project.github && (
                          <Github className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 ${colors.tag} text-xs rounded-full`}
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
        <div className="lg:w-80 bg-gray-50 p-8">
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className={colors.accent}>{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                    <p className="text-gray-500 text-sm mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index < ['beginner', 'intermediate', 'advanced', 'expert'].indexOf(skill.level) + 1
                              ? getSkillColor(skill.level)
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 text-sm">{cert.name}</h3>
                    <p className={`${colors.accent} text-sm`}>{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{formatDate(cert.date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-500 text-sm capitalize">{lang.proficiency}</span>
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
