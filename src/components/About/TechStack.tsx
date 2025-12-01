import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    SiJavascript,
    SiPython,
    SiCplusplus,
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiMysql,
    SiGit,
    SiTensorflow,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const TechStack: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const techs = [
        { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
        { icon: SiPython, name: 'Python', color: '#3776AB' },
        { icon: FaJava, name: 'Java', color: '#007396' },
        { icon: SiCplusplus, name: 'C++', color: '#00599C' },
        { icon: SiReact, name: 'React', color: '#61DAFB' },
        { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
        { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
        { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
        { icon: SiGit, name: 'Git', color: '#F05032' },
        { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00' },
    ];

    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
                Technologies I Work With
            </h3>

            <div className="flex flex-wrap justify-center gap-6">
                {techs.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        whileHover={{
                            scale: 1.2,
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.3 },
                        }}
                        className="relative group cursor-hover"
                    >
                        {/* Tech Icon */}
                        <div className="p-6 glass-dark rounded-2xl transition-all duration-300 group-hover:shadow-glow">
                            <tech.icon
                                className="text-5xl transition-all duration-300"
                                style={{
                                    color: hoveredIndex === index ? tech.color : '#9ca3af',
                                }}
                            />
                        </div>

                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: hoveredIndex === index ? 1 : 0,
                                y: hoveredIndex === index ? 0 : 10,
                            }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-white bg-dark-700 px-3 py-1 rounded-lg pointer-events-none"
                        >
                            {tech.name}
                        </motion.div>

                        {/* Floating Animation */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.1,
                            }}
                            className="absolute inset-0 pointer-events-none"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TechStack;