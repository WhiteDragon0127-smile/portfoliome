'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, keyframes, useTheme, Button } from '@mui/material';
import { useLoading } from '../../context/LoadingContext';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; 
import { personalInfo } from '../../../lib/data';

// Define animations
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) translateX(10px) rotate(5deg);
  }
  50% {
    transform: translateY(-25px) translateX(5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) translateX(-5px) rotate(-5deg);
  }
  100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const wave = keyframes`
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-15px);
  }
  40% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Enhanced Particle component with more variety
const Particle = ({ index }: { index: number }) => {
  const theme = useTheme();
  // Use deterministic values based on index instead of random
  const size = 8 + (index % 8);
  const initialX = ((index * 17) % 100);
  const initialY = ((index * 23) % 100);
  const delay = (index % 3);
  const duration = 10 + (index % 8);
  const opacity = 0.3 + ((index % 5) * 0.1);
  
  // More color variety
  const colors = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.light,
    theme.palette.primary.dark,
    theme.palette.secondary.dark,
  ];
  
  const color = colors[index % colors.length];
  
  // Create deterministic animation paths based on index
  const float = keyframes`
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(${((index * 13) % 120) - 60}px, ${((index * 17) % 80) - 40}px) rotate(${(index * 45) % 360}deg);
    }
    50% {
      transform: translate(${((index * 19) % 120) - 60}px, ${((index * 23) % 80) - 40}px) rotate(${(index * 90) % 360}deg);
    }
    75% {
      transform: translate(${((index * 29) % 80) - 40}px, ${((index * 31) % 80) - 40}px) rotate(${(index * 135) % 360}deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  `;

  // Different shapes based on index
  const getShape = () => {
    const shapeIndex = index % 5;
    switch(shapeIndex) {
      case 0:
        return { borderRadius: '50%' };
      case 1:
        return { borderRadius: '2px', transform: 'rotate(45deg)' };
      case 2:
        return { 
          borderRadius: '50% 50% 0 50%', 
          transform: `rotate(${(index * 45) % 360}deg)` 
        };
      case 3:
        return { 
          borderRadius: '50% 20% 50% 20%', 
          transform: `rotate(${(index * 90) % 360}deg)` 
        };
      case 4:
        return { 
          borderRadius: '50%', 
          border: `2px solid ${color}`,
          backgroundColor: 'transparent'
        };
      default:
        return { borderRadius: '50%' };
    }
  };

  const shapeStyles = getShape();

  return (
    <Box
      sx={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: shapeStyles.backgroundColor || color,
        top: `${initialY}%`,
        left: `${initialX}%`,
        opacity,
        animation: `${float} ${duration}s infinite ease-in-out`,
        animationDelay: `${delay}s`,
        boxShadow: `0 0 ${size}px ${color}`,
        filter: 'blur(1px)',
        transition: 'all 0.3s ease',
        ...shapeStyles,
        '&:hover': {
          transform: 'scale(1.5)',
          opacity: opacity + 0.2,
          filter: 'blur(0px)',
        },
      }}
    />
  );
};

// Shimmer effect for text
const ShimmerText = ({ text }: { text: string }) => {
  const theme = useTheme();
  return (
    <Typography 
      variant="h5" 
      sx={{ 
        fontWeight: 'bold',
        position: 'relative',
        background: `linear-gradient(90deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.main} 20%, 
          ${theme.palette.secondary.main} 40%, 
          ${theme.palette.secondary.light} 60%, 
          ${theme.palette.primary.main} 80%, 
          ${theme.palette.primary.dark} 100%)`,
        backgroundSize: '200% auto',
        animation: `${shimmer} 2s linear infinite`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.3em',
        my: 2,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          animation: `${shimmer} 1.5s infinite`,
        }
      }}
    >
      {text.split('').map((letter, index) => (
        <Letter key={index} letter={letter} index={index} />
      ))}
    </Typography>
  );
};

// Enhanced Letter component
const Letter = ({ letter, index }: { letter: string; index: number }) => {
  return (
    <span
      style={{
        display: 'inline-block',
        animation: `${wave} 1.5s ease-in-out infinite`,
        animationDelay: `${index * 0.08}s`, // slightly longer delay for smoother effect
        textShadow: '0 0 5px rgba(255,255,255,0.5)', // subtle text glow
      }}
    >
      {letter}
    </span>
  );
};

// 3D rotating logo
const RotatingLogo = () => {
  const theme = useTheme();
  
  // Define 3D rotation animations
  const rotateY = keyframes`
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  `;
  
  const rotateX = keyframes`
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(360deg); }
  `;
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: 140,
        height: 140,
        perspective: '800px',
        transformStyle: 'preserve-3d',
        mb: 4,
        mt: 1,
        animation: `${pulse} 4s infinite ease-in-out`,
      }}
    >
      {/* 3D cube faces */}
      {[...Array(6)].map((_, index) => {
        // Calculate position for each face of the cube
        const getTransform = () => {
          const size = 70; // half the size of the cube
          switch(index) {
            case 0: return `rotateY(0deg) translateZ(${size}px)`; // front
            case 1: return `rotateY(90deg) translateZ(${size}px)`; // right
            case 2: return `rotateY(180deg) translateZ(${size}px)`; // back
            case 3: return `rotateY(270deg) translateZ(${size}px)`; // left
            case 4: return `rotateX(90deg) translateZ(${size}px)`; // top
            case 5: return `rotateX(-90deg) translateZ(${size}px)`; // bottom
            default: return '';
          }
        };
        
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              border: `2px solid rgba(255,255,255,0.2)`,
              borderRadius: '10px',
              opacity: 0.7,
              transform: getTransform(),
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: `${index % 2 === 0 ? rotateY : rotateX} 20s infinite linear`,
              boxShadow: `0 0 20px ${theme.palette.primary.main}`,
            }}
          >
            {/* Each face can have its own content */}
            <Box
              sx={{
                width: '60%',
                height: '60%',
                backgroundImage: `radial-gradient(circle, ${theme.palette.secondary.light}, ${theme.palette.primary.dark})`,
                borderRadius: '50%',
                animation: `${pulse} 3s infinite ease-in-out`,
                boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
              }}
            />
          </Box>
        );
      })}
      
      {/* Rotating rings */}
      {[...Array(3)].map((_, index) => {
        const size = 100 + index * 20;
        const rotation = index % 2 === 0 ? rotate : keyframes`
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        `;
        
        return (
          <Box
            key={`ring-${index}`}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${size}%`,
              height: `${size}%`,
              border: `2px solid ${index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main}`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6 - index * 0.15,
              animation: `${rotation} ${8 + index * 2}s infinite linear`,
            }}
          />
        );
      })}
    </Box>
  );
};

