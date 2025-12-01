import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Achievements: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

    const achievements = [
        {
            icon: FiAward,
            title: "Runner-up at Hackin' Winter",
            description: 'Secured 2nd place out of 300+ participants in a competitive hackathon',
            year: '2024',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: FiUsers,
            title: 'JYC Coordinator',
            description: 'Leading and coordinating activities for Jaypee Youth Club (2024-25)',
            year: '2024-25',
            color: 'from-primary-500 to-accent-cyan',
        },
        {
            icon: FiTrendingUp,
            title: 'ML Model Excellence',
            description: 'Achieved 84.50% accuracy in medical image segmentation project',
            year: '2024',
            color: 'from-accent-purple to-accent-pink',
        },
    ];

    return (
        <section
            id="achievements"
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
                        Achievements & Leadership
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-purple to-accent-pink mx-auto rounded-full" />
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="glass-dark rounded-2xl p-8 relative overflow-hidden group cursor-hover"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                            {/* Icon */}
                            <div className="relative mb-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className={`inline-flex p-4 rounded-full bg-gradient-to-br ${achievement.color} shadow-glow`}
                                >
                                    <achievement.icon className="text-3xl text-white" />
                                </motion.div>
                            </div>

                            {/* Year Badge */}
                            <div className="absolute top-6 right-6">
                                <span className={`px-3 py-1 text-xs font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent border border-current rounded-full`}>
                                    {achievement.year}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3">
                                {achievement.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {achievement.description}
                            </p>

                            {/* Shine Effect */}
                            <div className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
