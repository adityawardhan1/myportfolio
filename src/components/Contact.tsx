import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useClipboard } from '../hooks/useClipboard';
import { FiMail, FiGithub, FiLinkedin, FiCopy, FiCheckCircle } from 'react-icons/fi';

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });
    const { copied, copyToClipboard } = useClipboard();

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email',
            value: 'adityawardhan1978@gmail.com',
            link: 'mailto:adityawardhan1978@gmail.com',
            copyable: true,
        },
        {
            icon: FiGithub,
            label: 'GitHub',
            value: 'github.com/adityawardhan1',
            link: 'https://github.com/adityawardhan1',
            copyable: false,
        },
        {
            icon: FiLinkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/aditya-wardhan',
            link: 'https://www.linkedin.com/in/aditya-wardhan/',
            copyable: false,
        },
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section-container bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden"
        >
            {/* Particle Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            scale: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 bg-primary-500 rounded-full blur-sm"
                    />
                ))}
            </div>

            <div className="max-w-4xl mx-auto w-full relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                        Get In Touch
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-cyan mx-auto rounded-full mb-6" />

                    {/* Availability Status */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full"
                    >
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">Open to opportunities</span>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
                >
                    I'm always interested in hearing about new projects and opportunities.
                    Whether you have a question or just want to say hi, feel free to reach out!
                </motion.p>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {contactInfo.map((contact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                            className="glass-dark rounded-2xl p-6 hover:shadow-glow-lg transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan text-white">
                                        <contact.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                                        <a
                                            href={contact.link}
                                            target={contact.copyable ? undefined : '_blank'}
                                            rel={contact.copyable ? undefined : 'noopener noreferrer'}
                                            className="text-white font-medium hover:text-primary-400 transition-colors cursor-hover"
                                        >
                                            {contact.value}
                                        </a>
                                    </div>
                                </div>

                                {contact.copyable && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => copyToClipboard(contact.value, `${contact.label} copied!`)}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-hover"
                                        aria-label={`Copy ${contact.label}`}
                                    >
                                        {copied ? (
                                            <FiCheckCircle className="text-green-500" />
                                        ) : (
                                            <FiCopy className="text-gray-400" />
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="text-center text-gray-500 text-sm"
                >
                    <p>© 2024 Aditya Wardhan. Built with React, TypeScript & Tailwind CSS.</p>
                    <p className="mt-2">Designed with ❤️ and lots of ☕</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
