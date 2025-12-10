import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
    className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    icon,
    className = '',
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        set({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        set({ x: 0, y: 0 });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { id: Date.now(), x, y };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    const baseStyles = 'relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-out rounded-full overflow-hidden group cursor-hover';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-primary-600 to-accent-cyan hover:shadow-glow-lg',
        secondary: 'bg-gradient-to-r from-accent-purple to-accent-pink hover:shadow-glow-purple',
        outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 hover:shadow-glow',
    };

    return (
        <animated.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: x.to((x) => `translate3d(${x}px, ${y.get()}px, 0)`) }}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {/* Hover Background Effect */}
            <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${variant === 'primary'
                    ? 'bg-gradient-to-r from-accent-cyan to-primary-600'
                    : variant === 'secondary'
                        ? 'bg-gradient-to-r from-accent-pink to-accent-purple'
                        : 'bg-primary-500/20'
                    }`}
            />

            {/* Ripple Effect */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ping"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 20,
                        height: 20,
                        transform: 'translate(-50%, -50%)',
                        animationDuration: '600ms',
                    }}
                />
            ))}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {icon && <span className="text-xl">{icon}</span>}
                {children}
            </span>
        </animated.button>
    );
};

export default MagneticButton;
