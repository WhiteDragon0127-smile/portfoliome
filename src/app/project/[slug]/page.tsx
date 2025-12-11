'use client';

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Chip, Button, Grid, Paper, Divider, useTheme, alpha, Modal, IconButton, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { featuredProjects, otherProjects } from '@/lib/data';
import { Project } from '@/types';

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    // Find the project by slug (URL-friendly version of the title)
    const decodedSlug = decodeURIComponent(slug as string);
    const foundProject = [...featuredProjects, ...otherProjects].find(
      p => p.title.toLowerCase().replace(/\s+/g, '-') === decodedSlug
    );
    
    setProject(foundProject || null);
    setLoading(false);
  }, [slug]);

  const handleImageClick = (index = 0) => {
    setCurrentImageIndex(index);
    setIsImageFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsImageFullscreen(false);
  };

  const handleNextImage = () => {
    const projectImages = project?.images;
    if (projectImages && projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    }
  };

  const handlePrevImage = () => {
    const projectImages = project?.images;
    if (projectImages && projectImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    }
  };
  
  // Use either the images array or fallback to the single image if available
  const currentImage = project?.images?.[currentImageIndex] || project?.image;
  const hasMultipleImages = project?.images && project?.images.length > 1;

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 10, px: 2 }}>
          <Skeleton variant="text" width={150} height={40} sx={{ mb: 5 }} />
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Skeleton variant="text" width="80%" height={60} sx={{ mb: 3 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="95%" height={20} sx={{ mb: 4 }} />
              
              <Skeleton variant="rounded" width="100%" height={120} sx={{ mb: 4 }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="rounded" width={120} height={40} />
                <Skeleton variant="rounded" width={120} height={40} />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Skeleton 
                variant="rounded" 
                width="100%" 
                height={350}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            py: 15, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            minHeight: '60vh'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h4" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Project Not Found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              The project you're looking for doesn't exist or has been removed.
            </Typography>
            <Button
              component={Link}
              href="/#work"
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
              size="large"
              sx={{ 
                mt: 3,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Back to Projects
            </Button>
          </motion.div>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '30%',
            height: '30%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.6,
            filter: 'blur(50px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '20%',
            right: '-10%',
            width: '30%',
            height: '30%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            zIndex: -1,
            opacity: 0.6,
            filter: 'blur(60px)',
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            component={Link}
            href="/#work"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              mb: 5,
              color: 'text.secondary',
              fontWeight: 500,
              borderRadius: 2,
              py: 1,
              px: 2,
              '&:hover': {
                color: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            Back to Projects
          </Button>
        </motion.div>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h3"
                component="h1"
                className="gradient-text"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {project.title}
              </Typography>

              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                {project.description}
              </Typography>

              {/* Project Details Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: alpha('#112240', 0.5),
                  backdropFilter: 'blur(8px)',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h2" 
                  sx={{ 
                    mb: 2.5, 
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CodeIcon sx={{ fontSize: 22 }} /> Project Details
                </Typography>
                
                <Grid container spacing={2}>
                  {project?.year && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <CalendarTodayIcon sx={{ color: alpha(theme.palette.primary.main, 0.8), fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Year
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            {project.year}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  
                  {project?.category && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <StarIcon sx={{ color: alpha(theme.palette.primary.main, 0.8), fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Category
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            {project.category}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
                
                <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1.5, 
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        color: 'text.secondary',
                        borderRadius: '8px',
                        py: 0.8,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          borderColor: theme.palette.primary.main,
                          transform: 'translateY(-2px)',
                          color: theme.palette.primary.main,
                        }
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              {/* Project Features Section */}
              {project.features && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: alpha('#112240', 0.5),
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{ 
                      mb: 2.5, 
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <StarIcon sx={{ fontSize: 22 }} /> Key Features
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
                    {project.features.map((feature, index) => (
                      <Box 
                        component="li" 
                        key={index}
                        sx={{ 
                          color: 'text.secondary',
                          mb: 1.5,
                          position: 'relative',
                          '&::marker': {
                            color: theme.palette.primary.main,
                          }
                        }}
                      >
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              )}

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {project.githubLink && (
                  <Button
                    component="a"
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="primary"
                    startIcon={<GitHubIcon />}
                    sx={{
                      borderRadius: 2,
                      py: 1.2,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 500,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.5)}`,
                      }
                    }}
                  >
                    View Code
                  </Button>
                )}
                {project.liveLink && (
                  <Button
                    component="a"
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="primary"
                    startIcon={<OpenInNewIcon />}
                    sx={{
                      borderRadius: 2,
                      py: 1.2,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 500,
                      borderWidth: 2,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.3)}`,
                      }
                    }}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {(project.image || (project.images && project.images.length > 0)) && (
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 300, md: 380 },
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -15px rgba(2, 12, 27, 0.7)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02) translateY(-5px)',
                      boxShadow: `0 30px 50px -15px rgba(2, 12, 27, 0.7)`,
                      '& .zoom-icon': {
                        opacity: 1,
                      }
                    }
                  }}
                  onClick={() => handleImageClick(0)}
                >
                  <Box 
                    className="zoom-icon"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    <ZoomInIcon sx={{ color: theme.palette.primary.main, fontSize: 30 }}/>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 1,
                      '&:hover': {
                        opacity: 1,
                      }
                    }}
                  />
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={project.images?.[0] || project.image || ''}
                      alt={project.title || 'Project image'}
                      fill
                      style={{ 
                        objectFit: 'cover', 
                        objectPosition: 'center top',
                      }}
                      priority
                    />
                  </Box>
                </Box>
              )}

              {/* Thumbnail Gallery (if multiple images) */}
              {project.images && project.images.length > 1 && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.images.slice(0, 4).map((img, index) => (
                    <Box
                      key={index}
                      onClick={() => handleImageClick(index)}
                      sx={{
                        width: 80,
                        height: 60,
                        borderRadius: 1,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        // border: index === 0 ? `2px solid ${theme.palette.primary.main}` : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        opacity: index === 0 ? 1 : 0.7,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                          transform: 'translateY(-2px)',
                          border: `2px solid ${theme.palette.primary.main}`,
                        },
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                  {project.images.length > 4 && (
                    <Box
                      onClick={() => handleImageClick(4)}
                      sx={{
                        width: 80,
                        height: 60,
                        borderRadius: 1,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        opacity: 0.7,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                          transform: 'translateY(-2px)',
                          border: `2px solid ${theme.palette.primary.main}`,
                        },
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                        +{project.images.length - 4}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Fullscreen Image Modal with Gallery Navigation */}
      <Modal
        open={isImageFullscreen}
        onClose={handleCloseFullscreen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: theme => theme.zIndex.modal + 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 25, 47, 0.97)',
          }}
        >
          <IconButton
            onClick={handleCloseFullscreen}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              zIndex: 3,
              width: 50,
              height: 50,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.4),
                transform: 'scale(1.1)',
              }
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
          
          {hasMultipleImages && (
            <>
              <IconButton
                onClick={handlePrevImage}
                disabled={!hasMultipleImages}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: { xs: 10, md: 40 },
                  transform: 'translateY(-50%) rotate(180deg)',
                  color: 'white',
                  backgroundColor: alpha(theme.palette.background.paper, 0.2),
                  backdropFilter: 'blur(5px)',
                  zIndex: 3,
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  '&.Mui-disabled': {
                    display: 'none',
                  }
                }}
              >
                <ArrowForwardIcon fontSize="medium" />
              </IconButton>
              
              <IconButton
                onClick={handleNextImage}
                disabled={!hasMultipleImages}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: { xs: 10, md: 40 },
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: alpha(theme.palette.background.paper, 0.2),
                  backdropFilter: 'blur(5px)',
                  zIndex: 3,
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  '&.Mui-disabled': {
                    display: 'none',
                  }
                }}
              >
                <ArrowForwardIcon fontSize="medium" />
              </IconButton>
            </>
          )}
          
          {currentImage && (
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ 
                width: '100%',
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 5 },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    maxWidth: '1600px',
                    maxHeight: '90vh',
                  }}
                >
                  <Image
                    src={currentImage}
                    alt={project.title || 'Project image'}
                    fill
                    style={{ 
                      objectFit: 'contain',
                    }}
                    priority
                  />
                </Box>
              </Box>
            </motion.div>
          )}
          
          {/* Image counter for gallery */}
          {hasMultipleImages && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: alpha(theme.palette.background.paper, 0.2),
                backdropFilter: 'blur(5px)',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                zIndex: 3,
              }}
            >
              <Typography variant="body2">
                {currentImageIndex + 1} / {project.images?.length}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
} 