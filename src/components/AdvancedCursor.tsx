import React, { useEffect, useState } from 'react';

const AdvancedCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if touch device
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        let particleId = 0;

        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Smooth dot animation
            setDotPosition((prev) => ({
                x: prev.x + (e.clientX - prev.x) * 0.15,
                y: prev.y + (e.clientY - prev.y) * 0.15,
            }));

            // Add particle trail (limited to avoid performance issues)
            if (Math.random() > 0.9) {
                const newParticle = { id: particleId++, x: e.clientX, y: e.clientY };
                setParticles((prev) => [...prev.slice(-5), newParticle]);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('cursor-hover') ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isTouchDevice]);

    // Remove particles after animation
    useEffect(() => {
        if (particles.length > 0) {
            const timer = setTimeout(() => {
                setParticles((prev) => prev.slice(1));
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [particles]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Cursor Dot */}
            <div

                className="fixed w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
                style={{
                    left: `${dotPosition.x}px`,
                    top: `${dotPosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Cursor Ring */}
            <div
                className={`fixed w-10 h-10 border-2 border-primary-500 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-200 ${isHovering ? 'scale-150 bg-primary-500/10' : ''
                    }`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Particle Trail */}
            {particles.map((particle, index) => (
                <div
                    key={particle.id}
                    className="fixed w-1.5 h-1.5 bg-accent-cyan rounded-full pointer-events-none z-[9997] animate-ping"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        transform: 'translate(-50%, -50%)',
                        opacity: 1 - index * 0.2,
                        animationDuration: '600ms',
                    }}
                />
            ))}
        </>
    );
};

export default AdvancedCursor;
