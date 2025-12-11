// src/types/index.ts

// Personal Info Types
export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    email?: string;
  }
  
  export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    bio: string;
  }
  
  // Skills Types
  export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'ai' | 'devops' | 'db' | 'blockchain' | 'language' | 'others';
  }
  
  // Experience Types
  export interface Experience {
    company: string;
    title: string;
    date: string;
    responsibilities: string[];
    technologies: string[];
  }
  
  // Project Types
  export interface Project {
    title: string;
    description: string;
    image?: string;
    images?: string[];
    video?: string;
    technologies: string[];
    features?: string[];
    category?: string;
    year?: string;
    liveLink?: string;
    githubLink?: string;
  }