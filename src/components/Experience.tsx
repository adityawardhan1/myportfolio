import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

    const experience = {
        company: 'Intersoft Data Labs',
        role: 'Software Intern',
        period: 'May 2025 - July 2025',
        achievements: [
            'Developed and optimized backend APIs using Node.js and Express',
            'Implemented authentication and authorization systems',
            'Collaborated with cross-functional teams to deliver scalable solutions',
            'Improved application performance through code optimization',
            'Worked with MongoDB for database management and queries',
        ],
    };

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section-container bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"
        >
            <div className="max-w-4xl mx-auto w-full">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                        Experience
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-accent-pink mx-auto rounded-full" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isVisible ? { scaleY: 1 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-cyan to-accent-purple origin-top"
                    />

                    {/* Experience Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="relative pl-20 md:pl-0 md:w-1/2 md:pr-12 mb-16"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-auto md:right-[-25px] top-6 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-glow z-10">
                            <FiBriefcase className="text-white text-xl" />
                        </div>

                        {/* Card */}
                        <div className="glass-dark rounded-2xl p-8 hover:shadow-glow-lg transition-all duration-300 group">
                            {/* Company & Role */}
                            <motion.h3
                                className="text-2xl font-bold text-gradient-animate mb-2"
                                whileHover={{ scale: 1.02 }}
                            >
                                {experience.role}
                            </motion.h3>

                            <h4 className="text-xl font-semibold text-primary-400 mb-3">
                                {experience.company}
                            </h4>

                            {/* Period */}
                            <div className="flex items-center gap-2 text-gray-400 mb-6">
                                <FiCalendar />
                                <span>{experience.period}</span>
                            </div>

                            {/* Achievements */}
                            <ul className="space-y-3">
                                {experience.achievements.map((achievement, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-start gap-3 text-gray-300"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                                        <span>{achievement}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Hover Effect */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
