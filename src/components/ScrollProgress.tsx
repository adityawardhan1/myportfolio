import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollCurrent = window.scrollY;
            const progress = (scrollCurrent / scrollTotal) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial call

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            {/* Progress Line */}
            <div className="relative h-full">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-purple relative"
                    style={{ width: `${scrollProgress}%` }}
                    initial={{ width: 0 }}
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 shadow-glow-lg blur-sm" />

                    {/* Shimmer Effect */}
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s ease-in-out infinite',
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ScrollProgress;
