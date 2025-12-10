import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiZap } from 'react-icons/fi';
import { use3DTilt } from '../../hooks/use3DTilt';

interface ProjectCardProps {
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    image: string;
    github: string;
    demo: string | null;
    metrics: Record<string, string | undefined>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    longDescription,
    tags,
    github,
    demo,
    metrics,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    use3DTilt(cardRef, { max: 10, perspective: 1500 });

    return (
        <div
            ref={cardRef}
            className="relative w-full h-[500px] perspective-1000 cursor-hover group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className={`relative w-full h-full preserve-3d transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''
                    }`}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden glass-dark rounded-2xl p-6 overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 blur-2xl" />

                    <div className="relative z-10 h-full flex flex-col">
                        {/* Project Icon/Image Placeholder */}
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center mb-4 shadow-glow">
                            <FiZap className="text-3xl text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                            {title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6 flex-grow line-clamp-3">
                            {description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full border border-primary-500/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Hover Hint */}
                        <div className="text-sm text-gray-500 italic">
                            Hover to see more details →
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000" />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-dark rounded-2xl p-6 overflow-hidden">
                    <div className="h-full flex flex-col">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gradient mb-4">
                            {title}
                        </h3>

                        {/* Long Description */}
                        <p className="text-gray-300 text-sm mb-4 flex-grow overflow-y-auto scrollbar-hide">
                            {longDescription}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {Object.entries(metrics).map(([key, value], index) => (
                                <div key={index} className="glass rounded-lg p-3">
                                    <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
                                    <p className="text-sm font-semibold text-primary-400">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                            {github && (
                                <motion.a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:shadow-glow transition-all"
                                >
                                    <FiGithub />
                                    <span className="text-sm font-medium">GitHub</span>
                                </motion.a>
                            )}
                            {demo && (
                                <motion.a
                                    href={demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-cyan text-white rounded-lg hover:shadow-glow transition-all"
                                >
                                    <FiExternalLink />
                                    <span className="text-sm font-medium">Live Demo</span>
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
