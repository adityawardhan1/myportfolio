import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useScrollAnimation = (
    ref: RefObject<HTMLElement>,
    options: UseScrollAnimationOptions = {}
) => {
    const { threshold = 0.1, triggerOnce = true } = options;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold, triggerOnce]);

    return isVisible;
};

export const useStaggerAnimation = (
    count: number,
    delay: number = 100
): boolean[] => {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(
        new Array(count).fill(false)
    );

    useEffect(() => {
        const timers: number[] = [];

        for (let i = 0; i < count; i++) {
            const timer = window.setTimeout(() => {
                setVisibleItems((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                });
            }, i * delay);
            timers.push(timer);
        }

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [count, delay]);

    return visibleItems;
};
