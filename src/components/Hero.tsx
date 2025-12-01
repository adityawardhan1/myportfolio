import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';
import MagneticButton from './ui/MagneticButton';
import FloatingShapes from './Hero/FloatingShapes';
import GLBAvatar3D from './GLBAvatar3D';

const Hero: React.FC = () => {
    const [scrambledText, setScrambledText] = useState('');
    const [showTyping, setShowTyping] = useState(false);
    const chars = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ@#$%&*';
    const finalText = "Hi, I'm Aditya Wardhan";

    // Text scramble effect
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambledText(
                finalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return finalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            iteration += 1 / 3;

            if (iteration >= finalText.length) {
                clearInterval(interval);
                setShowTyping(true);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const socialLinks = [
        { icon: FiGithub, href: 'https://github.com/adityawardhan', label: 'GitHub' },
        { icon: FiLinkedin, href: 'https://linkedin.com/in/adityawardhan', label: 'LinkedIn' },
        { icon: FiMail, href: 'mailto:adityawardhan1978@gmail.com', label: 'Email' },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
        >
            {/* Floating Geometric Shapes Background */}
            <FloatingShapes />

            {/* Neural Network / Constellation Effect */}
            <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full">
                    <defs>
                        <radialGradient id="dotGradient">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {[...Array(50)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={Math.random() * 100 + '%'}
                            cy={Math.random() * 100 + '%'}
                            r="2"
                            fill="url(#dotGradient)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Text Content */}
                <div className="text-center lg:text-left">
                    {/* Greeting with Scramble Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-6"
                    >
                        {!showTyping ? (
                            <h1 className="text-5xl md:text-7xl font-bold text-white font-mono">
                                {scrambledText}
                            </h1>
                        ) : (
                            <h1 className="text-5xl md:text-7xl font-bold">
                                <TypeAnimation
                                    sequence={[
                                        "Hi, I'm Aditya Wardhan",
                                        2000,
                                        "Hi, I'm a Developer",
                                        2000,
                                        "Hi, I'm a Problem Solver",
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    className="text-gradient-animate"
                                    repeat={Infinity}
                                />
                            </h1>
                        )}
                    </motion.div>

                    {/* Role Description with Breathing Glow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mb-8 relative"
                    >
                        <motion.h2
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(59, 130, 246, 0.5)',
                                    '0 0 40px rgba(59, 130, 246, 0.8)',
                                    '0 0 20px rgba(59, 130, 246, 0.5)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-2xl md:text-4xl font-semibold text-gray-200"
                        >
                            Full-Stack Developer | ML Enthusiast
                        </motion.h2>
                    </motion.div>

                    {/* Brief Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-400 mb-12"
                    >
                        B.Tech CS Student at JIIT Noida | Passionate about building scalable solutions
                        and exploring the frontiers of machine learning
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12"
                    >
                        <MagneticButton
                            onClick={() => scrollToSection('projects')}
                            variant="primary"
                        >
                            View Work
                        </MagneticButton>

                        <MagneticButton
                            onClick={() => scrollToSection('contact')}
                            variant="secondary"
                        >
                            Contact Me
                        </MagneticButton>

                        <MagneticButton
                            onClick={() => {
                                // Create a dummy resume download (you can replace with actual resume)
                                const link = document.createElement('a');
                                link.href = '/resume.pdf'; // You'll need to add the actual resume
                                link.download = 'Aditya_Wardhan_Resume.pdf';
                                link.click();
                            }}
                            variant="outline"
                            icon={<FiDownload />}
                        >
                            Resume
                        </MagneticButton>
                    </motion.div>

                    {/* Social Links with Stagger Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.8 }}
                        className="flex gap-6 justify-center lg:justify-start mb-16"
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5 + index * 0.1 }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-4 glass rounded-full hover:bg-primary-500/20 transition-all cursor-hover group"
                                aria-label={social.label}
                            >
                                <social.icon className="text-2xl text-gray-300 group-hover:text-primary-400 transition-colors" />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.8 }}
                        className="cursor-hover lg:hidden"
                        onClick={() => scrollToSection('about')}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex flex-col items-center"
                        >
                            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
                            <div className="p-2 glass rounded-full">
                                <FiArrowDown className="text-primary-400" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side: 3D Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
                    className="flex justify-center lg:justify-end"
                >
                    <GLBAvatar3D
                        scale={3.5}
                        enableRotation={true}
                        className="mt-8 lg:mt-0 w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
