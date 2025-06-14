
import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ClassicTemplateProps {
  cvData: CVData;
}

export const ClassicTemplate = ({ cvData }: ClassicTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-400 pb-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.address}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              linkedin.com/in/{personalInfo.linkedin}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-3">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600 italic">{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-semibold text-gray-800">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-gray-600 text-sm">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">
              SKILLS
            </h2>
            <div className="space-y-2">
              {['technical', 'soft', 'language'].map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                return categorySkills.length > 0 && (
                  <div key={category}>
                    <h4 className="font-medium text-gray-700 capitalize mb-1">
                      {category === 'technical' ? 'Technical Skills' : 
                       category === 'soft' ? 'Soft Skills' : 'Languages'}:
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {categorySkills.map(skill => skill.name).join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h4 className="font-medium text-gray-700">{cert.name}</h4>
                  <p className="text-gray-600 text-sm">{cert.issuer} - {formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