const LoadingOverlay = () => {
  const { isLoading } = useLoading();
  const theme = useTheme();
  const [particles, setParticles] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  
  // Handle copy email to clipboard
  const handleCopyEmail = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate particles on client-side only
  useEffect(() => {
    // Initial particles state should be empty to match server
    setParticles(Array.from({ length: 50 }, (_, i) => i));
  }, []);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at center, 
          ${theme.palette.background.paper} 0%, 
          ${theme.palette.background.default} 70%, 
          ${theme.palette.primary.dark}30 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 1s ease-in-out',
        opacity: isLoading ? 1 : 0,
        visibility: isLoading ? 'visible' : 'hidden',
        animation: isLoading ? 'none' : `${fadeOut} 1s ease-in-out forwards`,
        overflow: 'hidden',
      }}
    >
      {/* Background gradient overlay */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: -1,
        }}
      />
      
      {/* Enhanced particles background with more particles */}
      {particles.map((i) => (
        <Particle key={i} index={i} />
      ))}
      
      {/* Animated 3D logo */}
      <RotatingLogo />
      
      {/* Enhanced text with shimmer effect */}
      <ShimmerText text="Loading" />
      
      {/* Dot animation */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: theme.palette.secondary.main,
              animation: `${pulse} 1s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
            }}
          />
        ))}
      </Box>

      {/* Enhanced progress bar */}
      <Box
        sx={{
          width: '250px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            filter: 'blur(5px)',
          }
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '30%',
            backgroundImage: `linear-gradient(90deg, 
              transparent, 
              ${theme.palette.primary.light}, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main}, 
              ${theme.palette.secondary.light},
              transparent)`,
            borderRadius: '4px',
            animation: keyframes`
              0% {
                transform: translateX(-300%);
              }
              100% {
                transform: translateX(600%);
              }
            ` + ' 2s infinite ease-in-out',
            boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.secondary.main}`,
          }}
        />
      </Box>
      
      {/* Subtle message */}
      <Typography
        variant="caption"
        sx={{
          mt: 3,
          opacity: 0.7,
          letterSpacing: 1,
          color: theme.palette.text.secondary,
          fontStyle: 'italic',
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        Preparing something amazing for you...
      </Typography>

      {/* Gmail display */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 5,
          mb: 2,
          p: 2,
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'rgba(255,255,255,0.1)',
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <EmailIcon 
          sx={{ 
            color: theme.palette.primary.main,
            mr: 1.5,
            fontSize: '1.5rem',
            animation: `${pulse} 2s infinite ease-in-out`,
            filter: `drop-shadow(0 0 3px ${theme.palette.primary.main})`,
          }} 
        />
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 500,
            color: theme.palette.text.primary,
            mr: 1.5,
            textShadow: '0 0 5px rgba(255,255,255,0.2)',
          }}
        >
          {personalInfo.email}
        </Typography>
        <Button
          size="small"
          startIcon={<ContentCopyIcon fontSize="small" />}
          variant="text"
          onClick={handleCopyEmail}
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.75rem',
            padding: '2px 6px',
            minWidth: 'auto',
            borderRadius: '4px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoadingOverlay; 