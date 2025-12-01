import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onLoadComplete: () => void }> = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(onLoadComplete, 800);
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark-900"
                >
                    <div className="text-center">
                        {/* Animated Logo/Initials */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 20,
                            }}
                            className="mb-12"
                        >
                            <div className="relative">
                                {/* 3D Spinning Loader */}
                                <motion.div
                                    animate={{ rotateY: 360 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                    className="text-8xl font-bold text-gradient preserve-3d"
                                    style={{ perspective: '1000px' }}
                                >
                                    AW
                                </motion.div>

                                {/* Glow Effect */}
                                <div className="absolute inset-0 text-8xl font-bold text-gradient blur-2xl opacity-50 animate-pulse-slow">
                                    AW
                                </div>
                            </div>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-64 mx-auto">
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-purple relative"
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-shimmer"
                                        style={{
                                            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                                            backgroundSize: '200% 100%',
                                        }}
                                    />
                                </motion.div>
                            </div>

                            {/* Percentage Counter */}
                            <motion.div
                                key={Math.floor(progress)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm font-mono text-primary-400"
                            >
                                {Math.floor(progress)}%
                            </motion.div>
                        </div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-gray-400 text-sm tracking-wider"
                        >
                            LOADING EXPERIENCE...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
