'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, alpha, useTheme, Badge, keyframes, darken } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { motion, AnimatePresence } from 'framer-motion';

// Format visitor count to K notation (1K+, 1.5K+, etc.)
const formatVisitorCount = (count: number | null): string => {
  if (!count) return '1K+';
  
  if (count >= 1000) {
    // For values between X000 and X500, display as XK+
    // For values between X500 and (X+1)000, display as X.5K+
    const thousands = Math.floor(count / 1000);
    const remainder = count % 1000;
    
    if (remainder >= 500) {
      return `${thousands}.5K+`;
    } else {
      return `${thousands}K+`;
    }
  }
  
  return count.toString();
};

// Define pulse animation
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 175, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 175, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 175, 0);
  }
`;

// Define shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -300px 0;
  }
  100% {
    background-position: 300px 0;
  }
`;

// Define floating animation
const floating = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Define glow animation
const glow = keyframes`
  0% {
    filter: drop-shadow(0 0 2px rgba(76, 175, 175, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(76, 175, 175, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 2px rgba(76, 175, 175, 0.6));
  }
`;

interface VisitorCounterProps {
  variant?: 'default' | 'navbar' | 'minimal' | 'glass' | '3d';
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ variant = 'default' }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  // Initialize animation and fetch visitor count on client-side only
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        setVisitorCount(data.count);
        setAnimate(true);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(1000); // Fallback value
      }
    };

    fetchVisitorCount();
  }, []);

  // Choose icon based on variant
  const getIcon = () => {
    if (variant === 'minimal') {
      return (
        <VisibilityIcon
          sx={{
            color: theme.palette.primary.main,
            fontSize: '1.1rem',
            filter: `drop-shadow(0 1px 2px ${alpha(theme.palette.primary.main, 0.3)})`,
          }}
        />
      );
    }
    
    return (
      <PeopleAltOutlinedIcon
        sx={{
          color: theme.palette.primary.main,
          fontSize: variant === 'navbar' ? '1.1rem' : '1.4rem',
          filter: `drop-shadow(0 1px 2px ${alpha(theme.palette.primary.main, 0.3)})`,
        }}
      />
    );
  };

  // Loading state
  if (!visitorCount) {
    // Minimal variant loading state
    if (variant === 'minimal') {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
          }}
        >
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <VisibilityIcon 
              sx={{ 
                color: alpha(theme.palette.primary.main, 0.7),
                fontSize: '1rem' 
              }} 
            />
          </motion.div>
        </Box>
      );
    }
    
    // Navbar variant loading state
    if (variant === 'navbar') {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '36px',
            width: '80px',
            borderRadius: '12px',
            overflow: 'hidden',
            background: `linear-gradient(90deg, 
              ${alpha(theme.palette.background.paper, 0.5)}, 
              ${alpha(theme.palette.background.paper, 0.8)}, 
              ${alpha(theme.palette.background.paper, 0.5)})`,
            backgroundSize: '600px 100%',
            animation: `${shimmer} 2s infinite linear`,
          }}
        >
          <motion.div
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <PeopleAltOutlinedIcon 
              sx={{ 
                color: alpha(theme.palette.primary.main, 0.7),
                fontSize: '1.2rem' 
              }} 
            />
          </motion.div>
        </Box>
      );
    }
    
    // Default loading state
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '130px',
          height: '48px',
          borderRadius: '24px',
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(8px)',
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, 
              transparent, 
              ${alpha(theme.palette.primary.main, 0.2)}, 
              transparent)`,
            backgroundSize: '600px 100%',
            animation: `${shimmer} 2s infinite linear`,
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0.5, scale: 0.95 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ zIndex: 1 }}
        >
          <PeopleAltOutlinedIcon 
            sx={{ 
              color: alpha(theme.palette.primary.main, 0.7),
              fontSize: '1.5rem',
            }} 
          />
        </motion.div>
      </Box>
    );
  }

  const formattedCount = formatVisitorCount(visitorCount);

  // Set up animation variants
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 } 
    },
    pulse: {
      scale: [1, 1.2, 1],
      filter: [
        'drop-shadow(0 0 2px rgba(76, 175, 175, 0.4))',
        'drop-shadow(0 0 8px rgba(76, 175, 175, 0.7))',
        'drop-shadow(0 0 2px rgba(76, 175, 175, 0.4))'
      ],
      transition: { 
        duration: 1.5, 
        repeat: 3, 
        repeatType: "reverse" as const
      }
    },
    tap: { scale: 0.9, transition: { duration: 0.1 } }
  };

  const countVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.2, duration: 0.3, type: "spring" }
    },
    pulse: {
      scale: [1, 1.1, 1],
      color: [
        theme.palette.text.primary,
        theme.palette.primary.main,
        theme.palette.text.primary
      ],
      transition: { duration: 1.2, repeat: 2 }
    }
  };

  const badgeVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      boxShadow: [
        `0 2px 4px ${alpha(theme.palette.primary.main, 0.3)}`,
        `0 0 12px ${alpha(theme.palette.primary.main, 0.8)}`,
        `0 2px 4px ${alpha(theme.palette.primary.main, 0.3)}`
      ],
      transition: { duration: 1, repeat: 2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <Tooltip 
        title={`${visitorCount?.toLocaleString() || 1000} visitors have viewed this portfolio`} 
        arrow 
        placement="bottom"
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.5)} 0%, 
              ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            boxShadow: `
              0 2px 6px ${alpha(theme.palette.common.black, 0.04)},
              0 0 0 1px ${alpha(theme.palette.primary.main, 0.05)} inset
            `,
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::after': {
              opacity: 1,
            },
            '&:hover': {
              transform: 'translateY(-5px) scale(1.05)',
              animation: `${floating} 2s ease infinite`,
            }
          }}
        >
          <motion.div 
            variants={iconVariants}
            animate={animate ? "pulse" : "animate"}
          >
            <Badge
              badgeContent={formattedCount}
              color="primary"
              max={9999}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0 4px',
                  height: '18px',
                  minWidth: '18px',
                  borderRadius: '9px',
                  boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.3)}`,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  transform: 'scale(1) translate(25%, -25%)',
                  animation: animate ? `${glow} 2s infinite` : 'none',
                  border: `1px solid ${alpha('#fff', 0.2)}`,
                },
              }}
            >
              {getIcon()}
            </Badge>
          </motion.div>
        </Box>
      </Tooltip>
    );
  }

  // Navbar variant
  if (variant === 'navbar') {
    return (
      <Tooltip 
        title={`${visitorCount?.toLocaleString() || 1000} visitors have viewed this portfolio`} 
        arrow 
        placement="bottom"
        enterDelay={300}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            padding: '7px 12px',
            borderRadius: '18px',
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.6)} 0%, 
              ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `
              0 3px 8px ${alpha(theme.palette.common.black, 0.05)},
              0 0 0 1px ${alpha(theme.palette.primary.main, 0.05)} inset,
              0 -1px 0 ${alpha('#fff', 0.6)} inset
            `,
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.15)}, transparent)`,
              opacity: 0,
              transition: 'opacity 0.4s ease',
            },
            '&:hover::before': {
              opacity: 1,
            }
          }}
        >
          <motion.div 
            variants={iconVariants}
            animate={animate ? "pulse" : "animate"}
          >
            <Badge
              badgeContent={formattedCount}
              color="primary"
              max={9999}
              component={motion.div}
              animate={animate ? badgeVariants.pulse : undefined}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0 4px',
                  height: '18px',
                  minWidth: '18px',
                  borderRadius: '9px',
                  boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.3)}`,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${darken(theme.palette.primary.main, 0.2)} 100%)`,
                  transition: 'all 0.3s ease',
                  textShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                  border: `1px solid ${alpha(theme.palette.primary.light, 0.6)}`,
                },
              }}
            >
              {getIcon()}
            </Badge>
          </motion.div>
          <motion.div 
            variants={countVariants}
            animate={animate ? "pulse" : undefined}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '0.8rem',
                color: theme.palette.text.primary,
                letterSpacing: '0.02em',
                paddingRight: '2px',
                textShadow: `0 1px 1px ${alpha(theme.palette.common.black, 0.05)}`,
              }}
            >
              Visitors
            </Typography>
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: -10 }}
                transition={{ duration: 0.3, type: "spring" }}
                style={{ 
                  position: 'absolute', 
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  background: `linear-gradient(to left, ${alpha(theme.palette.background.paper, 0.9)}, transparent)`,
                  paddingRight: '10px'
                }}
              >
                <EmojiPeopleIcon 
                  sx={{ 
                    fontSize: '1rem', 
                    color: alpha(theme.palette.primary.main, 0.8),
                    filter: `drop-shadow(0 1px 1px ${alpha(theme.palette.common.black, 0.2)})`,
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Tooltip>
    );
  }

  // Glass variant (new)
  if (variant === 'glass') {
    return (
      <Tooltip 
        title={`${visitorCount?.toLocaleString() || 1000} visitors have viewed this portfolio`} 
        arrow 
        placement="top"
        enterDelay={400}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            padding: '10px 18px',
            borderRadius: '28px',
            background: `linear-gradient(120deg, 
              ${alpha(theme.palette.background.paper, 0.5)} 0%, 
              ${alpha(theme.palette.background.paper, 0.3)} 100%)`,
            backdropFilter: 'blur(15px)',
            border: `1px solid ${alpha('#fff', 0.2)}`,
            boxShadow: `
              0 4px 15px ${alpha(theme.palette.common.black, 0.08)},
              0 1px 2px ${alpha(theme.palette.common.black, 0.05)},
              0 0 0 1px ${alpha(theme.palette.primary.main, 0.05)} inset,
              0 1px 0 ${alpha('#fff', 0.2)} inset
            `,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 30%, 
                ${alpha(theme.palette.primary.light, 0.25)} 0%, 
                transparent 70%)`,
              opacity: 0,
              transition: 'opacity 0.5s ease-in-out',
            },
            '&:hover::before': {
              opacity: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-100%',
              left: '-100%',
              right: '-100%',
              bottom: '-100%',
              background: `radial-gradient(circle at 50% 50%, transparent 60%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              opacity: 0,
              transform: 'scale(0.2)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            },
            '&:hover::after': {
              opacity: 1,
              transform: 'scale(1)',
            }
          }}
        >
          <motion.div 
            variants={iconVariants}
            animate={animate ? "pulse" : "animate"}
          >
            <Badge
              badgeContent={formattedCount}
              color="primary"
              max={9999}
              component={motion.div}
              animate={animate ? badgeVariants.pulse : undefined}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0 6px',
                  height: '20px',
                  minWidth: '20px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.light, 0.95)} 0%, 
                    ${theme.palette.primary.main} 50%,
                    ${darken(theme.palette.primary.main, 0.1)} 100%)`,
                  boxShadow: `
                    0 2px 6px ${alpha(theme.palette.primary.main, 0.4)},
                    0 0 0 1px ${alpha(theme.palette.primary.light, 0.6)},
                    0 1px 0 ${alpha('#fff', 0.3)} inset
                  `,
                  textShadow: '0 1px 1px rgba(0,0,0,0.15)',
                },
              }}
            >
              <PeopleAltOutlinedIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: '1.6rem',
                  filter: `drop-shadow(0 1px 2px ${alpha(theme.palette.primary.main, 0.4)})`,
                }}
              />
            </Badge>
          </motion.div>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.div 
              variants={countVariants}
              animate={animate ? "pulse" : undefined}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  color: alpha(theme.palette.text.primary, 0.9),
                  letterSpacing: '0.02em',
                  textShadow: `0 1px 1px ${alpha(theme.palette.common.black, 0.1)}`,
                  marginBottom: '-2px',
                }}
              >
                {formattedCount} Visitors
              </Typography>
            </motion.div>
            
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.7rem',
                color: alpha(theme.palette.text.secondary, 0.85),
                letterSpacing: '0.02em',
              }}
            >
              Thanks for stopping by!
            </Typography>
          </Box>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ 
                  position: 'absolute',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PersonAddAlt1Icon 
                  sx={{ 
                    fontSize: '1.2rem', 
                    color: alpha(theme.palette.primary.main, 0.8),
                    filter: `drop-shadow(0 1px 2px ${alpha(theme.palette.common.black, 0.2)})`,
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Tooltip>
    );
  }

  // 3D variant (new)
  if (variant === '3d') {
    return (
      <Tooltip 
        title={`${visitorCount?.toLocaleString() || 1000} visitors have viewed this portfolio`} 
        arrow 
        placement="top"
        enterDelay={400}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            padding: '12px 20px',
            borderRadius: '24px',
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.background.paper, 0.9)} 0%, 
              ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            boxShadow: `
              0 6px 16px ${alpha(theme.palette.common.black, 0.1)},
              0 2px 4px ${alpha(theme.palette.common.black, 0.05)},
              0 -1px 0 ${alpha('#fff', 0.6)} inset,
              0 2px 0 ${alpha(theme.palette.common.black, 0.06)}
            `,
            transform: 'perspective(1000px) rotateX(5deg)',
            transformStyle: 'preserve-3d',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'perspective(1000px) rotateX(0deg) scale(1.05) translateY(-5px)',
              boxShadow: `
                0 15px 25px ${alpha(theme.palette.common.black, 0.15)},
                0 2px 4px ${alpha(theme.palette.common.black, 0.05)},
                0 -1px 0 ${alpha('#fff', 0.6)} inset,
                0 2px 0 ${alpha(theme.palette.common.black, 0.06)}
              `,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(to right, 
                transparent 0%, 
                ${alpha('#fff', 0.5)} 50%, 
                transparent 100%)`,
            },
          }}
        >
          <motion.div 
            variants={iconVariants}
            animate={animate ? "pulse" : "animate"}
            style={{ 
              transform: 'translateZ(10px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <Badge
              badgeContent={formattedCount}
              color="primary"
              max={9999}
              component={motion.div}
              animate={animate ? badgeVariants.pulse : undefined}
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0 6px',
                  height: '20px',
                  minWidth: '20px',
                  borderRadius: '10px',
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${darken(theme.palette.primary.main, 0.2)} 100%)`,
                  boxShadow: `
                    0 2px 6px ${alpha(theme.palette.primary.main, 0.4)},
                    0 1px 0 ${alpha('#fff', 0.3)} inset
                  `,
                  textShadow: '0 1px 1px rgba(0,0,0,0.15)',
                  transform: 'translateZ(5px) translate(25%, -25%)',
                  border: `1px solid ${alpha(theme.palette.primary.light, 0.6)}`,
                },
              }}
            >
              <PeopleAltOutlinedIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: '1.8rem',
                  filter: `drop-shadow(0 2px 3px ${alpha(theme.palette.primary.main, 0.4)})`,
                  transform: 'translateZ(15px)',
                }}
              />
            </Badge>
          </motion.div>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              transform: 'translateZ(5px)',
            }}
          >
            <motion.div 
              variants={countVariants}
              animate={animate ? "pulse" : undefined}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: theme.palette.text.primary,
                  letterSpacing: '0.03em',
                  textShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.08)}`,
                }}
              >
                Visitors
              </Typography>
            </motion.div>
            
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.75rem',
                color: alpha(theme.palette.text.secondary, 0.9),
                letterSpacing: '0.01em',
              }}
            >
              Thank you for visiting
            </Typography>
          </Box>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 10, rotateX: 90 }}
                transition={{ duration: 0.3, type: "spring" }}
                style={{ 
                  position: 'absolute',
                  right: '18px',
                  top: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(15px)',
                }}
              >
                <PersonAddAlt1Icon 
                  sx={{ 
                    fontSize: '1.3rem', 
                    color: alpha(theme.palette.primary.main, 0.8),
                    filter: `drop-shadow(0 2px 3px ${alpha(theme.palette.common.black, 0.2)})`,
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Tooltip>
    );
  }

  // Default variant
  return (
    <Tooltip 
      title={`${visitorCount?.toLocaleString() || 1000} visitors have viewed this portfolio`} 
      arrow 
      placement="top"
      enterDelay={500}
      leaveDelay={200}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          padding: '12px 20px',
          borderRadius: '24px',
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.background.paper, 0.85)} 0%, 
            ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backdropFilter: 'blur(15px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
          boxShadow: `
            0 4px 12px ${alpha(theme.palette.common.black, 0.08)},
            0 1px 3px ${alpha(theme.palette.common.black, 0.05)},
            0 0 0 1px ${alpha(theme.palette.primary.main, 0.05)} inset,
            0 -1px 0 ${alpha('#fff', 0.4)} inset
          `,
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          animation: animate ? `${pulse} 2s` : 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          }
        }}
      >
        <motion.div 
          variants={iconVariants}
          animate={animate ? "pulse" : "animate"}
        >
          <Badge
            badgeContent={formattedCount}
            color="primary"
            max={9999}
            component={motion.div}
            animate={animate ? badgeVariants.pulse : undefined}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0 6px',
                height: '20px',
                minWidth: '20px',
                borderRadius: '10px',
                boxShadow: `
                  0 2px 6px ${alpha(theme.palette.primary.main, 0.4)},
                  0 1px 0 ${alpha('#fff', 0.3)} inset
                `,
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${darken(theme.palette.primary.main, 0.15)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.light, 0.6)}`,
                letterSpacing: '0.03em',
                textShadow: '0 1px 1px rgba(0,0,0,0.15)',
              },
            }}
          >
            {getIcon()}
          </Badge>
        </motion.div>
        <motion.div 
          variants={countVariants}
          animate={animate ? "pulse" : undefined}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: '0.95rem',
              color: theme.palette.text.primary,
              textShadow: `0 1px 2px ${alpha(theme.palette.common.black, 0.12)}`,
              letterSpacing: '0.03em',
            }}
          >
            Portfolio Visitors
          </Typography>
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              transition={{ duration: 0.3, type: "spring" }}
              style={{ 
                position: 'absolute',
                right: '18px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <PersonAddAlt1Icon 
                sx={{ 
                  fontSize: '1.2rem', 
                  color: alpha(theme.palette.primary.main, 0.8),
                  filter: `drop-shadow(0 1px 2px ${alpha(theme.palette.common.black, 0.2)})`,
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Tooltip>
  );
};

export default VisitorCounter; 