import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../hooks/useKonamiCode';

const EasterEgg: React.FC = () => {
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

    useKonamiCode(() => {
        setShowEasterEgg(true);
        createFireworks();

        // Hide after 5 seconds
        setTimeout(() => {
            setShowEasterEgg(false);
            setParticles([]);
        }, 5000);
    });

    const createFireworks = () => {
        const colors = ['#3b82f6', '#06b6d4', '#a855f7', '#ec4899', '#f59e0b'];
        const newParticles = [];

        for (let i = 0; i < 100; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        setParticles(newParticles);
    };

    return (
        <AnimatePresence>
            {showEasterEgg && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[9999] pointer-events-none"
                    />

                    {/* Fireworks Particles */}
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2,
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={{
                                x: particle.x,
                                y: particle.y,
                                scale: [0, 1.5, 0],
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                ease: 'easeOut',
                            }}
                            className="fixed w-2 h-2 rounded-full z-[10000] pointer-events-none"
                            style={{
                                backgroundColor: particle.color,
                                boxShadow: `0 0 10px ${particle.color}`,
                            }}
                        />
                    ))}

                    {/* Achievement Message */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180, y: -100 }}
                        animate={{ scale: 1, rotate: 0, y: 0 }}
                        exit={{ scale: 0, rotate: 180, y: 100 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                        }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10001] pointer-events-none"
                    >
                        <div className="glass-dark px-12 py-8 rounded-2xl text-center">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-6xl mb-4"
                            >
                                🎮
                            </motion.div>

                            <h2 className="text-4xl font-bold text-gradient mb-2">
                                Achievement Unlocked!
                            </h2>

                            <p className="text-gray-300 text-lg">
                                Konami Code Master
                            </p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-sm text-gray-400 mt-4"
                            >
                                You found the secret! 🎉
                            </motion.p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
