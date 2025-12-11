// src/app/theme.ts
'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// Define Roboto font for Next.js
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64FFDA', // Brighter teal for better contrast
      light: '#A8FFF1', // Lighter teal for gradients
      dark: '#00BFA5', // Darker teal for hover states
    },
    secondary: {
      main: '#BD93F9', // Slightly adjusted purple
      light: '#D4B6FF',
      dark: '#9A6BFF',
    },
    background: {
      default: '#0A1930', // Slightly deeper blue for better contrast
      paper: '#112240', // Slightly lighter blue for cards/papers
    },
    text: {
      primary: '#E6F1FF', // Light blue-white for primary text
      secondary: '#8892B0', // Muted blue for secondary text
    },
    error: {
      main: '#FF5370', // Bright red for error states
    },
    warning: {
      main: '#FFCB6B', // Amber for warnings
    },
    success: {
      main: '#82AAFF', // Light blue for success states
    },
    info: {
      main: '#89DDFF', // Light cyan for information
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: '4.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.4rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.3rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.05rem',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.9rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 8px 16px -4px rgba(0, 191, 165, 0.5)',
          '&:hover': {
            boxShadow: '0 12px 20px -4px rgba(0, 191, 165, 0.6)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-2px)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(100, 255, 218, 0.08)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          position: 'relative',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0%',
            height: '2px',
            bottom: -2,
            left: 0,
            backgroundColor: '#64FFDA',
            transition: 'all 0.3s ease-in-out',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(17, 34, 64, 0.8)',
          boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 30px -15px rgba(2, 12, 27, 0.7)',
            border: '1px solid rgba(100, 255, 218, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
        elevation2: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(17, 34, 64, 0.9)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
        filled: {
          backgroundColor: 'rgba(100, 255, 218, 0.15)',
          '&:hover': {
            backgroundColor: 'rgba(100, 255, 218, 0.25)',
          },
        },
        outlined: {
          borderColor: 'rgba(100, 255, 218, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(100, 255, 218, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(100, 255, 218, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#64FFDA',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 8px rgba(0,0,0,0.12)',
    '0 6px 12px rgba(0,0,0,0.14)',
    '0 8px 16px rgba(0,0,0,0.16)',
    '0 10px 20px rgba(0,0,0,0.18)',
    '0 12px 24px rgba(0,0,0,0.2)',
    '0 14px 28px rgba(0,0,0,0.22)',
    '0 16px 32px rgba(0,0,0,0.24)',
    '0 18px 36px rgba(0,0,0,0.26)',
    '0 20px 40px rgba(0,0,0,0.28)',
    '0 22px 44px rgba(0,0,0,0.3)',
    '0 24px 48px rgba(0,0,0,0.32)',
    '0 26px 52px rgba(0,0,0,0.34)',
    '0 28px 56px rgba(0,0,0,0.36)',
    '0 30px 60px rgba(0,0,0,0.38)',
    '0 32px 64px rgba(0,0,0,0.4)',
    '0 34px 68px rgba(0,0,0,0.42)',
    '0 36px 72px rgba(0,0,0,0.44)',
    '0 38px 76px rgba(0,0,0,0.46)',
    '0 40px 80px rgba(0,0,0,0.48)',
    '0 42px 84px rgba(0,0,0,0.5)',
    '0 44px 88px rgba(0,0,0,0.52)',
    '0 46px 92px rgba(0,0,0,0.54)',
    '0 48px 96px rgba(0,0,0,0.56)',
  ],
});

export default theme;