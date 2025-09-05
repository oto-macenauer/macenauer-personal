'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Rocket } from 'lucide-react';

export default function About() {
  const skills = [
    { icon: Code, title: 'Full-stack Development', description: 'Expert in .NET, ASP.NET, Vue.js, React, SharePoint, and enterprise application development' },
    { icon: Palette, title: 'Architecture & Design', description: 'Designing scalable systems, geospatial solutions, and cloud-based architectures with Azure' },
    { icon: Rocket, title: 'Database & Backend', description: 'MS SQL, Entity Framework, Web APIs, WCF, and building robust backend services' },
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
                Hello! I'm Oto Macenauer, a Lead Product Engineer with over 14 years of experience 
                in software development. Currently leading engineering initiatives at Absa Group, 
                I specialize in building scalable enterprise solutions and modern web applications 
                that deliver real business value.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My expertise spans the full technology stack - from .NET and SharePoint to modern 
                JavaScript frameworks like Vue.js and React. I've architected geospatial systems, 
                banking solutions, and cloud-based platforms using technologies including ASP.NET, 
                Azure, MS SQL, and Entity Framework.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Throughout my career at companies like Accenture, Trask, and GPS Dozor, I've led 
                technical transformations, mentored development teams, and delivered complex projects 
                for major clients including Škoda Auto and Česká pojišťovna. I'm passionate about 
                clean architecture, innovative solutions, and continuous learning.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                <img 
                  src="/images/profile.jpg" 
                  alt="Oto Macenauer"
                  className="w-full h-full object-cover"
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