import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

    const skillCategories = [
        {
            title: 'Languages',
            skills: [
                { name: 'Java', level: 85 },
                { name: 'Python', level: 90 },
                { name: 'C++', level: 80 },
                { name: 'JavaScript', level: 88 },
                { name: 'SQL', level: 82 },
            ],
            color: 'from-primary-500 to-accent-cyan',
        },
        {
            title: 'Frameworks & Libraries',
            skills: [
                { name: 'React', level: 90 },
                { name: 'Node.js', level: 85 },
                { name: 'TestNG', level: 75 },
                { name: 'Selenium', level: 78 },
                { name: 'TensorFlow', level: 82 },
            ],
            color: 'from-accent-purple to-accent-pink',
        },
        {
            title: 'Tools & Technologies',
            skills: [
                { name: 'Git', level: 88 },
                { name: 'GitHub', level: 90 },
                { name: 'MySQL', level: 85 },
                { name: 'MongoDB', level: 87 },
                { name: 'Docker', level: 75 },
            ],
            color: 'from-accent-cyan to-primary-500',
        },
        {
            title: 'Soft Skills',
            skills: [
                { name: 'Problem Solving', level: 92 },
                { name: 'Team Collaboration', level: 90 },
                { name: 'Communication', level: 88 },
                { name: 'Leadership', level: 85 },
                { name: 'Time Management', level: 87 },
            ],
            color: 'from-accent-pink to-accent-purple',
        },
    ];

    return (
        <section
            id="skills"
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
                        Skills & Expertise
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.6 }}
                            className="glass-dark rounded-2xl p-8"
                        >
                            <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-6`}>
                                {category.title}
                            </h3>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-300 font-medium">{skill.name}</span>
                                            <span className="text-primary-400 font-semibold">{skill.level}%</span>
                                        </div>
                                        <div className="h-2.5 bg-dark-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isVisible ? { width: `${skill.level}%` } : {}}
                                                transition={{
                                                    delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                                                    duration: 1,
                                                    ease: 'easeOut'
                                                }}
                                                className={`h-full bg-gradient-to-r ${category.color} relative`}
                                            >
                                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-glow" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
