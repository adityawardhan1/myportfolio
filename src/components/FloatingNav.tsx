import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingNav: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sectionElements.forEach((section, index) => {
                if (section) {
                    const top = section.offsetTop;
                    const bottom = top + section.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < bottom) {
                        setActiveSection(index);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[999] hidden lg:block">
            <div className="flex flex-col space-y-4">
                {sections.map((section, index) => (
                    <div key={section.id} className="relative group">
                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute right-full mr-4 px-3 py-2 glass-dark rounded-lg text-sm whitespace-nowrap pointer-events-none"
                        >
                            {section.label}
                        </motion.div>

                        {/* Dot */}
                        <motion.button
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-hover ${activeSection === index
                                    ? 'bg-primary-500 shadow-glow scale-125'
                                    : 'bg-gray-500 hover:bg-gray-300'
                                }`}
                            aria-label={`Navigate to ${section.label}`}
                        >
                            {activeSection === index && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="w-full h-full rounded-full bg-primary-500"
                                />
                            )}
                        </motion.button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloatingNav;
