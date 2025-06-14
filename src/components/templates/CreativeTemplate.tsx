
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe, Star } from 'lucide-react';

interface CreativeTemplateProps {
  cvData: CVData;
}

export const CreativeTemplate = ({ cvData }: CreativeTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillStars = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return levels[level as keyof typeof levels] || 2;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.summary && (
            <p className="text-pink-100 text-lg leading-relaxed max-w-3xl mb-6">
              {personalInfo.summary}
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Mail className="h-4 w-4 mr-2" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Phone className="h-4 w-4 mr-2" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Linkedin className="h-4 w-4 mr-2" />
                {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Globe className="h-4 w-4 mr-2" />
                {personalInfo.website}
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-80 bg-gradient-to-b from-gray-50 to-gray-100 p-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                Skills
              </h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <div className="flex">
                        {[...Array(4)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-3 w-3 ${
                              index < getSkillStars(skill.level)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(getSkillStars(skill.level) / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3"></div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                    <p className="text-gray-500 text-sm">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3"></div>
                Languages
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{lang.name}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full capitalize">
                        {lang.proficiency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-4"></div>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                          <p className="text-orange-600 font-semibold text-lg">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-600 mb-4">{exp.description}</p>
                      )}
                      {exp.achievements.length > 0 && exp.achievements[0] && (
                        <ul className="space-y-2">
                          {exp.achievements.filter(achievement => achievement.trim()).map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {index < experience.length - 1 && (
                      <div className="w-px h-8 bg-gradient-to-b from-orange-500 to-transparent mx-6"></div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4"></div>
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{project.name}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs rounded-full font-medium"
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

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-4"></div>
                Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="font-bold text-gray-800">{cert.name}</h3>
                    <p className="text-yellow-600 font-medium">{cert.issuer}</p>
                    <p className="text-gray-500 text-sm">{formatDate(cert.date)}</p>
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
