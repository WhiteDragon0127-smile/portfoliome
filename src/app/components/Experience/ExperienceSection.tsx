// src/app/components/Experience/ExperienceSection.tsx
'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Tabs, 
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Theme,
  alpha,
  Chip,
  useTheme
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../../../lib/data';

const ExperienceSection: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabVariants = {
    selected: {
      color: theme.palette.primary.main,
      x: isMobile ? 0 : 10,
      transition: { duration: 0.3 }
    },
    notSelected: {
      color: theme.palette.text.secondary,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      transition: { duration: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Container maxWidth="lg" id="experience">
      <Box 
        sx={{ 
          py: { xs: 10, md: 16 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            right: '-15%',
            width: '30%',
            height: '40%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.4,
            filter: 'blur(60px)',
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              mb: 5,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: { xs: '100px', md: '300px' },
                height: '1px',
                ml: 3,
                background: 'linear-gradient(90deg, rgba(3, 218, 198, 0.7), rgba(3, 218, 198, 0.1))',
              },
            }}
          >
            <Box component="span" sx={{ color: 'primary.main', mr: 2 }}>
              02.
            </Box>
            <Box 
              component={motion.span}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="gradient-text"
              sx={{ 
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '-0.5px',
              }}
            >
              Where I've Worked
            </Box>
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            mt: 6, 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            backgroundColor: alpha(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: `
              0 20px 40px -15px rgba(2, 12, 27, 0.7),
              inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)},
              inset 0 0 40px ${alpha(theme.palette.primary.main, 0.03)}
            `,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
            }
          }}
        >
          <Box 
            sx={{ 
              borderBottom: { xs: 1, md: 0 }, 
              borderRight: { xs: 0, md: 1 }, 
              borderColor: alpha(theme.palette.primary.main, 0.1),
              backgroundColor: alpha(theme.palette.background.default, 0.7),
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                  linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                  radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.05)}, transparent 70%)
                `,
                opacity: 0.5,
              }
            }}
          >
            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              value={value}
              onChange={handleChange}
              aria-label="Work experience tabs"
              TabIndicatorProps={{
                style: {
                  background: `linear-gradient(${isMobile ? 'to right' : 'to bottom'}, #03DAC6, ${alpha('#03DAC6', 0.3)})`,
                  height: isMobile ? '3px' : 'auto',
                  width: !isMobile ? '3px' : 'auto',
                  borderRadius: '4px',
                  boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                }
              }}
              sx={{
                minWidth: { md: '250px' },
                minHeight: { xs: '48px', md: 'auto' },
                '& .MuiTab-root': {
                  alignItems: { md: 'flex-start' },
                  justifyContent: { md: 'flex-start' },
                  textAlign: { md: 'left' },
                  py: 2.5,
                  px: 3,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  letterSpacing: 0.5,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(120deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                  },
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 600,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    '&::before': {
                      transform: 'translateX(100%)',
                    }
                  },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    '&::before': {
                      transform: 'translateX(100%)',
                    }
                  },
                },
              }}
            >
              {experienceData.map((job, index) => (
                <Tab
                  key={index}
                  component={motion.div}
                  variants={tabVariants}
                  animate={value === index ? "selected" : "notSelected"}
                  label={job.company}
                  id={`vertical-tab-${index}`}
                  aria-controls={`vertical-tabpanel-${index}`}
                  sx={{
                    display: 'flex',
                  }}
                />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
            <AnimatePresence mode="wait">
              {experienceData.map((job, index) => (
                value === index && (
                  <Box
                    key={index}
                    role="tabpanel"
                    id={`vertical-tabpanel-${index}`}
                    aria-labelledby={`vertical-tab-${index}`}
                    sx={{ height: '100%' }}
                  >
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key={index}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <motion.div
                          initial={{ rotate: -10, scale: 0.9 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <WorkOutlineIcon 
                            color="primary" 
                            sx={{ 
                              mr: 1.5, 
                              fontSize: '1.8rem',
                              filter: 'drop-shadow(0 0 6px rgba(3, 218, 198, 0.4))',
                            }} 
                          />
                        </motion.div>
                        <Typography 
                          variant="h4" 
                          component="h3" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '1.4rem', md: '1.6rem' },
                            letterSpacing: '-0.5px',
                          }}
                        >
                          {job.title}{' '}
                          <Box 
                            component="span" 
                            color="primary.main"
                            sx={{ fontWeight: 600 }}
                          >
                            @ {job.company}
                          </Box>
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ 
                          fontFamily: 'monospace', 
                          mb: 3,
                          fontSize: '0.9rem',
                          pl: 0.5
                        }}
                      >
                        {job.date}
                      </Typography>

                      <List 
                        sx={{ 
                          mt: 1,
                          mb: 3,
                          backgroundColor: alpha(theme.palette.background.default, 0.4),
                          borderRadius: 3,
                          p: { xs: 2, md: 3 },
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `
                              linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                              radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.05)}, transparent 70%)
                            `,
                            opacity: 0.5,
                          },
                          boxShadow: `
                            inset 0 0 20px ${alpha(theme.palette.primary.main, 0.03)},
                            0 10px 20px -10px ${alpha(theme.palette.primary.main, 0.1)}
                          `,
                        }}
                      >
                        {job.responsibilities.map((item, idx) => (
                          <motion.div
                            key={idx}
                            variants={itemVariants}
                          >
                            <ListItem 
                              alignItems="flex-start" 
                              sx={{ 
                                px: 0, 
                                pb: idx === job.responsibilities.length - 1 ? 0 : 2,
                                pt: idx === 0 ? 0 : 2,
                                borderBottom: idx === job.responsibilities.length - 1 ? 0 : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                  '& .MuiListItemIcon-root': {
                                    transform: 'translateX(5px)',
                                    color: theme.palette.primary.main,
                                  },
                                  '& .MuiListItemText-root': {
                                    color: alpha(theme.palette.text.primary, 0.9),
                                  }
                                }
                              }}
                            >
                              <ListItemIcon 
                                sx={{ 
                                  minWidth: '30px', 
                                  color: alpha(theme.palette.primary.main, 0.7),
                                  mt: '3px',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <ArrowRightIcon />
                              </ListItemIcon>
                              <ListItemText 
                                primary={item} 
                                primaryTypographyProps={{ 
                                  color: 'text.secondary',
                                  fontSize: '0.95rem',
                                  lineHeight: 1.7,
                                }} 
                                sx={{ transition: 'all 0.3s ease' }}
                              />
                            </ListItem>
                          </motion.div>
                        ))}
                      </List>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, gap: 1 }}>
                        {job.technologies.map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                            component={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.3 }}
                            sx={{
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                              color: alpha(theme.palette.text.primary, 0.7),
                              fontFamily: 'monospace',
                              fontSize: '0.75rem',
                              backdropFilter: 'blur(4px)',
                              background: alpha(theme.palette.background.paper, 0.5),
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </motion.div>
                  </Box>
                )
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ExperienceSection;