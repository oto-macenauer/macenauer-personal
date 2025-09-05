'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, AtSign } from 'lucide-react';

export default function SocialLinks() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/oto-macenauer', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/oto-macenauer-574a844b', label: 'LinkedIn' },
    { icon: AtSign, href: 'https://bsky.app/profile/otomacenauer.bsky.social', label: 'Bluesky' },
    { icon: Globe, href: 'https://macenauer.net', label: 'Website' },
  ];

  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Connect With Me</h3>
          
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Oto Macenauer. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}