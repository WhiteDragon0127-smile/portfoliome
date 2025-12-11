// src/app/components/Work/ProjectCard.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Chip,
  alpha,
  CardMedia,
  CardActionArea,
  Button,
  Modal,
  Paper,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Project } from '../../../types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();

  // Check if description is truncated
  useEffect(() => {
    const checkIfTruncated = () => {
      if (descriptionRef.current) {
        const { scrollHeight, clientHeight } = descriptionRef.current;
        setIsDescriptionTruncated(scrollHeight > clientHeight);
      }
    };
    
    checkIfTruncated();
    window.addEventListener('resize', checkIfTruncated);
    
    return () => {
      window.removeEventListener('resize', checkIfTruncated);
    };
  }, [project.description]);

  // Convert project title to URL-friendly slug
  const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');

  const handleCardClick = () => {
    router.push(`/project/${encodeURIComponent(projectSlug)}`);
  };

  // Stop propagation so these clicks don't trigger the card click
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle read more button click
  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsModalOpen(true);
  };

  // Handle video click
  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsVideoModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <Card
        component={motion.div}
        whileHover={{ y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.2, 1] }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
          backgroundColor: alpha('#112240', 0.7),
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${isHovered ? 'rgba(3, 218, 198, 0.3)' : 'rgba(3, 218, 198, 0.1)'}`,
          boxShadow: isHovered 
            ? '0 20px 40px -20px rgba(2, 12, 27, 0.8)' 
            : '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
          position: 'relative',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #03DAC6, rgba(3, 218, 198, 0.3))',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0.3)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.4, 0.2, 1)',
          },
        }}
        onClick={handleCardClick}
      >
        {(project.image || project.video) && (
          <Box
            sx={{
              position: 'relative',
              height: 180,
              width: '100%',
              overflow: 'hidden',
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
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
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
                      fontSize: 60, 
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
                  transition: 'transform 0.4s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            ) : null}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(17, 34, 64, 0.1), rgba(17, 34, 64, 0.9))',
                zIndex: 1,
              }}
            />
          </Box>
        )}
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 3.5,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 3.5, 
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {!project.image && !project.video && (
              <motion.div
                animate={{ 
                  rotate: isHovered ? [0, -10, 0] : 0,
                  y: isHovered ? [0, -5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <FolderOpenIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 48,
                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(3, 218, 198, 0.5))' : 'none',
                    transition: 'all 0.3s ease',
                  }} 
                />
              </motion.div>
            )}
          </Box>
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              transition: 'color 0.3s ease',
              fontSize: '1.35rem',
              letterSpacing: '-0.5px',
              mb: 2,
              color: isHovered ? 'primary.main' : 'text.primary',
            }}
          >
            {project.title}
          </Typography>
          <Box
            sx={{
              backgroundColor: alpha('#0A192F', 0.4),
              p: 2.5,
              borderRadius: 2,
              mb: 3,
              border: '1px solid rgba(3, 218, 198, 0.05)',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHovered 
                ? 'inset 0 0 10px rgba(2, 12, 27, 0.2)' 
                : 'inset 0 0 10px rgba(2, 12, 27, 0.1)',
            }}
            onClick={(e) => isDescriptionTruncated ? e.stopPropagation() : undefined}
          >
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 0,
                lineHeight: 1.8,
                fontSize: '0.95rem',
                maxHeight: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
              }}
              ref={descriptionRef}
            >
              {project.description}
            </Typography>
            {isDescriptionTruncated && (
              <Button
                variant="text"
                size="small"
                onClick={handleReadMoreClick}
                sx={{
                  color: 'primary.main',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  padding: 0,
                  marginTop: 1,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Read more
              </Button>
            )}
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ ml: project.image ? 0 : 'auto' }}>
              {project.githubLink && (
                <IconButton
                  component={motion.a}
                  whileHover={{ y: -5, rotate: -10 }}
                  transition={{ duration: 0.2 }}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  color="inherit"
                  size="small"
                  sx={{ 
                    color: 'text.secondary', 
                    '&:hover': { 
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease'
                  }}
                  onClick={handleLinkClick}
                >
                  <GitHubIcon />
                </IconButton>
              )}
              {project.liveLink && (
                <IconButton
                  component={motion.a}
                  whileHover={{ y: -5, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  color="inherit"
                  size="small"
                  sx={{ 
                    color: 'text.secondary', 
                    '&:hover': { 
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease'
                  }}
                  onClick={handleLinkClick}
                >
                  <OpenInNewIcon />
                </IconButton>
              )}
            </Stack>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 'auto' }}>
            {project.technologies.map((tech, idx) => (
              <Chip
                key={idx}
                label={tech}
                size="small"
                variant="outlined"
                component={motion.div}
                // whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                sx={{
                  mb: 0.5,
                  borderColor: 'rgba(3, 218, 198, 0.3)',
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  py: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(3, 218, 198, 0.1)',
                    borderColor: 'primary.main',
                    color: 'text.primary',
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Modal for full description */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby={`${project.title}-description-modal`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          sx={{
            maxWidth: 600,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            backgroundColor: alpha('#112240', 0.95),
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(3, 218, 198, 0.2)',
            borderRadius: 3,
            p: 4,
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'primary.main',
              mb: 2,
              fontWeight: 600,
              pr: 4, // Space for close button
            }}
          >
            {project.title}
          </Typography>
          
          {/* Format description with structure instead of one paragraph */}
          <Box 
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {/* Split text by double newlines and process each block */}
            {project.description.split(/\n\n+/).map((paragraph, index) => {
              // If the paragraph has a newline, it might be a header followed by content
              if (paragraph.includes('\n')) {
                const lines = paragraph.split('\n');
                const header = lines[0];
                const content = lines.slice(1).join('\n');
                
                return (
                  <React.Fragment key={index}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        color: '#03DAC6',
                        mt: index > 0 ? 3 : 0,
                        mb: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {header}
                    </Typography>
                    <Typography 
                      variant="body1"
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {content}
                    </Typography>
                  </React.Fragment>
                );
              } 
              // Simple heuristic: shorter paragraphs without periods are likely headers
              else if (paragraph.length < 50 && !paragraph.includes('.')) {
                return (
                  <Typography 
                    key={index}
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      color: '#03DAC6',
                      mt: index > 0 ? 3 : 0,
                      mb: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    {paragraph}
                  </Typography>
                );
              } 
              // Regular paragraph
              else {
                return (
                  <Typography 
                    key={index}
                    variant="body1"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {paragraph}
                  </Typography>
                );
              }
            })}
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {project.technologies.map((tech, idx) => (
              <Chip
                key={idx}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(3, 218, 198, 0.3)',
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  mb: 0.5,
                }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
            {project.githubLink && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<GitHubIcon />}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'rgba(3, 218, 198, 0.3)',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(3, 218, 198, 0.05)',
                  },
                }}
              >
                GitHub
              </Button>
            )}
            {project.liveLink && (
              <Button
                variant="contained"
                size="small"
                startIcon={<OpenInNewIcon />}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: alpha('#03DAC6', 0.15),
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: alpha('#03DAC6', 0.25),
                  },
                }}
              >
                Live Demo
              </Button>
            )}
          </Stack>
        </Paper>
      </Modal>

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

export default ProjectCard;