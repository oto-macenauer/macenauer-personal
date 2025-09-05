'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';

export default function Resume() {
  const experience = [
    {
      title: 'Lead Product Engineer',
      company: 'Absa Group',
      period: 'Feb 2021 - Present',
      description: 'Leading product engineering initiatives for banking solutions. Architecting and implementing scalable financial systems with modern cloud technologies.',
    },
    {
      title: 'Full Stack Developer',
      company: 'iOCO',
      period: 'Nov 2019 - Jan 2021',
      description: 'Contract position developing full-stack solutions. Built and maintained enterprise applications using modern web technologies.',
    },
    {
      title: 'Full-stack Developer',
      company: 'GPS Dozor - TLV s.r.o.',
      period: 'Jun 2015 - Oct 2019',
      description: 'Designed architecture and implemented geospatial system for real-time GPS tracking. Led transformation to SPA using Vue.js, ASP.NET, Web API, MS SQL, and Entity Framework.',
    },
    {
      title: 'SharePoint Developer',
      company: 'Trask solutions',
      period: 'Feb 2013 - Jun 2015',
      description: 'Maintained SharePoint projects for Škoda Auto. Designed cloud-based CMS with Azure frontend and on-premise SharePoint backend. Used SharePoint, ASP.NET, PowerShell, and MEF.',
    },
    {
      title: 'Programmer',
      company: 'Accenture',
      period: 'May 2011 - Jan 2013',
      description: 'Developed SharePoint portal for Česká pojišťovna. Created data transformation tools for ČSOB Pojišťovna using .NET and MS SQL 2008.',
    },
  ];

  const education = [
    {
      degree: "Master's degree in Computer Programming",
      school: 'Brno University of Technology',
      period: '2008 - 2010',
      description: 'Advanced studies in computer programming, software architecture, algorithms, and system design.',
    },
    {
      degree: 'Bachelor of Science (BSc) in Electrical and Electronics Engineering',
      school: 'Czech Technical University in Prague',
      period: '2005 - 2008',
      description: 'Foundation in electrical engineering, electronics, programming fundamentals, and mathematical principles.',
    },
  ];

  const certifications = [
    'AWS Certified Developer - Associate',
    'Microsoft Azure Fundamentals',
    'React Developer Certification',
    'Node.js Certified Developer',
  ];

  return (
    <section id="resume" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Resume
          </h2>

          <div className="flex justify-center mb-12">
            <a 
              href="/resume.pdf" 
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
              Download Full CV
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-300"
                  >
                    <div className="absolute left-[-4px] top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                    <p className="text-gray-600">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                </div>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-xl shadow-sm"
                    >
                      <h4 className="text-xl font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}