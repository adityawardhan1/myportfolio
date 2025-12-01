import { useEffect, RefObject } from 'react';

interface Use3DTiltOptions {
    max?: number;
    perspective?: number;
    scale?: number;
    speed?: number;
    easing?: string;
}

export const use3DTilt = (
    ref: RefObject<HTMLElement>,
    options: Use3DTiltOptions = {}
) => {
    const {
        max = 25,
        perspective = 1000,
        scale = 1.05,
        speed = 400,
        easing = 'cubic-bezier(0.03, 0.98, 0.52, 0.99)',
    } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseEnter = () => {
            element.style.willChange = 'transform';
            element.style.transition = `transform ${speed}ms ${easing}`;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            const rotateX = ((y / height - 0.5) * max).toFixed(2);
            const rotateY = ((x / width - 0.5) * -max).toFixed(2);

            element.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;
        };

        const handleMouseLeave = () => {
            element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
            element.style.willChange = 'auto';
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, max, perspective, scale, speed, easing]);
};
