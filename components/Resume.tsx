'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';

export default function Resume() {
  const resumeUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/resume.pdf`
    : '/resume.pdf';

  const experience = [
    {
      title: 'Technical Lead',
      company: 'Absa Group',
      period: 'Nov 2025 - Present',
      description: 'Leading development of cloud-native financial applications built with .NET and Python on AWS and Kubernetes. System architecture, full-stack feature work, technical direction, and developer mentoring.',
    },
    {
      title: 'Lead Product Engineer',
      company: 'Absa Group',
      period: 'Feb 2021 - Nov 2025',
      description: 'Full-stack development and technical design of internal financial platforms. Backend services and APIs in .NET; frontend features in modern web frameworks; architecture decisions across product and engineering.',
    },
    {
      title: 'Full-Stack Developer',
      company: 'iOCO (Contract)',
      period: 'Nov 2019 - Jan 2021',
      description: 'Development and maintenance of enterprise web applications. Backend APIs and services in .NET, with database and external system integrations.',
    },
    {
      title: 'Full-Stack Developer',
      company: 'GPS Dozor - TLV s.r.o.',
      period: 'Jun 2015 - Oct 2019',
      description: 'Designed and shipped a real-time geospatial platform for GPS tracker monitoring. Led the SPA transformation with Vue.js, ASP.NET, Web API, MS SQL, Entity Framework, and WCF.',
    },
    {
      title: 'SharePoint Developer',
      company: 'Trask Solutions',
      period: 'Feb 2013 - Jun 2015',
      description: 'Enterprise SharePoint solutions for Škoda Auto. Maintained the Team Webs document-sharing platform; designed New K2 — a SharePoint data layer with an Azure-hosted CMS frontend.',
    },
    {
      title: 'Programmer',
      company: 'Accenture',
      period: 'May 2011 - Jan 2013',
      description: 'SharePoint applications for insurance companies. Business Portal for Česká pojišťovna; Data Transformation Tool for ČSOB Pojišťovna built on .NET and SQL Server.',
    },
    {
      title: '.NET Developer',
      company: 'Radiation Detection Systems',
      period: 'Sep 2010 - Dec 2010',
      description: 'Database for worker radiation exposure tracking (C# / WinForms / Access / OLE DB). Computer-vision application processing radiation-sensitive films (C++ / OpenCV / Qt).',
    },
    {
      title: '.NET Developer',
      company: 'Progress Project',
      period: 'Jan 2008 - Jun 2010',
      description: 'Analysis and development of a construction-evidence management application built on ASP.NET MVC, jQuery, and Entity Framework.',
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
              href={resumeUrl}
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