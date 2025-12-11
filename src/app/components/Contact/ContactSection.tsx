// src/app/components/Contact/ContactSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  TextField, 
  Grid, 
  Paper,
  Stack,
  IconButton,
  Alert,
  Snackbar,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Tooltip,
  InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../../lib/data';
import emailjs from '@emailjs/browser';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meetingHovered, setMeetingHovered] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{ x: number; y: number; scale: number; rotation: number }>>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Generate random floating elements
    const elements = Array.from({ length: 5 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360
    }));
    setFloatingElements(elements);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        // Send email using EmailJS
        await emailjs.send(
          "service_v9v7gvj", 
          "template_eug8g4o",
          {
            from_name: formData.name,
            to_name: "Ruslan",
            from_email: formData.email,
            // to_email: "seniordev285915@gmail.com",
            to_email: "new.heaven918@gmail.com",
            message: formData.message,
            subject: formData.subject,
          },
          "VZ1Q8_zbxHUv-OlmC"
        );
        
        // Handle success
        setOpenSnackbar(true);
        setFormSubmitted(true);
        
        // Reset form after showing success animation
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setFormSubmitted(false);
        }, 2000);
      } catch (error) {
        // Handle error
        console.error('Error sending message:', error);
        setOpenErrorSnackbar(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

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

  const contactMethods = [
    { 
      icon: <EmailIcon fontSize="large" />, 
      title: 'Email',
      value: personalInfo.email,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
      color: theme.palette.primary.main
    },
    { 
      icon: <CalendarMonthIcon fontSize="large" />,
      title: 'Schedule Meeting',
      value: 'Book a 30-minute call',
      href: 'https://calendly.com/seniordev285915/30min',
      color: '#00A2FF'
    },
    // { 
    //   icon: <LinkedInIcon fontSize="large" />, 
    //   title: 'LinkedIn',
    //   value: 'Connect on LinkedIn',
    //   href: personalInfo.socials.linkedin || '#',
    //   color: '#0077B5'
    // },
    // { 
    //   icon: <TelegramIcon fontSize="large" />, 
    //   title: 'Telegram',
    //   value: 'Message me on Telegram',
    //   href: personalInfo.socials.telegram || '#',
    //   color: '#0088cc'
    // },

  ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '40%',
          height: '60%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: -1,
        },
      }}
      id="contact"
    >
      <Container maxWidth="lg">
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
              04.
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
              What's Next?
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography
            variant="h2"
            component="h3"
            align="center"
            sx={{ 
              mt: 5, 
              mb: 2, 
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3rem' },
              background: 'linear-gradient(90deg, #E6F1FF 0%, #03DAC6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 4px 40px rgba(3, 218, 198, 0.15)',
            }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              mb: 8,
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: alpha(theme.palette.text.primary, 0.9),
            }}
          >
            I'm always open to new ideas and suggestions. Looking forward to
            hearing about your project and how we can collaborate to bring it to life.
            My inbox is always open whether you have a question or just want to say hi!
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ mb: { xs: 8, md: 15 } }}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  background: `linear-gradient(135deg, ${alpha('#00A2FF', 0.05)} 0%, ${alpha('#00A2FF', 0.15)} 100%)`,
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: alpha('#00A2FF', 0.2),
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at top right, ${alpha('#00A2FF', 0.2)}, transparent 70%)`,
                    zIndex: 0,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: `radial-gradient(circle at center, ${alpha('#00A2FF', 0.1)} 0%, transparent 70%)`,
                    opacity: meetingHovered ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    zIndex: 0,
                  }
                }}
              >
                {/* Floating background elements */}
                {floatingElements.map((element, index) => (
                  <motion.div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: `${element.x}%`,
                      top: `${element.y}%`,
                      zIndex: 0,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [element.rotation, element.rotation + 360],
                      scale: [element.scale, element.scale * 1.2, element.scale],
                    }}
                    transition={{
                      duration: 8 + index * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <CalendarMonthIcon
                      sx={{
                        fontSize: '2rem',
                        color: alpha('#00A2FF', 0.1),
                        filter: 'blur(1px)',
                      }}
                    />
                  </motion.div>
                ))}

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #00A2FF 0%, #0077B5 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: -8,
                              left: 0,
                              width: '60px',
                              height: '3px',
                              background: 'linear-gradient(90deg, #00A2FF, transparent)',
                              borderRadius: '2px',
                            }
                          }}
                        >
                          Let's Schedule a Meeting
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: '1.1rem',
                            color: alpha(theme.palette.text.primary, 0.9),
                            mb: 3,
                            position: 'relative',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: -20,
                              top: '50%',
                              width: '3px',
                              height: '40%',
                              background: '#00A2FF',
                              transform: 'translateY(-50%)',
                              borderRadius: '4px',
                              opacity: 0.6,
                            }
                          }}
                        >
                          Book a 30-minute call with me to discuss your project, ideas, or any questions you might have.
                          I'm looking forward to our conversation!
                        </Typography>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setMeetingHovered(true)}
                        onHoverEnd={() => setMeetingHovered(false)}
                      >
                        <Button
                          component="a"
                          href="https://calendly.com/seniordev285915/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          size="large"
                          startIcon={
                            <motion.div
                              animate={{
                                rotate: meetingHovered ? 360 : 0,
                                scale: meetingHovered ? 1.2 : 1,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <CalendarMonthIcon />
                            </motion.div>
                          }
                          sx={{
                            py: 2,
                            px: 4,
                            backgroundColor: '#00A2FF',
                            borderRadius: 3,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: `0 8px 16px ${alpha('#00A2FF', 0.3)}`,
                            background: `linear-gradient(135deg, #00A2FF 0%, #0091EA 100%)`,
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': {
                              background: `linear-gradient(135deg, #0091EA 0%, #00A2FF 100%)`,
                              boxShadow: `0 12px 20px ${alpha('#00A2FF', 0.4)}`,
                              '&::after': {
                                transform: 'translateX(100%)',
                              }
                            },
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.2)}, transparent)`,
                              transform: 'translateX(-100%)',
                              transition: 'transform 0.5s ease-in-out',
                            }
                          }}
                        >
                          <Box sx={{ position: 'relative', zIndex: 1 }}>
                            Schedule Now
                          </Box>
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, md: 4 }, 
                  height: '100%',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(8px)',
                  borderRadius: 3,
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.5)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px -15px rgba(2, 12, 27, 0.7)'
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: '4px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #03DAC6, transparent)',
                  }
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '1.7rem' },
                    letterSpacing: '-0.5px',
                  }}
                >
                  <SendIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                  Send me a message
                </Typography>
                
                <Divider 
                  sx={{ 
                    mb: 4, 
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    '&::before, &::after': {
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }} 
                />
                
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <AnimatePresence>
                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '300px',
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 260, 
                              damping: 20,
                              delay: 0.2 
                            }}
                          >
                            <SendIcon 
                              sx={{ 
                                fontSize: 40, 
                                color: theme.palette.primary.main,
                                transform: 'rotate(20deg)'
                              }} 
                            />
                          </motion.div>
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          Message Sent!
                        </Typography>
                        <Typography color="text.secondary">
                          Thanks for reaching out. I'll get back to you as soon as possible.
                        </Typography>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="name"
                              label="Your Name"
                              name="name"
                              variant="outlined"
                              value={formData.name}
                              onChange={handleChange}
                              error={formErrors.name}
                              helperText={formErrors.name ? "Name is required" : ""}
                              InputProps={{
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.primary.main, 0.5),
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                  },
                                  '&.Mui-filled': {
                                    backgroundColor: 'transparent',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: alpha(theme.palette.primary.main, 0.7),
                                    }
                                  }
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: { 
                                  ml: 3.5,
                                  '&.MuiInputLabel-shrink': {
                                    ml: 0,
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Your Email"
                              name="email"
                              autoComplete="email"
                              variant="outlined"
                              value={formData.email}
                              onChange={handleChange}
                              error={formErrors.email}
                              helperText={formErrors.email ? "Valid email is required" : ""}
                              InputProps={{
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.primary.main, 0.5),
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                  },
                                  '&.Mui-filled': {
                                    backgroundColor: 'transparent',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: alpha(theme.palette.primary.main, 0.7),
                                    }
                                  }
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: { 
                                  ml: 3.5,
                                  '&.MuiInputLabel-shrink': {
                                    ml: 0,
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="subject"
                              label="Subject"
                              name="subject"
                              variant="outlined"
                              value={formData.subject}
                              onChange={handleChange}
                              InputProps={{
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.primary.main, 0.5),
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                  },
                                  '&.Mui-filled': {
                                    backgroundColor: 'transparent',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: alpha(theme.palette.primary.main, 0.7),
                                    }
                                  }
                                },
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SubjectIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: { 
                                  ml: 3.5,
                                  '&.MuiInputLabel-shrink': {
                                    ml: 0,
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="message"
                              label="Your Message"
                              name="message"
                              multiline
                              rows={5}
                              variant="outlined"
                              value={formData.message}
                              onChange={handleChange}
                              error={formErrors.message}
                              helperText={formErrors.message ? "Message is required" : ""}
                              InputProps={{
                                sx: { 
                                  borderRadius: 2,
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha(theme.palette.primary.main, 0.5),
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                  },
                                  '&.Mui-filled': {
                                    backgroundColor: 'transparent',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: alpha(theme.palette.primary.main, 0.7),
                                    }
                                  }
                                },
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ mt: 1.5, alignSelf: 'flex-start' }}>
                                    <MessageIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: { 
                                  ml: 3.5,
                                  '&.MuiInputLabel-shrink': {
                                    ml: 0,
                                  }
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={loading ? null : <SendIcon />}
                                disabled={loading}
                                sx={{ 
                                  mt: 2,
                                  py: 1.5,
                                  px: 4,
                                  fontWeight: 600,
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontSize: '1rem',
                                  boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
                                  '&:hover': {
                                    boxShadow: `0 12px 20px -4px ${alpha(theme.palette.primary.main, 0.6)}`,
                                  }
                                }}
                              >
                                {loading ? (
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 20, height: 20, mr: 1 }}>
                                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', animation: 'spin 1s linear infinite' }}>
                                        <style>{`
                                          @keyframes spin {
                                            0% { transform: rotate(0deg); }
                                            100% { transform: rotate(360deg); }
                                          }
                                        `}</style>
                                        <circle 
                                          cx="50" cy="50" r="40" 
                                          fill="none" 
                                          stroke="white" 
                                          strokeWidth="8"
                                          strokeDasharray="180" 
                                          strokeDashoffset="60" 
                                        />
                                      </svg>
                                    </Box>
                                    Sending...
                                  </Box>
                                ) : 'Send Message'}
                              </Button>
                            </motion.div>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, md: 4 }, 
                  height: '100%',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(8px)',
                  borderRadius: 3,
                  boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.5)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #03DAC6, transparent)',
                  }
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '1.7rem' },
                    letterSpacing: '-0.5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <PhoneIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                  Contact Information
                </Typography>
                
                <Divider 
                  sx={{ 
                    mb: 4, 
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    '&::before, &::after': {
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }} 
                />
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    color: alpha(theme.palette.text.primary, 0.9),
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                  }}
                >
                  Feel free to reach out through any of these channels. I'm always eager to discuss new opportunities and ideas.
                </Typography>
                
                <Stack spacing={3}>
                  {contactMethods.map((contact, index) => (
                    <motion.div 
                      key={contact.title}
                      whileHover={{ x: 5 }}
                      onHoverStart={() => setHoveredContact(contact.title)}
                      onHoverEnd={() => setHoveredContact(null)}
                    >
                      <Box
                        component="a"
                        href={contact.href}
                        target={contact.title === 'Email' || contact.title === 'Phone' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          color: 'inherit',
                          p: 2,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          backgroundColor: 
                            hoveredContact === contact.title 
                              ? alpha(contact.color, 0.08)
                              : 'transparent',
                          border: '1px solid',
                          borderColor: 
                            hoveredContact === contact.title 
                              ? alpha(contact.color, 0.3)
                              : 'transparent',
                          '&:hover': {
                            backgroundColor: alpha(contact.color, 0.08),
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                            backgroundColor: alpha(contact.color, 0.1),
                            color: contact.color,
                            mr: 2,
                          }}
                        >
                          {contact.icon}
                        </Box>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 600, 
                              color: 
                                hoveredContact === contact.title 
                                  ? contact.color
                                  : theme.palette.text.primary
                            }}
                          >
                            {contact.title}
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: alpha(theme.palette.text.primary, 0.7),
                              fontFamily: contact.title === 'Email' ? 'monospace' : 'inherit',
                              fontWeight: contact.title === 'Email' ? 500 : 400,
                            }}
                          >
                            {contact.value}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
                
                {/* <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      startIcon={<DownloadIcon />}
                      href="/resume.pdf"
                      target="_blank"
                      download="resume.pdf"
                      sx={{ 
                        py: 1.5,
                        px: 3,
                        borderWidth: 2,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        }
                      }}
                    >
                      Download Resume
                    </Button>
                  </motion.div>
                </Box> */}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            fontWeight: 500
          }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseErrorSnackbar} 
          severity="error" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            fontWeight: 500
          }}
        >
          Failed to send message. Please try again later.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;