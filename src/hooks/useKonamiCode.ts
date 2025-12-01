import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export const useKonamiCode = (callback: () => void) => {
    const [keys, setKeys] = useState<string[]>([]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        setKeys((prevKeys) => {
            const newKeys = [...prevKeys, event.key];

            // Keep only the last 10 keys
            if (newKeys.length > KONAMI_CODE.length) {
                newKeys.shift();
            }

            // Check if the sequence matches
            const matches = KONAMI_CODE.every(
                (key, index) => key === newKeys[index]
            );

            if (matches && newKeys.length === KONAMI_CODE.length) {
                callback();
                return []; // Reset after successful match
            }

            return newKeys;
        });
    }, [callback]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return keys;
};
