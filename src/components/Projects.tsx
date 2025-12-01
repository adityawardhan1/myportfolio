import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProjectCard from './Projects/ProjectCard';

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            title: 'Enhanced Colon Cancer Segmentation',
            description: 'Advanced medical ML application using deep learning for precise colon cancer detection and segmentation.',
            longDescription: 'Developed a sophisticated CNN-based model using TensorFlow for automated colon cancer detection. Achieved 84.50% accuracy through extensive data preprocessing, augmentation, and hyperparameter optimization.',
            tags: ['Python', 'CNN', 'TensorFlow', 'Deep Learning', 'Medical AI'],
            category: 'ML',
            image: '/project1.jpg',
            github: 'https://github.com/adityawardhan1/Enhanced-Segmentation-of-Colon-Cancer-',
            demo: null,
            metrics: {
                accuracy: '84.50%',
                dataset: '10,000+ images',
                performance: 'Real-time inference',
            },
        },
        {
            title: 'Real Estate MERN Platform',
            category: 'Full Stack',
            description: 'Full-stack real estate listing platform with intelligent chatbot assistant.',
            longDescription: 'Built a comprehensive real estate marketplace using MERN stack with an intelligent chatbot. Features property browsing, posting, management, JWT authentication, and real-time chat assistance for property queries.',
            tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Chatbot', 'REST API'],
            image: '/project2.jpg',
            github: 'https://github.com/adityawardhan1/Real-Estate-Platform',
            demo: null,
            metrics: {
                stack: 'MERN',
                features: 'AI Chatbot',
                code: '78.8% JavaScript',
            },
        },
        {
            title: 'Airtable Form Builder',
            category: 'Full Stack',
            description: 'Dynamic form generator that creates smart forms from Airtable schemas with conditional logic.',
            longDescription: 'MERN stack application that automates form creation from Airtable database schemas. Features include conditional field logic, real-time validation, PDF export functionality, and seamless Airtable integration for data management.',
            tags: ['React', 'Node.js', 'Airtable API', 'PDF Export', 'MongoDB', 'Express'],
            image: '/project3.jpg',
            github: 'https://github.com/adityawardhan1/airtable-form-builder',
            demo: 'https://airtable-form-builder.onrender.com',
            metrics: {
                integration: 'Airtable API',
                features: 'Conditional Logic',
                export: 'PDF Support',
            },
        },
        {
            title: 'WorkPal Chatbot',
            category: 'Full Stack',
            description: 'Intelligent workplace management assistant for HR and employee support.',
            longDescription: 'AI-powered chatbot designed for workplace management and employee assistance. Streamlines HR processes, handles common employee queries, and improves workplace communication efficiency.',
            tags: ['Python', 'JavaScript', 'NLP', 'Web App', 'AI Assistant'],
            image: '/project4.jpg',
            github: 'https://github.com/adityawardhan1/workpalchatbot',
            demo: null,
            metrics: {
                type: 'AI Assistant',
                domain: 'Workplace',
                purpose: 'HR Automation',
            },
        },
        {
            title: 'MediTracker',
            category: 'Web Dev',
            description: 'Healthcare tracking application for managing medications and wellness activities.',
            longDescription: 'Comprehensive tracking solution for medication schedules, health metrics, and wellness routines. Helps users maintain consistent health habits with reminders and progress tracking.',
            tags: ['Python', 'JavaScript', 'Healthcare', 'Tracking', 'Web App'],
            image: '/project5.jpg',
            github: 'https://github.com/adityawardhan1/meditracker',
            demo: null,
            metrics: {
                domain: 'Healthcare',
                tracking: 'Multi-featured',
                reminders: 'Automated',
            },
        },
        {
            title: 'Test Automation Framework',
            category: 'Automation',
            description: 'Enterprise-grade test automation framework using POM and TestNG patterns.',
            longDescription: 'Built a scalable Selenium-based automation framework following Page Object Model design pattern with TestNG integration. Features include parallel test execution, comprehensive reporting, and CI/CD integration capabilities.',
            tags: ['Java', 'Selenium', 'TestNG', 'POM', 'Maven', 'CI/CD'],
            image: '/project6.jpg',
            github: 'https://github.com/adityawardhan1/automation-framework-pom-testng',
            demo: null,
            metrics: {
                pattern: 'Page Object Model',
                framework: 'TestNG',
                execution: 'Parallel Support',
            },
        },
    ];

    const categories = ['All', 'ML', 'Full Stack', 'Web Dev', 'Automation'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section-container bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"
        >
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-primary-500 mx-auto rounded-full" />
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center gap-4 mb-12 flex-wrap"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all cursor-hover ${filter === category
                                ? 'bg-gradient-to-r from-primary-500 to-accent-cyan text-white shadow-glow'
                                : 'glass-dark text-gray-300 hover:text-white'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
