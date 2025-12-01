import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(async (text: string, message?: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success(message || 'Copied to clipboard!', {
                duration: 2000,
                position: 'bottom-center',
                style: {
                    background: '#0ea5e9',
                    color: '#fff',
                    borderRadius: '9999px',
                    padding: '12px 24px',
                },
            });

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy', {
                duration: 2000,
                position: 'bottom-center',
            });
            console.error('Failed to copy text: ', err);
        }
    }, []);

    return { copied, copyToClipboard };
};
