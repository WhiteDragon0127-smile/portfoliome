// src/app/components/About/AboutSection.tsx
'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Chip, alpha, useTheme, Paper, Tooltip, Divider, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TerminalIcon from '@mui/icons-material/Terminal';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import Image from 'next/image';
import { skills } from '../../../lib/data';

const AboutSection: React.FC = () => {
  const theme = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const aiSkills = skills.filter(skill => skill.category === 'ai');
  const otherSkills = skills.filter(skill =>
    skill.category === 'devops' || skill.category === 'db' || skill.category === 'blockchain' || skill.category === 'others'
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillCategoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const chipVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, scale: 1.05, transition: { duration: 0.2 } }
  };

  // Project card with animation
  const ProjectCard = ({ title, description }: { title: string, description: string }) => (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      variants={itemVariants}
    >
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 2.5,
          mb: 2,
          border: '1px solid rgba(3, 218, 198, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px -15px rgba(3, 218, 198, 0.25)',
            borderColor: 'rgba(3, 218, 198, 0.2)',
          }
        }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              color: theme.palette.primary.main,
              width: 36,
              height: 36,
              mr: 2
            }}
          >
            <WorkOutlineIcon fontSize="small" />
          </Avatar>
          <Typography
            variant="h6"
            component="h4"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: '1.05rem',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: alpha(theme.palette.text.primary, 0.85),
            lineHeight: 1.7,
            ml: 7, // Aligned with the text next to avatar
          }}
        >
          {description}
        </Typography>
      </Box>
    </motion.div>
  );

  return (
    <Container maxWidth="lg" id="about">
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '-20%',
            width: '40%',
            height: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.7,
            filter: 'blur(70px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            right: '-20%',
            width: '30%',
            height: '40%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.5,
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
              01.
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
              About Me
            </Box>
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={5}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: { xs: 3.5, md: 4.5 },
                boxShadow: '0 15px 40px -20px rgba(2, 12, 27, 0.6)',
                border: '1px solid rgba(3, 218, 198, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 20px 50px -25px rgba(3, 218, 198, 0.25)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #03DAC6, transparent)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '30%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(3, 218, 198, 0.5))',
                }
              }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.9,
                    color: alpha(theme.palette.text.primary, 0.95),
                    mb: 3,
                  }}
                >
                  Hello! My name is <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>Kevin</Box>, and I am passionate about creating impactful, innovative digital experiences that live on the internet.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.9,
                    color: alpha(theme.palette.text.primary, 0.95),
                    mb: 3,
                  }}
                >
                  Full-Stack & Al Developer with expertise in React, Next.js, JavaScript/TypeScript, and Al technologies(LLM, LangChain, chatbots). Proficient in buildingscalable applications with Supabase, Python, and cloud services. Passionate about integrating Alsolutionsinto modern web and mobile platforms. Certified Microsoft Professional (MCP) with a strong foundation in both frontend and backend development.
                </Typography>
              </motion.div>

              <Divider
                sx={{
                  my: 4,
                  opacity: 0.6,
                  '&::before, &::after': {
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    px: 2,
                  }}
                >
                  Recent Work
                </Typography>
              </Divider>

              <motion.div
                variants={itemVariants}
                initial="visible"
                animate="visible"
              >
                <ProjectCard
                  title="dreamina.ai"
                  description="I built this AI solution platform before, you know, where folks just type prompts and get crazy good images or videos, and I wired it up with Next.js frontend, Supabase for auth and storage, Python microservices for the heavy AI stuff, and Prisma ORM to juggle all the creative data in real-time, which made the whole thing feel super smooth and flexible for artists and marketers both"
                />

                <ProjectCard
                  title="Docus.ai"
                  description="Developed Docus.ai utilizing Node.js, Express.js, and React. Implemented cutting-edge AI models and algorithms to analyze symptoms and test results, generating comprehensive health reports and potential diagnoses. Seamlessly integrated with top human doctors in the US & EU for validation of AI-generated reports. Get rapid insights and accurate diagnoses with Docus.ai, combining AI efficiency with human expertise for optimal healthcare outcomes."
                />

                <ProjectCard
                  title="Freebeat.ai"
                  description="Engineered the V9.7 platform on a sophisticated multi-agent architecture. It utilizes GPT-4o and Gemini for high-level semantic analysis of video content—interpreting mood, pace, and narrative. This data orchestrates a dedicated music composition agent, while Flux and Runway Gen-3 agents handle visual-temporal synchronization. The result is an end-to-end system that generates structurally coherent, original soundtracks precisely matched to the visual dynamics of any input video, exporting both the master track and time-coded project stems."
                />

              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.9,
                    color: alpha(theme.palette.text.primary, 0.95),
                    mt: 3,
                    fontStyle: 'italic',
                  }}
                >
                  When I'm not coding, I enjoy exploring emerging tech trends and collaborating with like-minded individuals to solve real-world problems through technology.
                </Typography>
              </motion.div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(12px)',
                  p: { xs: 3.5, md: 4.5 },
                  borderRadius: 4,
                  boxShadow: '0 15px 40px -20px rgba(2, 12, 27, 0.6)',
                  border: '1px solid rgba(3, 218, 198, 0.15)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 20px 50px -25px rgba(3, 218, 198, 0.25)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #03DAC6, transparent)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '30%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(3, 218, 198, 0.5))',
                  }
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: { xs: '1.5rem', md: '1.7rem' },
                    letterSpacing: '-0.5px',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      width: '30px',
                      height: '3px',
                      mr: 2,
                      backgroundColor: theme.palette.primary.main,
                    }
                  }}
                >
                  Skills & Technologies
                </Typography>

                <Box
                  component={motion.div}
                  variants={skillCategoryVariants}
                  sx={{
                    mb: 4,
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid rgba(3, 218, 198, 0.07)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.default, 0.7),
                      boxShadow: '0 8px 20px -15px rgba(3, 218, 198, 0.2)',
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    <CodeIcon sx={{ mr: 1.5, fontSize: '1.4rem' }} />
                    Frontend
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                    {/* <AnimatePresence> */}
                    {frontendSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial="initial"
                        animate="animate"
                        // whileHover="hover"
                        variants={chipVariants}
                        custom={index}
                        style={{ display: 'inline-block' }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHovered(skill.name)}
                        onHoverEnd={() => setHovered(null)}
                      >
                        <Chip
                          label={skill.name}
                          variant={"outlined"}
                          size="medium"
                          sx={{
                            borderColor: 'rgba(3, 218, 198, 0.3)',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            mb: 1.2,
                            py: 1.2,
                            px: 1.2,
                            '&:hover': {
                              borderColor: 'primary.main',
                              color: 'text.primary',
                              backgroundColor: 'rgba(3, 218, 198, 0.05)',
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                    {/* </AnimatePresence> */}
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  variants={skillCategoryVariants}
                  sx={{
                    mb: 4,
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid rgba(3, 218, 198, 0.07)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.default, 0.7),
                      boxShadow: '0 8px 20px -15px rgba(3, 218, 198, 0.2)',
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    <StorageIcon sx={{ mr: 1.5, fontSize: '1.4rem' }} />
                    Backend
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                    {backendSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial="initial"
                        animate="animate"
                        variants={chipVariants}
                        custom={index}
                        style={{ display: 'inline-block' }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHovered(skill.name)}
                        onHoverEnd={() => setHovered(null)}
                      >
                        <Chip
                          label={skill.name}
                          variant={"outlined"}
                          size="medium"
                          sx={{
                            borderColor: 'rgba(3, 218, 198, 0.3)',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            py: 1.2,
                            px: 1.2,
                            mb: 1.2,
                            '&:hover': {
                              color: 'text.primary',
                              borderColor: 'primary.main',
                              backgroundColor: 'rgba(3, 218, 198, 0.05)',
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  variants={skillCategoryVariants}
                  sx={{
                    mb: 4,
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid rgba(3, 218, 198, 0.07)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.default, 0.7),
                      boxShadow: '0 8px 20px -15px rgba(3, 218, 198, 0.2)',
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    <PsychologyIcon sx={{ mr: 1.5, fontSize: '1.4rem' }} />
                    AI
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                    {aiSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial="initial"
                        animate="animate"
                        variants={chipVariants}
                        custom={index}
                        style={{ display: 'inline-block' }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHovered(skill.name)}
                        onHoverEnd={() => setHovered(null)}
                      >
                        <Chip
                          label={skill.name}
                          variant={"outlined"}
                          size="medium"
                          sx={{
                            borderColor: 'rgba(3, 218, 198, 0.3)',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            py: 1.2,
                            px: 1.2,
                            mb: 1.2,
                            fontSize: '0.75rem',
                            '&:hover': {
                              borderColor: 'primary.main',
                              color: 'text.primary',
                              backgroundColor: 'rgba(3, 218, 198, 0.05)',
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  variants={skillCategoryVariants}
                  sx={{
                    backgroundColor: alpha(theme.palette.background.default, 0.5),
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid rgba(3, 218, 198, 0.07)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.default, 0.7),
                      boxShadow: '0 8px 20px -15px rgba(3, 218, 198, 0.2)',
                    }
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    <TerminalIcon sx={{ mr: 1.5, fontSize: '1.4rem' }} />
                    DevOps & Others
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                    {otherSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial="initial"
                        animate="animate"
                        variants={chipVariants}
                        custom={index}
                        style={{ display: 'inline-block' }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHovered(skill.name)}
                        onHoverEnd={() => setHovered(null)}
                      >
                        <Chip
                          label={skill.name}
                          variant={"outlined"}
                          size="medium"
                          sx={{
                            borderColor: 'rgba(3, 218, 198, 0.3)',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            mb: 1.2,
                            py: 1.2,
                            px: 1.2,
                            '&:hover': {
                              borderColor: 'primary.main',
                              backgroundColor: 'rgba(3, 218, 198, 0.05)',
                              color: 'text.primary',
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutSection;
