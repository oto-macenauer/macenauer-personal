'use client';

import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Get In Touch
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            I'm always interested in hearing about new opportunities, projects, and ideas. 
            Feel free to connect with me on LinkedIn for professional inquiries and discussions.
          </p>

          <div className="flex justify-center">
            <a
              href="https://linkedin.com/in/oto-macenauer-574a844b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
            >
              <Linkedin className="w-6 h-6" />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}