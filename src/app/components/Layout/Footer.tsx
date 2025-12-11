// src/app/components/Layout/Footer.tsx
'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  Container, 
  Divider, 
  useTheme, 
  alpha,
  Grid,
  IconButton,
  Tooltip,
  Button
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { motion, type Variants } from 'framer-motion';
import { personalInfo } from '@/lib/data';

// Define a type for our social links
type SocialLinkItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  color: string;
};

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  // Create all possible social links
  const allSocialLinks: SocialLinkItem[] = [

    { 
      name: 'Email', 
      icon: <EmailIcon />, 
      href: `mailto:${personalInfo.email}`,
      color: theme.palette.primary.main
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.12
      }
    }
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } satisfies Variants;

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '100%',
          height: '1px',
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${alpha(theme.palette.primary.main, 0.2)} 20%,
            ${alpha(theme.palette.secondary.main, 0.3)} 50%,
            ${alpha(theme.palette.primary.main, 0.2)} 80%,
            transparent 100%)`,
          transform: 'translateX(-50%)',
        },
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.4 : 0.6),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, 
                        ${alpha(theme.palette.primary.main, 0.1)} 0%,
                        ${alpha(theme.palette.secondary.main, 0.05)} 50%,
                        ${alpha(theme.palette.primary.main, 0.1)} 100%
                      )`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `
                          0 4px 12px ${alpha(theme.palette.primary.main, 0.15)},
                          0 0 20px ${alpha(theme.palette.primary.main, 0.1)}
                        `,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src="/profile.png"
                      alt="Profile"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '11px',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'all 0.3s ease',
                        filter: 'contrast(1.02) brightness(1.01)',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          filter: 'contrast(1.05) brightness(1.02)',
                        }
                      }}
                    />
                    <Box
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg,
                          ${alpha(theme.palette.primary.main, 0.05)} 0%,
                          ${alpha(theme.palette.secondary.main, 0.02)} 50%,
                          ${alpha(theme.palette.primary.main, 0.05)} 100%
                        )`,
                        zIndex: 2,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        mixBlendMode: 'soft-light',
                      }}
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        ease: 'easeInOut',
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontWeight: 600,
                      color: alpha(theme.palette.text.primary, 0.9),
                      letterSpacing: '0.5px',
                      background: `linear-gradient(135deg,
                        ${theme.palette.text.primary} 0%,
                        ${alpha(theme.palette.text.primary, 0.8)} 100%
                      )`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Roman
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2.5 }}>
                  
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: alpha(theme.palette.text.secondary, 0.9),
                    fontFamily: 'monospace',
                    letterSpacing: 0.5,
                    fontWeight: 500,
                    background: `linear-gradient(135deg,
                      ${alpha(theme.palette.text.secondary, 0.9)} 0%,
                      ${alpha(theme.palette.text.secondary, 0.7)} 100%
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  © {currentYear} All Rights Reserved
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
          
          <motion.div variants={itemVariants}>
            <Divider 
              sx={{ 
                width: '70%', 
                margin: '0 auto 2.5rem',
                opacity: 0.8,
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${alpha(theme.palette.primary.main, 0.2)} 20%,
                  ${alpha(theme.palette.secondary.main, 0.3)} 50%,
                  ${alpha(theme.palette.primary.main, 0.2)} 80%,
                  transparent 100%)`,
              }} 
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Typography 
              variant="body2" 
              align="center" 
              sx={{ 
                color: alpha(theme.palette.text.secondary, 0.8),
                '& a': {
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  fontWeight: 500,
                  padding: '0 4px',
                  '&:hover': {
                    color: theme.palette.primary.light,
                    '&::before': {
                      height: '100%',
                      opacity: 0.15,
                      transform: 'translateY(0)',
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '0%',
                    backgroundColor: theme.palette.primary.main,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: -1,
                    opacity: 0,
                    transform: 'translateY(50%)',
                    borderRadius: '4px',
                  }
                }
              }}
            >
              Built with <Link href="https://nextjs.org/" target="_blank" rel="noopener">Next.js</Link> & <Link href="https://mui.com/" target="_blank" rel="noopener">Material-UI</Link>
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;