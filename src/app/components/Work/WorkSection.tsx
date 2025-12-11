// src/app/components/Work/WorkSection.tsx
'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Divider, Button, useTheme } from '@mui/material';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { featuredProjects, otherProjects } from '../../../lib/data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';

const MAX_PROJECTS = 3;

const WorkSection: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const theme = useTheme();
  
  const displayedProjects = showAllProjects 
    ? otherProjects 
    : otherProjects.slice(0, MAX_PROJECTS);
    
  const hasMoreProjects = otherProjects.length > MAX_PROJECTS;
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  } satisfies Variants;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  } satisfies Variants;

  return (
    <Container maxWidth="lg" id="work">
      <Box 
        sx={{ 
          py: { xs: 10, md: 16 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-20%',
            width: '40%',
            height: '30%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.6,
            filter: 'blur(50px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            right: '-20%',
            width: '40%',
            height: '40%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.6,
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
              03.
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
              My Notable Projects
            </Box>
          </Typography>
        </motion.div>

        <Box sx={{ mt: 10, mb: 10}}>
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.25, 0.4, 0.2, 1]
              }}
            >
              <FeaturedProject
                project={project}
                reverse={index % 2 !== 0}
                sx={{ mb: { xs: 15, md: 25 } }}
              />
            </motion.div>
          ))}
        </Box>

        <Divider 
          component={motion.div}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          sx={{ 
            my: { xs: 10, md: 16 },
            background: 'linear-gradient(90deg, transparent, rgba(3, 218, 198, 0.3), transparent)',
            height: '2px',
            border: 'none',
          }} 
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h4"
                component="h3"
                sx={{ 
                  mb: 2,
                  fontWeight: 600,
                  position: 'relative',
                  display: 'inline-block',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
                className="gradient-text"
              >
                Other Noteworthy Projects
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 6,
                  fontSize: '1.1rem',
                }}
              >
                A curated collection of additional projects that demonstrate my technical versatility
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.title + index}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (index % 3) * 0.1,
                      ease: [0.25, 0.4, 0.2, 1]
                    }}
                    style={{ height: '100%' }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
          
          {hasMoreProjects && (
            <Box 
              sx={{ 
                mt: 8, 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  startIcon={showAllProjects ? <KeyboardArrowDownIcon /> : <VisibilityIcon />}
                  sx={{ 
                    px: 4, 
                    py: 1,
                    borderWidth: 2,
                    borderRadius: '4px',
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(3, 218, 198, 0.1)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {showAllProjects ? "Show Less" : "Show More"}
                </Button>
              </motion.div>
            </Box>
          )}
        </motion.div>
      </Box>
    </Container>
  );
};

export default WorkSection;