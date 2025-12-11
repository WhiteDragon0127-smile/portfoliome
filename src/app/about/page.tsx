// src/app/about/page.tsx
import { Box } from '@mui/material';
import AboutSection from '../components/About/AboutSection';

export default function AboutPage() {
  return (
    <Box sx={{ pt: 10 }}>
      <AboutSection />
    </Box>
  );
}