// src/lib/data.ts
import { PersonalInfo, Skill, Experience, Project } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Kevin',
  title: 'AI & Full Stack Developer',
  email: 'new.heaven918@gmail.com',
  bio: `Dynamic and experienced AI & Full Stack Developer with a proven track record in designing and implementing innovative AI-driven solutions and scalable web applications. Skilled in developing advanced platforms, including AI-powered recruitment tools, personalized healthcare assistants, virtual customer agents, and therapeutic apps for pets. Expertise spans a wide range of technologies such as JavaScript, Python, React, Node.js, Django, AI Chatbots, OpenAI APIs, LangChain, and more. Adept at leveraging machine learning, prompt engineering, and data analytics to optimize system performance, enhance user experience, and deliver impactful solutions across diverse industries.`,
};

export const skills: Skill[] = [
  // AI & Languages
  { name: 'LangChain', category: 'ai' },
  { name: 'LangGraph', category: 'ai' },
  { name: 'RAG', category: 'ai' },
  { name: 'LLM', category: 'ai' },
  { name: 'OpenAI', category: 'ai' },
  { name: 'ChatGPT', category: 'ai' },
  { name: 'ChatBot', category: 'ai' },
  { name: 'CrewAI', category: 'ai' },
  { name: 'VAPI', category: 'ai' },
  { name: 'Retell', category: 'ai' },
  { name: 'Bland.ai', category: 'ai' },

  // Languages
  { name: 'Python', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Node.js', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  

  // Frameworks & Databases
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Vue.js', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Flutter', category: 'frontend' },
  { name: 'Bubble.io', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'Supabase', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Nest.js', category: 'backend' },
  { name: 'MySQL', category: 'db' },
  { name: 'PostgreSQL', category: 'db' },
  { name: 'MongoDB', category: 'db' },
  { name: 'Redis', category: 'db' },
  { name: 'SQLite', category: 'db' },

  // Cloud & Tools
  { name: 'AWS', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'Git/GitHub', category: 'devops' },
  { name: 'GitLab', category: 'devops' },
  { name: 'N8N', category: 'others' },
  { name: 'Make.com', category: 'others' },
  { name: 'Zapier', category: 'others' },
];

export const experienceData: Experience[] = [
  {
    company: 'NEXUSAI SOLUTIONS',
    title: 'SENIOR FULL-STACK & AI DEVELOPER',
    date: '02/2021 - Present',
    responsibilities: [
      `Spearheaded the development of an Al-powered customersupport chatbot using Next.js, LangChain and OpenAI GPT-, reducing response times by 0% for a fintech client.`,
      'Architected a Supabase-backed real-time analytics dashboard for a healthcare startup, processing 10K+ data points/sec with 50% lower latency than Firebase.',
      'Deployed scalable Python/Flask microservices on Azure (MCP-certified) to automate document processing, cutting manual labor costs by $15K annually.',
    ],
    technologies: []
  },
  {
    company: 'VERTEX TECHNOLOGIES',
    title: 'FULL STACK DEVELOPER',
    date: '10/2017 - 01/2021',
    responsibilities: [
      'Built a with dynamic Al recommendationsfor 50+ SME clients.',
      'Created and updated Moodle course materials including modules, quizzes, and assignments, based on instructional design principles and accessibility standards.',
      `Conducted Moodle training sessionsfor faculty and staff, and provided technicalsupport forsystem users.`,
      'Maintained and updated course content and gradebooksfor more than 1,000 students and 50 faculty members.',
      'Worked closely with IT staff to ensure system security, data privacy, and backup and disaster recovery procedures.'
    ],
    technologies: []
  },
  {
    company: 'CODECRAFT STUDIOS',
    title: 'FRONTEND ENGINEER',
    date: '07/2014 - 09/2017',
    responsibilities: [
      'Modernized legacy jQuery systemsinto React SPAs for 3+ logistics clients, reducing page load timesfrom 5sto 1.2s.',
      'Developed a Python-based CMS scraper to autogenerate SEO reports,saving 15+ hours/week for marketing teams.',
      'Collaborated on an AR prototype using Three.jsfor a real estate client, boosting property engagement by 30%.'
    ],
    technologies: []
  }
];

export const featuredProjects: Project[] = [
  {
    title: 'Arogyam Kiosk',
    description: 'Arogyam Kiosk is a futuristic, modern sci-fi themed web application designed to help rural communities book telemedicine appointments with doctors. The platform provides essential healthcare features, including video consultations, medicine searches, and doctor messaging, all within a simple and functional UI.',
    technologies: ['TypeScript', 'Agora SDK', 'Hugging Face API', 'ChatBot'],
    liveLink: 'https://arogyam-kiosk.vercel.app/', // No live link provided
    githubLink: 'https://github.com/super285915/medical-assistant' , // No GitHub link provided
    image: '/images/arogyam.png',
    images: ['/images/arogyam.png', '/images/arogyam-1.png', '/images/arogyam-2.png','/images/arogyam-3.png','/images/arogyam-4.png']
  },
  {
    title: '​VectorVein',
    description: '​VectorVein is a no-code AI workflow platform that enables users to create and automate intelligent workflows without programming skills. By simply dragging and dropping workflow nodes, users can design processes tailored to their needs, enhancing productivity and efficiency.',
    technologies: ['OpenAI', 'Deepgram', 'OpenAI Embeddings', 'LangChain'],
    liveLink: 'https://vectorvein.ai/', // No live link provided
    githubLink: 'https://github.com/super285915/vectorvein_ai_agent', // No GitHub link provided
    image: '/images/vectorvein.png',
    images: ['/images/vectorvein.png', '/images/vectorvein-1.png', '/images/vectorvein-2.png','/images/vectorvein-3.png','/images/vectorvein-4.png','/images/vectorvein-5.png']
  },
  {
    title: 'Lecca.io',
    description: 'Lecca.io is an AI platform that allows you to configure and deploy Large Language Models (LLMs) equipped with powerful tools and workflows. Build, customize, and automate your AI agents with ease.',
    technologies: ['ChatGPT', 'RAG', 'AI Agent Development', 'n8n','Make.com'],
    liveLink: 'https://app.lecca.io/agents', // No live link provided
    githubLink: 'https://github.com/super285915/lecca-io_ai_agent', // No GitHub link provided
    image: '/images/lecca.png',
    images: ['/images/lecca.png', '/images/lecca-1.png', '/images/lecca-2.png','/images/lecca-3.png','/images/lecca-4.png','/images/lecca-5.png']
  },
  
];

export const otherProjects: Project[] = [
  {
    title: 'LuxeEstate',
    description: `After a thorough evaluation of your real estate website, I have identified several opportunities to enhance both functionality and user experience. Key improvements include implementing responsive design for mobile compatibility, enabling interactive property search and filters, and integrating a backend solution to handle contact form submissions effectively. Additionally, optimizing the site for SEO and replacing placeholder content with real, engaging information will improve visibility and credibility. These enhancements will ensure a more seamless, professional, and user-friendly platform that better serves your clients’ needs.`,
    technologies: ['React.js', 'Node.js', 'Next.js', 'Bolt.new'],
    liveLink: 'https://realestate285915.netlify.app/', 
    githubLink: 'https://github.com/super285915/real_estate',
    image: '/images/LuxeEstate1.png',
    images: ['/images/LuxeEstate1.png', '/images/LuxeEstate2.png', '/images/LuxeEstate3.png','/images/LuxeEstate4.png','/images/LuxeEstate5.png','/images/LuxeEstate6.png','/images/LuxeEstate7.png','/images/LuxeEstate8.png','/images/LuxeEstate9.png']
  },
  {
    title: 'Dashflow',
    description: `I had the opportunity to develop Dashflow, a state-of-the-art SaaS analytics platform designed to provide real-time, actionable insights with exceptional speed and accuracy. The platform features customizable dashboards, AI-driven predictive analytics, and seamless integration with over 200 data sources, ensuring comprehensive business visibility. Throughout development, I prioritized scalability, security, and user experience to support diverse client needs across various pricing tiers. Dashflow’s adoption by leading companies underscores its effectiveness and reliability in driving data-informed decision-making.`,
    technologies: ['React.js', 'Node.js', 'Next.js', 'Bolt.new'],
    liveLink: 'https://saas-platform-285915.netlify.app/', 
    githubLink: 'https://github.com/super285915/dashflow-saas-platform-',
    image: '/images/DashFlow1.png',
    images: ['/images/DashFlow1.png', '/images/DashFlow2.png', '/images/DashFlow3.png','/images/DashFlow4.png','/images/DashFlow5.png','/images/DashFlow6.png','/images/DashFlow7.png','/images/DashFlow8.png','/images/DashFlow9.png']
  },
  {
    title: 'WanderWise',
    description: `I developed WanderWise, an innovative AI-powered travel planning application designed to simplify and personalize the entire trip organization process. The platform offers features such as AI-generated itineraries, interactive maps, real-time weather updates, packing lists, and travel blogging tools, all integrated within a user-friendly interface. Emphasizing user privacy, WanderWise does not collect personal data and ensures that all information is used solely to enhance the user experience. With flexible pricing options catering to both individual travelers and travel agencies, WanderWise delivers a comprehensive solution for modern travel planning.`,
    technologies: ['React.js', 'Node.js', 'Next.js', 'Bolt.new'],
    liveLink: 'https://wanderwise-285915.netlify.app/', 
    githubLink: 'https://github.com/super285915/wanderwise',
    image: '/images/WanderWise1.png',
    images: ['/images/WanderWise1.png', '/images/WanderWise2.png', '/images/WanderWise3.png','/images/WanderWise4.png','/images/WanderWise5.png','/images/WanderWise6.png','/images/WanderWise7.png','/images/WanderWise8.png','/images/WanderWise9.png','/images/WanderWise10.png','/images/WanderWise11.png']
  },
  {
    title: 'WildLife',
    description: `I had the privilege of developing Wildlife Zoo, a comprehensive and user-friendly platform designed to connect users with the wonders of wildlife and nature. This project involved crafting detailed virtual animal exhibits, integrating educational resources, and implementing interactive features to enhance user engagement. Additionally, I ensured the platform’s responsiveness across all device types to provide an optimal experience for every visitor. Through this project, I honed my skills in creating impactful digital experiences that promote environmental awareness and learning.`,
    technologies: ['React.js', 'Node.js', 'Next.js', 'Bolt.new'],
    liveLink: 'https://wildlife-285915.netlify.app/', 
    githubLink: 'https://github.com/super285915/WildLife',
    image: '/images/WildLife1.png',
    images: ['/images/WildLife1.png', '/images/WildLife2.png', '/images/WildLife3.png','/images/WildLife4.png','/images/WildLife5.png','/images/WildLife6.png','/images/WildLife7.png','/images/WildLife8.png','/images/WildLife9.png','/images/WildLife10.png','/images/WildLife11.png', '/images/WildLife12.png']
  },
  {
    title: 'EduHub LMS',
    description: `I successfully developed EduHub LMS, a cutting-edge Learning Management System focused on optimizing the delivery and management of educational content. The platform boasts an intuitive and user-friendly interface tailored for both instructors and learners, robust course management capabilities, integrated assessment tools, and comprehensive progress tracking with analytics. Additionally, I ensured the system is fully responsive, providing seamless accessibility across desktops, tablets, and smartphones to support diverse learning environments.`,
    technologies: ['React.js', 'Node.js', 'Next.js', 'Bolt.new'],
    liveLink: 'https://edu-lms-285915.netlify.app/', 
    githubLink: 'https://github.com/super285915/EduLMS',
    image: '/images/Edu_LMS1.png',
    images: ['/images/Edu_LMS1.png', '/images/Edu_LMS2.png', '/images/Edu_LMS3.png','/images/Edu_LMS4.png','/images/Edu_LMS5.png','/images/Edu_LMS6.png','/images/Edu_LMS7.png','/images/Edu_LMS8.png']
  },
  {
    title: 'Zoundz Pet Anxiety Therapeutic',
    description: `We developed the app with the following features as suggested by the client: 
    Music and Loading Controls
    Admin can create a new station with a description and label for a specific animal type. They can upload/delete/categorize songs. Admin can store details and manage music streaming devices; for Google Home, Alexa, Bluetooth devices, etc.

    User Control
    Admin can store and manage users as well as vet details; such as add, delete, block, and update vet doctor and pet owner registration, contact, and payment details. Also, the admin can change the email and contact info of users

    System and Data Analytics
    Admin can create analytics on account usage, location of users, skipped songs, coupons, etc. Also, he/she can create analytics on how many people add stations to their favorites, how often they listen, how long on average, etc.

    Ads Management
    Admin can manage commercial ads in the app for unsubscribed users. Also, he/she can upload/insert commercials and target them to a set station.`,
    technologies: ['React Native', 'Node.js', 'Pets', 'Music', 'SendGrid'],
    liveLink: 'https://apps.apple.com/ca/app/zoundz-pet-anxiety-therapeutic/id1554036162', 
    githubLink: '',
    image: '/images/pet-anxiety.png'
  },
  {
    title: 'Make It Quick',
    description: 'Make It Quick is an AI-powered video creation platform designed to transform text prompts into fully edited, high-quality videos within minutes. This tool simplifies the video production process, enabling users to generate professional content without extensive editing skills or equipment.',
    technologies: ['Celery', 'Redis', 'Golang', 'FFmpeg', 'AI Text-to-Image'],
    liveLink: 'https://makeitquick.ai/', 
    githubLink: '',
    image: '/images/make-it-quick-1.png',
    images: ['/images/make-it-quick-1.png', '/images/make-it-quick-2.png', '/images/make-it-quick-3.png']
  },
  {
    title: 'Telegram AI Agent using n8n',
    description: `I built a personal AI assistant on Telegram for a daily content research system, covering stock prices, current affairs, social media trends, and more.`,
    technologies: ['n8n', 'AI Agent Development', 'AI App Development', 'Make.com', 'ChatGPT'],
    liveLink: '', 
    githubLink: '',
    image: '/images/telegram-ai.png'
  },
  {
    title: 'n8n AI Personal Assistant',
    description: 'n8n AI Personal Assistant integrated with Twilio SMS, Notion, Email, and OpenAI for task creation, reminders, and sending emails.',
    technologies: ['n8n', 'Make.com', 'Zapier', 'ChatGPT', 'AI Agent Development'],
    liveLink: '', 
    githubLink: '',
    image: '/images/n8n-ai.png'
  },
  {
    title: 'Vapi AI Outbound Follow-Up Automation',
    description: 'Designed Vapi AI Outbound Caller Voice AI agent that can make follow-ups to leads if they did not answer the call after multiple attempts.',
    technologies: ['Make.com', 'n8n', 'Automation', 'CRM Automation', 'AI Agent Development'],
    liveLink: '', 
    githubLink: '',
    image: '/images/vapi-ai.jpg'
  },
  {
    title: 'Bland AI - Automated AI Sales Outbound Calling',
    description: 'An interactive dashboard for visualizing complex datasets with customizable charts, filters, and real-time updates.',
    technologies: ['Zapier', 'Automation', 'Make.com', 'AI Agent Development'],
    liveLink: '', 
    githubLink: '',
    image: '/images/bland-ai.png'
  },
];
