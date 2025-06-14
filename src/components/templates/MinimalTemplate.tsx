
import { CVData } from '@/types/cv';

interface MinimalTemplateProps {
  cvData: CVData;
}

export const MinimalTemplate = ({ cvData }: MinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 font-light">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-thin mb-2 text-gray-900 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="h-px bg-gray-900 w-full mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {personalInfo.summary && (
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-thin mb-6 text-gray-900 tracking-wider uppercase">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-lg font-normal text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && exp.achievements[0] && (
                  <ul className="space-y-1 text-sm text-gray-600">
                    {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3">—</span>
                        <span>{achievement}</span>
                      </li>
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
        <section className="mb-12">
          <h2 className="text-2xl font-thin mb-6 text-gray-900 tracking-wider uppercase">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-lg font-normal text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {project.technologies.join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-thin mb-6 text-gray-900 tracking-wider uppercase">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-normal text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  {edu.field && <p className="text-gray-500 text-sm">{edu.field}</p>}
                  <p className="text-gray-500 text-xs">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-thin mb-6 text-gray-900 tracking-wider uppercase">
              Skills
            </h2>
            <div className="space-y-4">
              {['technical', 'soft', 'language'].map(category => {
                const categorySkills = skills.filter(skill => skill.category === category);
                return categorySkills.length > 0 && (
                  <div key={category}>
                    <h4 className="text-sm text-gray-600 uppercase tracking-wide mb-2">
                      {category === 'technical' ? 'Technical' : 
                       category === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {categorySkills.map(skill => skill.name).join(' · ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-2xl font-thin mb-6 text-gray-900 tracking-wider uppercase">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-normal text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                </div>
                <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
