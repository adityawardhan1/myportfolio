import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const shapes = [
        { type: 'cube', size: 100, x: 10, y: 20, delay: 0, duration: 8 },
        { type: 'sphere', size: 80, x: 80, y: 15, delay: 0.5, duration: 10 },
        { type: 'pyramid', size: 120, x: 20, y: 70, delay: 1, duration: 12 },
        { type: 'cube', size: 60, x: 75, y: 65, delay: 1.5, duration: 9 },
        { type: 'sphere', size: 90, x: 50, y: 50, delay: 2, duration: 11 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        width: shape.size,
                        height: shape.size,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        rotateX: [0, 360],
                        rotateY: [0, 360],
                        x: mousePosition.x * (index % 2 === 0 ? 1 : -1),
                        y: mousePosition.y * (index % 2 === 0 ? 1 : -1),
                    }}
                    transition={{
                        opacity: { duration: shape.duration, repeat: Infinity },
                        scale: { duration: shape.duration, repeat: Infinity },
                        rotateX: { duration: shape.duration, repeat: Infinity, ease: 'linear' },
                        rotateY: { duration: shape.duration, repeat: Infinity, ease: 'linear' },
                        x: { duration: 0.5 },
                        y: { duration: 0.5 },
                        delay: shape.delay,
                    }}
                >
                    {shape.type === 'cube' && (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 backdrop-blur-sm border border-primary-500/30 rounded-lg preserve-3d" />
                    )}
                    {shape.type === 'sphere' && (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 backdrop-blur-sm border border-accent-purple/30" />
                    )}
                    {shape.type === 'pyramid' && (
                        <div className="w-full h-full">
                            <div
                                className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-accent-cyan/20"
                                style={{
                                    filter: 'blur(1px)',
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float-slower" />
        </div>
    );
};

export default FloatingShapes;
