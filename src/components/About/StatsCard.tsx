import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';
import type { IconType } from 'react-icons';

interface StatsCardProps {
    icon: IconType;
    value: number;
    suffix?: string;
    label: string;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, suffix = '', label, color }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    use3DTilt(cardRef, { max: 15, perspective: 1000, scale: 1.05 });

    useEffect(() => {
        if (!hasAnimated) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            const stepDuration = duration / steps;

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    setHasAnimated(true);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepDuration);

            return () => clearInterval(timer);
        }
    }, [value, hasAnimated]);

    return (
        <div
            ref={cardRef}
            className="glass-dark rounded-2xl p-8 relative overflow-hidden group cursor-hover"
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Icon with Glow */}
            <div className="relative mb-6">
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`inline-flex p-4 rounded-full bg-gradient-to-br ${color} shadow-glow`}
                >
                    <Icon className="text-3xl text-white" />
                </motion.div>
            </div>

            {/* Counter */}
            <div className="mb-2">
                <h3 className={`text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {count}{suffix}
                </h3>
            </div>

            {/* Label */}
            <p className="text-gray-400 text-sm leading-relaxed">{label}</p>

            {/* Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-1000" />
            </div>
        </div>
    );
};

export default StatsCard;
