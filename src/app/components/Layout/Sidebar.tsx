// src/app/components/Layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import { Box, IconButton, Stack, alpha, Tooltip, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { motion, type Variants } from 'framer-motion';
import { personalInfo } from '../../../lib/data';

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Only render social icons that are defined in personalInfo
  const socialLinks = [

   
    {
      name: 'Email',
      icon: <EmailIcon />,
      url: `mailto:${personalInfo.email}`,
      color: theme.palette.primary.main
    }
  ].filter(link => link.url);

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.12,
        delayChildren: 1
      }
    }
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, x: -20, y: 15 },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        mass: 0.8
      }
    }
  } satisfies Variants;
  
  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: '120px',
      opacity: 1,
      transition: { 
        delay: 1.8,
        duration: 1.2,
        ease: "easeOut"
      }
    }
  } satisfies Variants;

  return (
    <Box
      component={motion.div}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '90px',
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        backdropFilter: 'blur(12px)',
        zIndex: 99,
        py: 4
      }}
    >
      <Stack spacing={3.5} alignItems="center">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.name}
            variants={itemVariants}
            custom={index}
            onHoverStart={() => setHoveredIcon(link.name)}
            onHoverEnd={() => setHoveredIcon(null)}
            whileHover={{ 
              y: -5, 
              rotate: [0, -5, 5, 0],
              transition: { 
                y: { type: "spring", stiffness: 400 },
                rotate: { duration: 0.5, repeat: Infinity }
              }
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: -2,
                background: `radial-gradient(circle at 50% 50%,
                  ${alpha(theme.palette.primary.main, 0.15)},
                  transparent 70%
                )`,
                opacity: hoveredIcon === link.name ? 1 : 0,
                transition: 'opacity 0.3s ease',
                filter: 'blur(8px)',
                borderRadius: '16px',
              }}
            />
            <Tooltip 
              title={link.name} 
              placement="right" 
              arrow
              enterDelay={200}
              leaveDelay={200}
            >
              <IconButton
                component="a"
                href={link.url}
                target={link.name === 'Email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.name}
                sx={{
                  color: hoveredIcon === link.name ? link.color : alpha(theme.palette.text.primary, 0.7),
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  width: 45,
                  height: 45,
                  background: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${alpha(theme.palette.divider, hoveredIcon === link.name ? 0.2 : 0.1)}`,
                  borderRadius: '14px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -1,
                    background: `linear-gradient(135deg,
                      ${alpha(link.color, 0.2)} 0%,
                      ${alpha(link.color, 0.1)} 50%,
                      ${alpha(link.color, 0.2)} 100%
                    )`,
                    borderRadius: '15px',
                    opacity: hoveredIcon === link.name ? 1 : 0,
                    transition: 'all 0.4s ease',
                  },
                  '&::after': hoveredIcon === link.name ? {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: link.color,
                    transform: 'translateX(-50%)',
                    boxShadow: `
                      0 0 10px ${link.color},
                      0 0 20px ${alpha(link.color, 0.4)}
                    `,
                    animation: 'pulse 2s infinite',
                  } : {},
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'translateX(-50%) scale(1)',
                      opacity: 1,
                    },
                    '50%': {
                      transform: 'translateX(-50%) scale(1.5)',
                      opacity: 0.5,
                    },
                    '100%': {
                      transform: 'translateX(-50%) scale(1)',
                      opacity: 1,
                    },
                  },
                  '&:hover': { 
                    color: link.color,
                    transform: 'translateY(-2px)',
                    boxShadow: `
                      0 8px 16px -4px ${alpha(link.color, 0.3)},
                      0 0 24px ${alpha(link.color, 0.15)}
                    `,
                    border: `1px solid ${alpha(link.color, 0.3)}`,
                    background: alpha(theme.palette.background.paper, 0.8),
                  },
                  '& svg': {
                    fontSize: '1.5rem',
                    filter: hoveredIcon === link.name ? `drop-shadow(0 0 4px ${alpha(link.color, 0.6)})` : 'none',
                    transition: 'all 0.3s ease',
                    transform: hoveredIcon === link.name ? 'scale(1.15)' : 'scale(1)',
                  }
                }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          </motion.div>
        ))}
        
        <Box
          component={motion.div}
          variants={lineVariants}
          sx={{
            width: '2px',
            backgroundImage: `linear-gradient(to bottom,
              transparent,
              ${alpha(theme.palette.primary.main, 0.3)} 30%,
              ${theme.palette.primary.main} 50%,
              ${alpha(theme.palette.primary.main, 0.3)} 70%,
              transparent
            )`,
            borderRadius: '4px',
            mt: 4,
            position: 'relative',
            filter: 'blur(0.5px)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              transform: 'translate(-50%, -50%)',
              boxShadow: `
                0 0 10px ${theme.palette.primary.main},
                0 0 20px ${alpha(theme.palette.primary.main, 0.4)},
                0 0 30px ${alpha(theme.palette.primary.main, 0.2)}
              `,
              animation: 'glow 2s ease-in-out infinite',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: -10,
              background: `radial-gradient(circle at center,
                ${alpha(theme.palette.primary.main, 0.15)},
                transparent 70%
              )`,
              filter: 'blur(8px)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            },
            '@keyframes pulse-glow': {
              '0%, 100%': {
                opacity: 0.5,
                transform: 'scale(1)',
              },
              '50%': {
                opacity: 1,
                transform: 'scale(1.2)',
              }
            },
            '@keyframes glow': {
              '0%, 100%': {
                opacity: 0.7,
                transform: 'translate(-50%, -50%) scale(1)',
              },
              '50%': {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(1.3)',
              }
            }
          }}
        />
      </Stack>
    </Box>
  );
};

export default Sidebar;