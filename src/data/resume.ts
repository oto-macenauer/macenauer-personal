export interface Job {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export const experience: Job[] = [
  {
    title: 'Technical Lead',
    company: 'Absa Group',
    period: 'Nov 2025 - Present',
    description:
      'Leading development of cloud-native financial applications built with .NET and Python on AWS and Kubernetes. System architecture, full-stack feature work, technical direction, and developer mentoring.',
  },
  {
    title: 'Lead Product Engineer',
    company: 'Absa Group',
    period: 'Feb 2021 - Nov 2025',
    description:
      'Full-stack development and technical design of internal financial platforms. Backend services and APIs in .NET; frontend features in modern web frameworks; architecture decisions across product and engineering.',
  },
  {
    title: 'Full-Stack Developer',
    company: 'iOCO (Contract)',
    period: 'Nov 2019 - Jan 2021',
    description:
      'Development and maintenance of enterprise web applications. Backend APIs and services in .NET, with database and external system integrations.',
  },
  {
    title: 'Full-Stack Developer',
    company: 'GPS Dozor - TLV s.r.o.',
    period: 'Jun 2015 - Oct 2019',
    description:
      'Designed and shipped a real-time geospatial platform for GPS tracker monitoring. Led the SPA transformation with Vue.js, ASP.NET, Web API, MS SQL, Entity Framework, and WCF.',
  },
  {
    title: 'SharePoint Developer',
    company: 'Trask Solutions',
    period: 'Feb 2013 - Jun 2015',
    description:
      'Enterprise SharePoint solutions for Škoda Auto. Maintained the Team Webs document-sharing platform; designed New K2 — a SharePoint data layer with an Azure-hosted CMS frontend.',
  },
  {
    title: 'Programmer',
    company: 'Accenture',
    period: 'May 2011 - Jan 2013',
    description:
      'SharePoint applications for insurance companies. Business Portal for Česká pojišťovna; Data Transformation Tool for ČSOB Pojišťovna built on .NET and SQL Server.',
  },
  {
    title: '.NET Developer',
    company: 'Radiation Detection Systems',
    period: 'Sep 2010 - Dec 2010',
    description:
      'Database for worker radiation exposure tracking (C# / WinForms / Access / OLE DB). Computer-vision application processing radiation-sensitive films (C++ / OpenCV / Qt).',
  },
  {
    title: '.NET Developer',
    company: 'Progress Project',
    period: 'Jan 2008 - Jun 2010',
    description:
      'Analysis and development of a construction-evidence management application built on ASP.NET MVC, jQuery, and Entity Framework.',
  },
];

export const education: Education[] = [
  {
    degree: "Master's degree in Computer Programming",
    school: 'Brno University of Technology',
    period: '2008 - 2010',
    description:
      'Advanced studies in computer programming, software architecture, algorithms, and system design.',
  },
  {
    degree:
      'Bachelor of Science (BSc) in Electrical and Electronics Engineering',
    school: 'Czech Technical University in Prague',
    period: '2005 - 2008',
    description:
      'Foundation in electrical engineering, electronics, programming fundamentals, and mathematical principles.',
  },
];

export const certifications: string[] = [
  'AWS Certified Developer - Associate',
  'Microsoft Azure Fundamentals',
  'React Developer Certification',
  'Node.js Certified Developer',
];
