'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  // Use absolute URL in production
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/profile.jpg`
    : '/images/profile.jpg';
  
  const skills = [
    { icon: Code, title: 'Full-stack Development', description: 'Expert in .NET, C#, Angular, Vue.js, React, Python, and enterprise application development' },
    { icon: Palette, title: 'Cloud Architecture', description: 'Designing scalable systems, geospatial solutions, and cloud-native architectures on AWS, Azure, and Kubernetes' },
    { icon: Rocket, title: 'Database & Backend', description: 'PostgreSQL, MS SQL, Entity Framework, Web APIs, and robust backend services in .NET and Python' },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Hello! I&apos;m Oto Macenauer, a Tech Lead and full-stack developer with over a
                decade of experience. Currently leading development of cloud-native financial
                applications at Absa Group, I combine hands-on engineering with technical
                leadership — guiding architecture decisions and mentoring teams.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My expertise spans the full technology stack — from .NET and C# on the backend
                to modern frontend work in Angular and Vue. I&apos;ve shipped geospatial systems,
                banking platforms, and cloud-native applications running on AWS and Kubernetes,
                with PostgreSQL and SQL Server in the data layer.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Across roles at Accenture, Trask, GPS Dozor, iOCO, and Absa, I&apos;ve led
                technical transformations and delivered complex projects for clients including
                Škoda Auto, Česká pojišťovna, and ČSOB Pojišťovna. Trained at Brno University
                of Technology and Czech Technical University in Prague.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden relative">
                <Image 
                  src={imageUrl}
                  alt="Oto Macenauer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <skill.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{skill.title}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}