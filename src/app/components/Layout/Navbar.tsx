// src/app/components/Layout/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  AppBarProps,
  Toolbar,
  Typography,
  Button,
  Box,
  Hidden,
  IconButton,
  useScrollTrigger,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  alpha,
  Tooltip,
  Zoom,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import VisitorCounter from '../VisitorCounter';

interface NavItem {
  label: string;
  path: string;
  id: string;
}

interface ElevationScrollProps {
  children: React.ReactElement<AppBarProps>;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backdropFilter: trigger ? 'blur(16px)' : 'none',
      backgroundColor: trigger 
        ? alpha(theme.palette.background.default, 0.85) 
        : 'transparent',
      boxShadow: trigger 
        ? `0 10px 30px -10px ${alpha(theme.palette.common.black, 0.3)}` 
        : 'none',
      transition: 'all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
      py: trigger ? 0.5 : 1,
      borderBottom: trigger 
        ? `1px solid ${alpha(theme.palette.primary.main, 0.15)}` 
        : 'none',
    },
  });
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const controls = useAnimation();

  // Define sections for scroll tracking
  const sections = [
    { id: "about", navId: "01" },
    { id: "experience", navId: "02" },
    { id: "work", navId: "03" },
    { id: "contact", navId: "04" }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Track active section
      const currentPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          
          if (currentPosition >= top && currentPosition < bottom) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, activeSection, sections]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems: NavItem[] = [
    { label: 'About', path: '/#about', id: '01' },
    { label: 'Experience', path: '/#experience', id: '02' },
    { label: 'Work', path: '/#work', id: '03' },
    { label: 'Contact', path: '/#contact', id: '04' },
  ];

  const logoVariants = {
    normal: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05,
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  };

  const navButtonVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: { 
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const drawerItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({ 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  const isActive = (id: string) => {
    if (!activeSection && id === '01') return true;
    return sections.find(section => section.id === activeSection)?.navId === id;
  };

  const drawer = (
    <Box sx={{ 
      width: 280, 
      height: '100%', 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: alpha(theme.palette.background.paper, 0.97),
      backdropFilter: 'blur(10px)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 6 }}>
        <IconButton
          onClick={handleDrawerToggle}
          color="inherit"
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            }
          }}
        >
          <motion.div
            animate={mobileOpen ? "open" : "closed"}
            variants={menuIconVariants}
            transition={{ duration: 0.3 }}
          >
            <CloseIcon />
          </motion.div>
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        <AnimatePresence>
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="closed"
              animate="open"
              variants={drawerItemVariants}
            >
              <ListItem 
                component={Link}
                href={item.path}
                onClick={handleDrawerToggle}
                sx={{ 
                  color: isActive(item.id) ? 'primary.main' : 'text.primary',
                  py: 2.5,
                  my: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  transition: 'all 0.2s ease-in-out',
                  textDecoration: 'none',
                  position: 'relative',
                  pl: 3,
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    backgroundColor: isActive(item.id) ? theme.palette.primary.main : 'transparent',
                    borderRadius: '0 4px 4px 0',
                    transition: 'all 0.3s ease-in-out',
                  },
                  '&:hover::before': {
                    backgroundColor: theme.palette.primary.main,
                    width: '6px',
                  }
                }}
              >
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        sx={{ 
                          mr: 2, 
                          fontFamily: 'monospace',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          opacity: 0.9,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight={isActive(item.id) ? 600 : 400}
                        fontSize="1.1rem"
                        sx={{
                          position: 'relative',
                          display: 'inline-block',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: isActive(item.id) ? '100%' : '0%',
                            height: '2px',
                            bottom: -4,
                            left: 0,
                            backgroundColor: theme.palette.primary.main,
                            transition: 'all 0.3s ease-in-out',
                          },
                          '&:hover::after': {
                            width: '100%',
                          }
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <VisitorCounter variant="navbar" />
        </Box>
      </Box>
      {/* <Box sx={{ pb: 4 }}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            href="/resume.pdf"
            target="_blank"
            download="resume.pdf"
            startIcon={<DownloadIcon />}
            sx={{
              py: 1.5,
              fontWeight: 600,
              letterSpacing: 0.5,
              borderRadius: 8,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
              background: `linear-gradient(135deg, 
                ${theme.palette.primary.main} 0%,
                ${theme.palette.secondary.main} 50%,
                ${alpha(theme.palette.primary.light, 0.9)} 100%
              )`,
              backgroundSize: '200% 200%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg,
                  ${alpha(theme.palette.common.white, 0.1)} 0%,
                  ${alpha(theme.palette.common.white, 0.2)} 50%,
                  ${alpha(theme.palette.common.white, 0.1)} 100%
                )`,
                opacity: 0,
                transition: 'opacity 0.4s ease',
              },
              '&:hover': {
                backgroundPosition: 'right center',
                transform: 'translateY(-2px)',
                boxShadow: `
                  0 12px 20px -4px ${alpha(theme.palette.primary.main, 0.5)},
                  0 0 20px ${alpha(theme.palette.primary.main, 0.2)},
                  0 0 40px ${alpha(theme.palette.secondary.main, 0.2)}
                `,
                '&::before': {
                  opacity: 1,
                }
              }
            }}
          >
            Download Resume
          </Button>
        </motion.div>
      </Box> */}
    </Box>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="transparent" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <motion.div
                    variants={logoVariants}
                    whileHover="hover"
                    initial="normal"
                  >
                    <Box
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 'auto',
                        minWidth: 180,
                        height: 48,
                        position: 'relative',
                        overflow: 'visible',
                        perspective: '1000px',
                        '&:hover': {
                          '& .logo-glow': {
                            opacity: 1,
                            transform: 'scale(1.2)',
                            filter: 'blur(20px)',
                          },
                          '& .logo-container': {
                            transform: 'rotateX(10deg) rotateY(-15deg) translateZ(10px)',
                            boxShadow: `
                              0 5px 15px ${alpha(theme.palette.primary.main, 0.3)},
                              0 0 30px ${alpha(theme.palette.primary.main, 0.2)},
                              0 0 50px ${alpha(theme.palette.secondary.main, 0.1)}
                            `,
                          },
                          '& .logo-text': {
                            transform: 'translateZ(20px)',
                            '& .main-text': {
                              background: `linear-gradient(90deg,
                                ${theme.palette.primary.main} 0%,
                                ${theme.palette.secondary.main} 50%,
                                ${theme.palette.primary.main} 100%
                              )`,
                              backgroundSize: '200% auto',
                              animation: 'shine 2s linear infinite',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            },
                            '& .sub-text': {
                              color: alpha(theme.palette.primary.main, 0.9),
                            }
                          },
                          '& .logo-symbol': {
                            transform: 'translateZ(30px) rotateY(-45deg)',
                            '&::after': {
                              opacity: 1,
                              transform: 'translateZ(-1px) scale(1.4)',
                            }
                          },
                          '& .accent-line': {
                            opacity: 1,
                            transform: 'scaleX(1.2)',
                            background: `linear-gradient(90deg,
                              transparent 0%,
                              ${theme.palette.primary.main} 20%,
                              ${theme.palette.secondary.main} 50%,
                              ${theme.palette.primary.main} 80%,
                              transparent 100%
                            )`,
                          }
                        },
                        '@keyframes shine': {
                          '0%': {
                            backgroundPosition: '200% center',
                          },
                          '100%': {
                            backgroundPosition: '-200% center',
                          },
                        }
                      }}
                    >
                      {/* Background Glow Effect */}
                      <Box
                        className="logo-glow"
                        sx={{
                          position: 'absolute',
                          top: -20,
                          left: -20,
                          right: -20,
                          bottom: -20,
                          background: `radial-gradient(
                            circle at center,
                            ${alpha(theme.palette.primary.main, 0.2)} 0%,
                            ${alpha(theme.palette.secondary.main, 0.15)} 25%,
                            ${alpha(theme.palette.primary.main, 0.1)} 50%,
                            transparent 70%
                          )`,
                          filter: 'blur(15px)',
                          opacity: 0,
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: 0,
                          transformOrigin: 'center',
                        }}
                      />

                      {/* Main Logo Container */}
                      <Box
                        className="logo-container"
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          padding: '8px 16px',
                          borderRadius: '12px',
                          background: `linear-gradient(135deg,
                            ${alpha(theme.palette.background.paper, 0.8)} 0%,
                            ${alpha(theme.palette.background.paper, 0.9)} 100%
                          )`,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          boxShadow: `
                            0 4px 12px ${alpha(theme.palette.common.black, 0.1)},
                            0 0 1px ${alpha(theme.palette.primary.main, 0.2)}
                          `,
                          zIndex: 1,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Logo Symbol */}
                        <Box
                          className="logo-symbol"
                          sx={{
                            position: 'relative',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transformStyle: 'preserve-3d',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              inset: -4,
                              background: `linear-gradient(135deg,
                                ${alpha(theme.palette.primary.main, 0.4)} 0%,
                                ${alpha(theme.palette.secondary.main, 0.4)} 100%
                              )`,
                              borderRadius: '10px',
                              opacity: 0,
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              filter: 'blur(8px)',
                            }
                          }}
                        >
                          <Box
                            component={motion.div}
                            sx={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '8px',
                              background: `linear-gradient(135deg,
                                ${theme.palette.primary.main} 0%,
                                ${theme.palette.secondary.main} 100%
                              )`,
                              transform: 'perspective(500px) rotateY(-15deg)',
                            }}
                            animate={{
                              rotateY: ['-15deg', '15deg', '-15deg'],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              ease: 'easeInOut',
                            }}
                          />
                          <Typography
                            sx={{
                              position: 'absolute',
                              color: 'white',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              fontFamily: '"Fira Code", monospace',
                              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                          >
                            S
                          </Typography>
                        </Box>

                        {/* Logo Text */}
                        <Box
                          className="logo-text"
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <Typography
                            className="main-text"
                            sx={{
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              letterSpacing: '0.5px',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            Roman
                          </Typography>
                          <Typography
                            className="sub-text"
                            sx={{
                              fontSize: '0.7rem',
                              color: alpha(theme.palette.text.secondary, 0.8),
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              fontWeight: 500,
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            Portfolio
                          </Typography>
                        </Box>

                        {/* Animated Accent Line */}
                        <Box
                          className="accent-line"
                          component={motion.div}
                          sx={{
                            position: 'absolute',
                            bottom: -1,
                            left: '10%',
                            width: '80%',
                            height: 2,
                            background: `linear-gradient(90deg,
                              transparent 0%,
                              ${theme.palette.primary.main} 50%,
                              transparent 100%
                            )`,
                            opacity: 0.6,
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                          animate={{
                            opacity: [0.6, 1, 0.6],
                            width: ['80%', '90%', '80%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'easeInOut',
                          }}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                </Link>
              </motion.div>

              <Box sx={{ flexGrow: 1 }} />

              <Hidden mdDown>
                <Box sx={{ mr: 3 }}>
                  <VisitorCounter variant="navbar" />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item, index) => (
                    <Tooltip 
                      key={item.id}
                      title={item.label} 
                      placement="bottom" 
                      TransitionComponent={Zoom}
                      arrow
                      enterDelay={400}
                    >
                      <motion.div
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={navButtonVariants}
                        custom={index}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link 
                          href={item.path}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            sx={{
                              mx: { md: 1, lg: 2 },
                              color: isActive(item.id) ? 'primary.main' : 'text.primary',
                              fontWeight: isActive(item.id) ? 600 : 400,
                              fontSize: '0.95rem',
                              position: 'relative',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              py: 1.5,
                              px: 3,
                              borderRadius: '16px',
                              overflow: 'hidden',
                              backdropFilter: 'blur(8px)',
                              background: isActive(item.id) 
                                ? `linear-gradient(135deg,
                                    ${alpha(theme.palette.primary.main, 0.12)} 0%,
                                    ${alpha(theme.palette.secondary.main, 0.08)} 50%,
                                    ${alpha(theme.palette.primary.main, 0.12)} 100%
                                  )`
                                : 'transparent',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: `radial-gradient(circle at center,
                                  ${alpha(theme.palette.primary.main, 0.15)} 0%,
                                  ${alpha(theme.palette.secondary.main, 0.1)} 35%,
                                  transparent 100%
                                )`,
                                opacity: 0,
                                transform: 'scale(1.5)',
                                transformOrigin: 'center',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0)}`,
                                borderRadius: '16px',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              },
                              '&:hover': {
                                color: theme.palette.primary.main,
                                transform: 'translateY(-2px)',
                                '&::before': {
                                  opacity: 1,
                                  transform: 'scale(1)',
                                },
                                '&::after': {
                                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                  boxShadow: `
                                    0 4px 15px ${alpha(theme.palette.primary.main, 0.15)},
                                    0 0 30px ${alpha(theme.palette.primary.main, 0.1)}
                                  `,
                                }
                              },
                              '& .underline': {
                                content: '""',
                                position: 'absolute',
                                bottom: '8px',
                                left: '50%',
                                width: isActive(item.id) ? '45%' : '0%',
                                height: '2px',
                                background: `linear-gradient(90deg,
                                  ${alpha(theme.palette.primary.main, 0)} 0%,
                                  ${theme.palette.primary.main} 50%,
                                  ${alpha(theme.palette.primary.main, 0)} 100%
                                )`,
                                transform: 'translateX(-50%)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderRadius: '4px',
                                filter: 'blur(0.5px)',
                                boxShadow: isActive(item.id)
                                  ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`
                                  : 'none',
                              },
                              '&:hover .underline': {
                                width: '45%',
                                filter: 'blur(0px)',
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                              }
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                '&::before': {
                                  content: `"${item.id}"`,
                                  fontSize: '0.7rem',
                                  fontFamily: 'monospace',
                                  color: alpha(theme.palette.primary.main, 0.7),
                                  fontWeight: 500,
                                  marginRight: '2px',
                                  opacity: 0,
                                  transform: 'translateX(-10px)',
                                  transition: 'all 0.3s ease',
                                },
                                '&:hover::before': {
                                  opacity: 1,
                                  transform: 'translateX(0)',
                                }
                              }}
                            >
                              {item.label}
                            </Typography>
                            <span className="underline" />
                          </Button>
                        </Link>
                      </motion.div>
                    </Tooltip>
                  ))}
                  {/* <motion.div
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                    variants={navButtonVariants}
                    custom={navItems.length}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      component="a"
                      href="/resume.pdf"
                      target="_blank"
                      download="resume.pdf"
                      startIcon={<DownloadIcon />}
                      sx={{ 
                        ml: { md: 2, lg: 3 },
                        py: 1.4,
                        px: 3,
                        borderWidth: 1.5,
                        borderRadius: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg,
                          ${alpha(theme.palette.primary.main, 0.08)} 0%,
                          ${alpha(theme.palette.secondary.main, 0.05)} 50%,
                          ${alpha(theme.palette.primary.main, 0.08)} 100%
                        )`,
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        backdropFilter: 'blur(8px)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: `radial-gradient(circle at center,
                            ${alpha(theme.palette.primary.main, 0.15)} 0%,
                            ${alpha(theme.palette.secondary.main, 0.1)} 35%,
                            transparent 100%
                          )`,
                          opacity: 0,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -1,
                          background: `linear-gradient(135deg,
                            ${theme.palette.primary.main} 0%,
                            ${theme.palette.secondary.main} 50%,
                            ${theme.palette.primary.main} 100%
                          )`,
                          borderRadius: '17px',
                          zIndex: -1,
                          opacity: 0,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        },
                        '& .MuiButton-startIcon': {
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '& svg': {
                            fontSize: '1.2rem',
                          }
                        },
                        '&:hover': {
                          borderColor: 'transparent',
                          transform: 'translateY(-3px)',
                          color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                          boxShadow: `
                            0 10px 20px -10px ${alpha(theme.palette.primary.main, 0.5)},
                            0 0 30px ${alpha(theme.palette.primary.main, 0.2)}
                          `,
                          '&::before': {
                            opacity: 1,
                          },
                          '&::after': {
                            opacity: 0.15,
                          },
                          '& .MuiButton-startIcon': {
                            transform: 'translateX(-2px) scale(1.1)',
                            '& svg': {
                              transform: 'rotate(-8deg)',
                            }
                          }
                        },
                        '&:active': {
                          transform: 'translateY(-1px)',
                          '& .MuiButton-startIcon svg': {
                            transform: 'rotate(-12deg)',
                          }
                        }
                      }}
                    >
                      Resume
                    </Button>
                  </motion.div> */}
                </Box>
              </Hidden>

              <Hidden mdUp>
                <Box sx={{ mr: 2 }}>
                  <VisitorCounter variant="navbar" />
                </Box>
                
                <motion.div
                  animate={mobileOpen ? "open" : "closed"}
                  variants={menuIconVariants}
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ 
                      ml: 2, 
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </motion.div>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <Hidden mdUp>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: { xs: '100%', sm: 400 },
              borderTopLeftRadius: { xs: 0, sm: '16px' },
              borderBottomLeftRadius: { xs: 0, sm: '16px' },
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navbar;