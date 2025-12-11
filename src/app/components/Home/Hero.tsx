// src/app/components/Home/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, useTheme, alpha, Chip } from '@mui/material';
import { motion, useAnimationControls } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { personalInfo } from '../../../lib/data';

// Typing animation constants
const TYPING_SPEED = 150;
const DELETING_SPEED = 50;
const PAUSE_TIME = 2000;

const Hero: React.FC = () => {
  const theme = useTheme();
  const controls = useAnimationControls();
  const [scrollIndicator, setScrollIndicator] = useState(true);
  
  // Typing animation states
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  
  // Possible titles to display in the typing animation
  const titles = [
    personalInfo.title,
    'AI Voice Agent Developer',
    'Mobile Developer',
    'Web Developer',
    'AI Automation Engineer',
  ];
  
  // Animate title words separately for a staggered effect
  const nameArray = personalInfo.name.split(' ');
  
  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        if (isTyping) {
          setIsPaused(false);
          setIsTyping(false);
        } else {
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          setIsPaused(false);
          setIsTyping(true);
          setDisplayText('');
        }
      } else if (isTyping) {
        const nextText = titles[titleIndex].substring(0, displayText.length + 1);
        setDisplayText(nextText);
        
        if (nextText === titles[titleIndex]) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsTyping(false);
          }, PAUSE_TIME);
        }
      } else {
        const nextText = titles[titleIndex].substring(0, displayText.length - 1);
        setDisplayText(nextText);
        
        if (nextText === '') {
          setIsTyping(true);
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isTyping ? (isPaused ? PAUSE_TIME : TYPING_SPEED) : DELETING_SPEED);
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, isPaused, titleIndex, titles]);
  
  // Pulse animation for scroll indicator
  useEffect(() => {
    controls.start({
      y: [0, 10, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    });
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40%',
          height: '70%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          zIndex: -1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '0%',
          left: '-10%',
          width: '50%',
          height: '60%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: -1,
        }
      }}
    >
      {/* Background Grid Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          opacity: 0.4,
          backgroundSize: '30px 30px',
          backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px),
                           linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.05)} 1px, transparent 1px)`,
          animation: 'fadeIn 2s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 0.4 }
          }
        }}
      />
      
      {/* Background Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '40%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          zIndex: -1,
          animation: 'floatBubble 15s infinite ease-in-out',
          '@keyframes floatBubble': {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '33%': { transform: 'translate(-30px, 30px) rotate(120deg)' },
            '66%': { transform: 'translate(30px, -30px) rotate(240deg)' },
            '100%': { transform: 'translate(0, 0) rotate(360deg)' }
          }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '120px',
          height: '120px',
          borderRadius: '30%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          zIndex: -1,
          animation: 'floatBubble2 18s infinite ease-in-out reverse',
          '@keyframes floatBubble2': {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '33%': { transform: 'translate(40px, -20px) rotate(120deg)' },
            '66%': { transform: 'translate(-40px, -40px) rotate(240deg)' },
            '100%': { transform: 'translate(0, 0) rotate(360deg)' }
          }
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box 
              sx={{ 
                minHeight: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 100px)' },
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                py: { xs: 10, md: 12 },
                position: 'relative',
                zIndex: 5,
              }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={item}>
                  <Box
                    sx={{
                      display: 'inline-block',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      px: 2,
                      py: 0.8,
                      borderRadius: '4px',
                      mb: 2,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Typography 
                      color="primary" 
                      variant="body2" 
                      component="div"
                      sx={{ 
                        fontWeight: 600,
                        letterSpacing: 1,
                        fontFamily: 'monospace',
                        fontSize: '0.9rem'
                      }}
                    >
                      Hi there, I'm
                    </Typography>
                  </Box>
                </motion.div>

                <Box sx={{ overflow: 'hidden' }}>
                  {nameArray.map((word, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      style={{ display: 'inline-block', marginRight: '0.5rem' }}
                    >
                      <Typography 
                        variant="h1" 
                        component="h1"
                        sx={{ 
                          display: 'inline-block',
                          fontWeight: 700,
                          fontSize: { xs: '3rem', sm: '3.5rem', md: '5rem', lg: '5.5rem' },
                          lineHeight: 1.1,
                          letterSpacing: '-2px',
                          background: 'linear-gradient(90deg, #E6F1FF 0%, #03DAC6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0px 4px 40px rgba(3, 218, 198, 0.15)',
                        }}
                      >
                        {word}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>

                <motion.div variants={item}>
                  <Typography 
                    variant="h2" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600,
                      mt: 1,
                      mb: 3,
                      fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                      lineHeight: 1.2,
                      color: alpha(theme.palette.text.primary, 0.8),
                      letterSpacing: '-0.5px',
                      height: { xs: '5.5rem', md: '3.5rem' },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          right: '-4px',
                          top: '10%',
                          height: '80%',
                          width: '2px',
                          backgroundColor: theme.palette.primary.main,
                          animation: 'blink-caret 0.75s step-end infinite',
                          '@keyframes blink-caret': {
                            'from, to': { opacity: 0 },
                            '50%': { opacity: 1 }
                          }
                        }
                      }}
                    >
                      {displayText}
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div variants={item}>
                  <Box
                    sx={{
                      backgroundColor: alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(8px)',
                      borderRadius: 2,
                      p: { xs: 2.5, md: 3 },
                      mb: 5,
                      maxWidth: '600px',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.5)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #03DAC6, transparent)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%)`,
                        zIndex: 0
                      },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 15px 35px -15px rgba(2, 12, 27, 0.6)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.8,
                        color: alpha(theme.palette.text.primary, 0.9),
                        mb: 0,
                        position: 'relative',
                        zIndex: 1,
                        textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(4px)',
                        backgroundColor: alpha(theme.palette.background.paper, 0.4),
                        borderRadius: 2,
                        p: 3,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        boxShadow: `
                          0 10px 30px -15px rgba(2, 12, 27, 0.5),
                          inset 0 0 30px ${alpha(theme.palette.primary.main, 0.02)}
                        `,
                        '& strong': {
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease',
                          },
                          '&:hover::after': {
                            transform: 'scaleX(1)',
                          }
                        }
                      }}
                    >
                      {personalInfo.bio.split(' ').map((word, i) => {
                        // Highlight key skills
                        const keySkills = ['AI', 'Full Stack', 'React', 'Node.js', 'Python', 'Django', 'machine learning', 'OpenAI'];
                        const isKeySkill = keySkills.some(skill => word.includes(skill));
                        
                        return isKeySkill ? 
                          <React.Fragment key={i}>
                            <strong>{word}</strong>{' '}
                          </React.Fragment> : 
                          <React.Fragment key={i}>{word}{' '}</React.Fragment>;
                      })}
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div variants={item}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      href="#work"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        fontWeight: 600,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.8)})`,
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(4px)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '200%',
                          height: '100%',
                          background: `linear-gradient(120deg, transparent, ${alpha('#ffffff', 0.3)}, transparent)`,
                          transform: 'translateX(-100%)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -1,
                          borderRadius: '13px',
                          padding: 1,
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        },
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: `
                            0 20px 40px -15px ${alpha(theme.palette.primary.main, 0.5)},
                            0 0 20px 0 ${alpha(theme.palette.primary.main, 0.2)},
                            inset 0 0 20px ${alpha(theme.palette.primary.main, 0.1)}
                          `,
                          '&::before': {
                            transform: 'translateX(100%)',
                            transition: 'transform 0.8s ease',
                          }
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      View my work
                    </Button>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      href="#about"
                      sx={{ 
                        px: 4, 
                        py: 1.5,
                        borderWidth: 2,
                        borderRadius: '12px',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        position: 'relative',
                        overflow: 'hidden',
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        backdropFilter: 'blur(4px)',
                        backgroundColor: alpha(theme.palette.background.paper, 0.4),
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -1,
                          borderRadius: '13px',
                          padding: 1,
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          transform: 'translateY(-3px)',
                          boxShadow: `
                            0 15px 30px -10px ${alpha(theme.palette.primary.main, 0.3)},
                            inset 0 0 20px ${alpha(theme.palette.primary.main, 0.05)}
                          `,
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      About me
                    </Button>
                  </Box>
                </motion.div>

                <motion.div variants={item}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    
                    
                    
                    {/* <Chip
                      label={personalInfo.location}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        color: alpha(theme.palette.text.primary, 0.8),
                        fontWeight: 500,
                        ml: 1,
                        backgroundColor: alpha(theme.palette.background.paper, 0.5),
                        '& .MuiChip-label': {
                          px: 1.5,
                        },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: alpha(theme.palette.primary.main, 0.6),
                          transform: 'translateY(-2px)',
                          boxShadow: `0 5px 10px -5px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }
                      }}
                    /> */}
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          </Grid>
          
          {/* Profile Image */}
          <Grid 
            item 
            xs={12} 
            md={5} 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'relative'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.5
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    background: `
                      radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
                      linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%),
                      linear-gradient(-45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)
                    `,
                    animation: 'rotate 30s linear infinite',
                    zIndex: -1,
                    filter: 'blur(10px)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    background: `
                      radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 40%),
                      conic-gradient(from 0deg, ${alpha(theme.palette.primary.main, 0.03)}, transparent, ${alpha(theme.palette.primary.main, 0.03)})
                    `,
                    animation: 'rotate 20s linear infinite reverse',
                    zIndex: -1,
                    filter: 'blur(8px)',
                  },
                }}
              >
                {/* Logo Container */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '400px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'float 6s ease-in-out infinite',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -2,
                      padding: 2,
                      borderRadius: '50%',
                      background: `
                        linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.3)}, transparent 60%),
                        linear-gradient(-45deg, transparent 40%, ${alpha(theme.palette.primary.main, 0.3)})
                      `,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      animation: 'borderRotate 8s linear infinite',
                      filter: 'blur(4px)',
                    },
                    '@keyframes borderRotate': {
                      '0%': { transform: 'rotate(0deg) scale(1)' },
                      '50%': { transform: 'rotate(180deg) scale(1.02)' },
                      '100%': { transform: 'rotate(360deg) scale(1)' }
                    },
                    '@keyframes float': {
                      '0%, 100%': { 
                        transform: 'translateY(0px) rotate(0deg)',
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                      },
                      '50%': { 
                        transform: 'translateY(-15px) rotate(2deg)',
                        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.2))'
                      },
                    }
                  }}
                >
                  {/* Outer Ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      animation: 'rotate 20s linear infinite',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -1,
                        borderRadius: '50%',
                        padding: 1,
                        background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'rotate 10s linear infinite reverse',
                      },
                      '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  />

                  {/* Center Circle */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '75%',
                      height: '75%',
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: `
                        0 24px 45px -12px ${alpha(theme.palette.primary.main, 0.25)},
                        0 0 20px 0 ${alpha(theme.palette.primary.main, 0.1)},
                        inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)},
                        inset 0 0 30px ${alpha(theme.palette.primary.main, 0.1)}
                      `,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `
                          linear-gradient(45deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}),
                          radial-gradient(circle at 50% 50%, transparent 50%, ${alpha(theme.palette.primary.main, 0.08)})
                        `,
                        animation: 'shimmer 2s linear infinite',
                      },
                      '@keyframes shimmer': {
                        '0%': { transform: 'translateX(-100%) rotate(0deg)' },
                        '100%': { transform: 'translateX(100%) rotate(360deg)' }
                      }
                    }}
                  >
                    {/* Profile Image */}
                    <Box
                      component="img"
                      src="/profile.png"
                      alt="Profile photo"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'contrast(1.05) brightness(1.02) saturate(1.05)',
                        '&:hover': {
                          transform: 'scale(1.04) rotate(1deg)',
                          filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                        }
                      }}
                    />

                    {/* Decorative Lines */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                          linear-gradient(45deg, transparent 45%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 55%),
                          linear-gradient(-45deg, transparent 45%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 55%),
                          radial-gradient(circle at 50% 50%, transparent 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%),
                          conic-gradient(from 0deg, transparent, ${alpha(theme.palette.primary.main, 0.05)}, transparent)
                        `,
                        animation: 'shine 3s ease-in-out infinite',
                        '@keyframes shine': {
                          '0%, 100%': { 
                            opacity: 0, 
                            transform: 'scale(1) rotate(0deg)',
                            filter: 'blur(5px)'
                          },
                          '50%': { 
                            opacity: 1, 
                            transform: 'scale(1.1) rotate(180deg)',
                            filter: 'blur(0px)'
                          }
                        }
                      }}
                    />
                  </Box>

                  {/* Decorative Dots */}
                  {[...Array(12)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'absolute',
                        width: index % 3 === 0 ? '12px' : '8px',
                        height: index % 3 === 0 ? '12px' : '8px',
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.primary.main, 0.3),
                        backdropFilter: 'blur(2px)',
                        top: `${Math.cos(index * Math.PI / 6) * 190 + 200}px`,
                        left: `${Math.sin(index * Math.PI / 6) * 190 + 200}px`,
                        animation: `pulse 2s ease-in-out infinite ${index * 0.15}s`,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          background: `radial-gradient(circle at center, ${alpha(theme.palette.primary.main, 0.2)}, transparent)`,
                          animation: 'ripple 2s ease-in-out infinite',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -2,
                          borderRadius: '50%',
                          background: alpha(theme.palette.primary.main, 0.1),
                          filter: 'blur(2px)',
                        },
                        '@keyframes ripple': {
                          '0%': { 
                            transform: 'scale(1)',
                            opacity: 1,
                            filter: 'blur(0px)'
                          },
                          '100%': { 
                            transform: 'scale(3)',
                            opacity: 0,
                            filter: 'blur(2px)'
                          }
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Mobile Profile Image (Only visible on mobile) */}
          <Grid 
            item 
            xs={12}
            sx={{ 
              display: { xs: 'block', md: 'none' },
              mb: 4
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.5
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Mobile Logo Container */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'floatMobile 6s ease-in-out infinite',
                    '@keyframes floatMobile': {
                      '0%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-12px)' },
                      '100%': { transform: 'translateY(0px)' }
                    }
                  }}
                >
                  {/* Mobile Outer Ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      animation: 'rotateMobile 15s linear infinite',
                      '@keyframes rotateMobile': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  />

                  {/* Mobile Inner Ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      borderRadius: '50%',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      animation: 'rotateMobile 10s linear infinite reverse',
                      '@keyframes rotateMobile': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  />

                  {/* Mobile Center Circle */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '75%',
                      height: '75%',
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: `
                        0 20px 40px -15px ${alpha(theme.palette.primary.main, 0.3)},
                        0 0 20px 0 ${alpha(theme.palette.primary.main, 0.1)},
                        inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.15)}
                      `
                    }}
                  >
                    {/* Mobile Profile Image */}
                    <Box
                      component="img"
                      src="/profile.png"
                      alt="Profile photo"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'contrast(1.05) brightness(1.02) saturate(1.05)',
                        '&:hover': {
                          transform: 'scale(1.08)',
                          filter: 'contrast(1.1) brightness(1.05) saturate(1.1)'
                        }
                      }}
                    />

                    {/* Mobile Decorative Lines */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                          linear-gradient(45deg, transparent 45%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 55%),
                          linear-gradient(-45deg, transparent 45%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 55%)
                        `,
                        animation: 'shineMobile 3s ease-in-out infinite',
                        '@keyframes shineMobile': {
                          '0%': { opacity: 0 },
                          '50%': { opacity: 1 },
                          '100%': { opacity: 0 }
                        }
                      }}
                    />
                  </Box>

                  {/* Mobile Decorative Dots */}
                  {[...Array(6)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'absolute',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.primary.main, 0.3),
                        top: `${Math.cos(index * Math.PI / 3) * 100 + 110}px`,
                        left: `${Math.sin(index * Math.PI / 3) * 100 + 110}px`,
                        animation: `pulseMobile 2s ease-in-out infinite ${index * 0.2}s`,
                        '@keyframes pulseMobile': {
                          '0%': { transform: 'scale(1)', opacity: 0.3 },
                          '50%': { transform: 'scale(1.5)', opacity: 0.6 },
                          '100%': { transform: 'scale(1)', opacity: 0.3 }
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll Indicator */}
      {scrollIndicator && (
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
              cursor: 'pointer',
            },
            zIndex: 5
          }}
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                mb: 1,
                fontFamily: 'monospace',
                letterSpacing: 1,
                fontWeight: 600,
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              SCROLL DOWN
            </Typography>
          </motion.div>
          <motion.div 
            animate={controls}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            <Box
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                boxShadow: `0 5px 15px -5px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <KeyboardArrowDownIcon color="primary" />
            </Box>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default Hero;