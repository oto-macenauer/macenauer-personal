import type { IconName } from '@/components/icons';

export interface Skill {
  icon: IconName;
  title: string;
  description: string;
}

export const skills: Skill[] = [
  {
    icon: 'code',
    title: 'Full-stack Development',
    description:
      'Expert in .NET, C#, Angular, Vue.js, React, Python, and enterprise application development',
  },
  {
    icon: 'palette',
    title: 'Cloud Architecture',
    description:
      'Designing scalable systems, geospatial solutions, and cloud-native architectures on AWS, Azure, and Kubernetes',
  },
  {
    icon: 'rocket',
    title: 'Database & Backend',
    description:
      'PostgreSQL, MS SQL, Entity Framework, Web APIs, and robust backend services in .NET and Python',
  },
];
