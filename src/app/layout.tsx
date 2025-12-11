// src/app/layout.tsx (updated)
import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '../utils/theme-registry';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import { Box } from '@mui/material';
import { LoadingProvider } from './context/LoadingContext';
import LoadingOverlay from './components/Layout/LoadingOverlay';

export const metadata: Metadata = {
  title: 'Super Dev | AI & FullStack Developer',
  description: 'Portfolio of Super Dev, AI & FullStack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <LoadingProvider>
            <LoadingOverlay />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - 60px)` },
                    ml: { sm: '60px' },
                    px: { xs: 2, sm: 4, md: 6 },
                  }}
                >
                  {children}
                </Box>
              </Box>
              <Footer />
            </Box>
          </LoadingProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}