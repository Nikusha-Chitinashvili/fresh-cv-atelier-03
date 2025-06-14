
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
      case 'beginner': return 'bg-blue-200';
      case 'intermediate': return 'bg-blue-400';
      case 'advanced': return 'bg-blue-600';
      case 'expert': return 'bg-blue-800';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex items-start space-x-6 flex-1">
            {/* Profile Picture */}
            {personalInfo.profilePicture && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.profilePicture}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                />
              </div>
            )}
            
            {/* Name and Summary */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
              {personalInfo.summary && (
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-blue-200">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-2"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                      <div className="flex space-x-2 mt-2 md:mt-0">
                        {project.link && (
                          <ExternalLink className="h-4 w-4 text-blue-600" />
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
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
                    <p className="text-blue-600">{edu.institution}</p>
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
                    <p className="text-blue-600 text-sm">{cert.issuer}</p>
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
