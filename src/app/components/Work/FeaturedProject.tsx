// src/app/components/Work/FeaturedProject.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  IconButton,
  Chip,
  SxProps,
  Theme,
  alpha,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Paper,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { Project } from '../../../types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface FeaturedProjectProps {
  project: Project;
  reverse?: boolean;
  sx?: SxProps<Theme>;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
  reverse = false,
  sx = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLongDescription, setIsLongDescription] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  // Convert project title to URL-friendly slug
  const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');

  const handleProjectClick = () => {
    router.push(`/project/${encodeURIComponent(projectSlug)}`);
  };

  // Stop propagation so these clicks don't trigger the card click
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle video click
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsVideoModalOpen(true);
  };

  // Check if description is longer than 4 lines
  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
      const height = descriptionRef.current.clientHeight;
      const lines = Math.round(height / lineHeight);
      setIsLongDescription(lines > 4);
    }
  }, []);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking "Read more"
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // Function to truncate text to ~4 lines
  const truncateText = (text: string) => {
    // Approximate truncation (about 250 chars for 4 lines)
    if (text.length > 180) {
      return text.substring(0, 180) + '...';
    }
    return text;
  };

  return (
    <>
      <Box
        sx={{
          padding: '5px',
          position: 'relative',
          ...sx,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            mb: { xs: 4, md: 8 },
          }}
        >
          {/* Image/Video Section */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '300px', md: '420px' },
              position: 'relative',
              order: { md: reverse ? 2 : 1 },
              zIndex: 1,
              cursor: 'pointer',
            }}
            onClick={handleProjectClick}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.2, 1] }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  borderRadius: { xs: 2, md: 3 },
                  overflow: 'hidden',
                  boxShadow: isHovered
                    ? '0 22px 45px -22px rgba(2, 12, 27, 0.85)'
                    : '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: isHovered
                      ? 'rgba(10, 25, 47, 0.35)'
                      : 'rgba(10, 25, 47, 0.7)',
                    mixBlendMode: 'multiply',
                    zIndex: 2,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: { xs: 2, md: 3 },
                    border: '2px solid transparent',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
                    zIndex: 2,
                    borderColor: isHovered
                      ? 'rgba(3, 218, 198, 0.5)'
                      : 'transparent',
                  },
                }}
              >
                {project.video ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={handleVideoClick}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                        className="project-image"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    ) : (
                      <Box
                        component="img"
                        src="/api/placeholder/800/500"
                        alt={project.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                        transition: 'background 0.3s ease',
                        '&:hover': {
                          background: 'rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      <PlayArrowIcon 
                        sx={{ 
                          fontSize: 80, 
                          color: 'white',
                          filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.5))',
                          transition: 'transform 0.3s ease',
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }} 
                      />
                    </Box>
                  </Box>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                    className="project-image"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <Box
                    component="img"
                    src="/api/placeholder/800/500"
                    alt={project.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                )}
              </Box>
            </motion.div>
          </Box>

          {/* Content Section */}
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            onClick={handleProjectClick}
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { md: '50%' },
              [reverse ? 'left' : 'right']: { md: '7%' },
              transform: { md: 'translateY(-50%)' },
              width: { xs: '100%', md: '45%' },
              p: { xs: 3, md: 4 },
              mt: { xs: -8, md: 0 },
              zIndex: 5,
              backgroundColor: alpha('#112240', 0.88),
              backdropFilter: 'blur(10px)',
              boxShadow: isHovered
                ? '0 25px 50px -20px rgba(2, 12, 27, 0.9)'
                : '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
              textAlign: { xs: 'left', md: reverse ? 'left' : 'right' },
              borderRadius: { xs: 2, md: 3 },
              border: `1px solid ${isHovered ? 'rgba(3, 218, 198, 0.3)' : 'rgba(3, 218, 198, 0.1)'}`,
              transition: 'all 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
              order: { md: reverse ? 1 : 2 },
              cursor: 'pointer',
              '&:hover': {
                transform: { md: 'translateY(-53%)' },
                boxShadow: '0 25px 50px -20px rgba(2, 12, 27, 0.9)',
                borderColor: 'rgba(3, 218, 198, 0.4)',
              },
            }}
          >
            <Typography
              color="primary"
              gutterBottom
              component={motion.p}
              initial={{ opacity: 0, x: reverse ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 500,
                letterSpacing: 1.2,
                fontSize: '0.9rem',
                mb: 1,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  height: '1px',
                  width: '40px',
                  backgroundColor: 'primary.main',
                }
              }}
            >
              Featured Project
            </Typography>
            <Typography
              variant="h5"
              component={motion.h3}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              gutterBottom
              sx={{
                fontWeight: 700,
                transition: 'color 0.3s ease',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: '-0.5px',
                mb: 2,
                background: isHovered ? 'linear-gradient(90deg, #03dac6, #56ccf2)' : 'none',
                backgroundClip: isHovered ? 'text' : 'none',
                WebkitBackgroundClip: isHovered ? 'text' : 'none',
                WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                '&:hover': {
                  color: isHovered ? 'inherit' : 'primary.main'
                }
              }}
            >
              {project.title}
            </Typography>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{
                backgroundColor: 'rgba(20, 45, 76, 0.6)',
                p: 3,
                borderRadius: 2,
                mb: 3,
                boxShadow: 'inset 0 0 10px rgba(2, 12, 27, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(20, 45, 76, 0.7)',
                  boxShadow: 'inset 0 0 12px rgba(2, 12, 27, 0.15)',
                }
              }}
            >
              <Typography
                variant="body2"
                paragraph
                ref={descriptionRef}
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: isLongDescription ? 1 : 0,
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  letterSpacing: '0.3px',
                }}
              >
                {isLongDescription ? truncateText(project.description) : project.description}
              </Typography>
              
              {isLongDescription && (
                <Button 
                  onClick={handleExpandClick}
                  color="primary"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 400,
                    p: 0,
                    ml: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  Read more
                </Button>
              )}
            </Box>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent={{ xs: 'flex-start', md: reverse ? 'flex-start' : 'flex-end' }}
              sx={{ mb: 3, gap: 1 }}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.technologies.map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  variant="outlined"
                  component={motion.div}
                  transition={{ duration: 0.2 }}
                  sx={{
                    mb: 0.5,
                    borderColor: 'rgba(3, 218, 198, 0.3)',
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    py: 0.7,
                    '&:hover': {
                      backgroundColor: 'rgba(3, 218, 198, 0.15)',
                      borderColor: 'primary.main',
                      color: 'text.primary',
                      boxShadow: '0 4px 8px -2px rgba(3, 218, 198, 0.25)',
                    }
                  }}
                />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: 'flex-start', md: reverse ? 'flex-start' : 'flex-end' }}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {project.githubLink && (
                <IconButton
                  component="a" 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  color="inherit"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      boxShadow: '0 4px 8px -2px rgba(3, 218, 198, 0.3)'
                    },
                    p: 1.2
                  }}
                  onClick={handleLinkClick}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              )}
              {project.liveLink && (
                <IconButton
                  component="a"
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  color="inherit"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      boxShadow: '0 4px 8px -2px rgba(3, 218, 198, 0.3)'
                    },
                    p: 1.2
                  }}
                  onClick={handleLinkClick}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Card>
        </Box>
      </Box>
      
      {/* Description Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: '#112240',
            backgroundImage: 'linear-gradient(rgba(17, 34, 64, 0.95), rgba(10, 25, 47, 0.95))',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(3, 218, 198, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1, 
          pt: 3,
          fontWeight: 700,
          color: 'text.primary'
        }}>
          {project.title}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <Typography 
            variant="body1" 
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.3px',
              py: 2
            }}
          >
            {project.description}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            color="primary"
            variant="text"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Modal */}
      {project.video && (
        <Modal
          open={isVideoModalOpen}
          onClose={handleCloseVideoModal}
          aria-labelledby={`${project.title}-video-modal`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Paper
            sx={{
              maxWidth: '90vw',
              width: '100%',
              maxHeight: '90vh',
              backgroundColor: alpha('#112240', 0.95),
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(3, 218, 198, 0.2)',
              borderRadius: 3,
              p: 2,
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              overflow: 'hidden',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleCloseVideoModal}
              sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                color: 'text.secondary',
                zIndex: 10,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 aspect ratio
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <iframe
                src={project.video}
                title={`${project.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </Box>
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default FeaturedProject;