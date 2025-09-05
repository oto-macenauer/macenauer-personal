import Hero from '@/components/Hero';
import About from '@/components/About';
import Resume from '@/components/Resume';
import SocialLinks from '@/components/SocialLinks';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Resume />
      <Contact />
      <SocialLinks />
    </main>
  );
}