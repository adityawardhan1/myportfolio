import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FiCode, FiCpu, FiUsers } from 'react-icons/fi';
import StatsCard from './About/StatsCard';
import TechStack from './About/TechStack';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

    const stats = [
        {
            icon: FiUsers,
            value: 300,
            suffix: '+',
            label: 'Hackathon Participants Competed Against',
            color: 'from-primary-500 to-accent-cyan',
        },
        {
            icon: FiCode,
            value: 50,
            suffix: '+',
            label: 'Projects Completed',
            color: 'from-accent-purple to-accent-pink',
        },
        {
            icon: FiCpu,
            value: 84,
            suffix: '%',
            label: 'ML Model Accuracy Achieved',
            color: 'from-accent-cyan to-primary-500',
        },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section-container bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"
        >
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Bio Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="glass-dark rounded-3xl p-8 md:p-12 mb-16"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                            I'm a <span className="text-gradient font-semibold">B.Tech Computer Science student</span> at{' '}
                            <span className="text-primary-400 font-semibold">JIIT Noida</span> (2022-2026),
                            driven by a passion for creating innovative solutions that make a difference.
                        </p>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                            My expertise lies in{' '}
                            <span className="text-gradient font-semibold">backend development</span>,{' '}
                            <span className="text-gradient font-semibold">full-stack applications</span>, and{' '}
                            <span className="text-gradient font-semibold">machine learning</span>. I thrive on
                            solving complex problems and collaborating with teams to build scalable,
                            user-centric applications.
                        </p>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            As a <span className="text-primary-400 font-semibold">problem-solver</span> and{' '}
                            <span className="text-primary-400 font-semibold">team collaborator</span>, I'm always
                            eager to learn new technologies and push the boundaries of what's possible.
                        </p>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        >
                            <StatsCard {...stat} />
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <TechStack />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
