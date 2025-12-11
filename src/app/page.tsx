// src/app/page.tsx
import { Box } from '@mui/material';
import Hero from './components/Home/Hero';
import AboutSection from './components/About/AboutSection';
import ExperienceSection from './components/Experience/ExperienceSection';
import WorkSection from './components/Work/WorkSection';
import ContactSection from './components/Contact/ContactSection';

export default function Home() {
  return (
    <Box sx={{ pt: 10 }}>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <ContactSection />
    </Box>
  );
}