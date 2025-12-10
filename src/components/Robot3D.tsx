import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Robot3DProps {
    enableRotation?: boolean;
    className?: string;
}

// Animated floating orb with distortion
const FloatingCore: React.FC<{ position: [number, number, number]; color: string; size: number }> = ({ position, color, size }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
        meshRef.current.rotation.x = time * 0.3;
        meshRef.current.rotation.z = time * 0.2;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <icosahedronGeometry args={[size, 1]} />
            <MeshDistortMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
                distort={0.3}
                speed={2}
            />
        </mesh>
    );
};

// Robot head with brighter colors
const RobotHead: React.FC = () => {
    const headRef = useRef<THREE.Group>(null);
    const eyeLeftRef = useRef<THREE.Mesh>(null);
    const eyeRightRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!headRef.current) return;
        const time = state.clock.getElapsedTime();

        headRef.current.position.y = 0.9 + Math.sin(time * 1.2) * 0.05;
        headRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;

        if (eyeLeftRef.current && eyeRightRef.current) {
            const material = eyeLeftRef.current.material as THREE.MeshStandardMaterial;
            const material2 = eyeRightRef.current.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = 1.0 + Math.sin(time * 3) * 0.4;
            material2.emissiveIntensity = 1.0 + Math.sin(time * 3) * 0.4;
        }
    });

    return (
        <group ref={headRef} position={[0, 0.9, 0]}>
            {/* Main head - brighter silver/gray */}
            <mesh>
                <boxGeometry args={[0.6, 0.5, 0.5]} />
                <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Visor - dark with reflection */}
            <mesh position={[0, 0.05, 0.26]}>
                <boxGeometry args={[0.5, 0.15, 0.05]} />
                <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Left eye - bright cyan */}
            <mesh ref={eyeLeftRef} position={[-0.12, 0.05, 0.28]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.0} />
            </mesh>

            {/* Right eye - bright cyan */}
            <mesh ref={eyeRightRef} position={[0.12, 0.05, 0.28]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.0} />
            </mesh>

            {/* Antenna */}
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.48, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.8} />
            </mesh>
        </group>
    );
};

// Robot body with brighter colors
const RobotBody: React.FC = () => {
    const bodyRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!bodyRef.current) return;
        const time = state.clock.getElapsedTime();
        bodyRef.current.position.y = Math.sin(time * 1.2) * 0.03;
    });

    return (
        <group ref={bodyRef} position={[0, 0.2, 0]}>
            {/* Main body - brighter silver */}
            <mesh>
                <boxGeometry args={[0.7, 0.8, 0.4]} />
                <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Chest core - bright cyan glow */}
            <mesh position={[0, 0.1, 0.21]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.14, 0.14, 0.05, 16]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
            </mesh>

            {/* Chest details */}
            <mesh position={[0.2, -0.15, 0.21]}>
                <boxGeometry args={[0.1, 0.2, 0.02]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.2, -0.15, 0.21]}>
                <boxGeometry args={[0.1, 0.2, 0.02]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
};

// Robot arms with brighter colors
const RobotArms: React.FC = () => {
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (leftArmRef.current) {
            leftArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
        }
        if (rightArmRef.current) {
            rightArmRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.2;
        }
    });

    return (
        <>
            {/* Left arm */}
            <group ref={leftArmRef} position={[-0.5, 0.3, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.45, 0]}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                    <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* Right arm */}
            <group ref={rightArmRef} position={[0.5, 0.3, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.45, 0]}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                    <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </>
    );
};

// Robot legs with brighter colors
const RobotLegs: React.FC = () => {
    const leftLegRef = useRef<THREE.Group>(null);
    const rightLegRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (leftLegRef.current) {
            leftLegRef.current.rotation.x = Math.sin(time * 1.5) * 0.15;
        }
        if (rightLegRef.current) {
            rightLegRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.15;
        }
    });

    return (
        <>
            {/* Left leg */}
            <group ref={leftLegRef} position={[-0.18, -0.35, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.35, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.55, 0]}>
                    <capsuleGeometry args={[0.06, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.75, 0.05]}>
                    <boxGeometry args={[0.12, 0.06, 0.18]} />
                    <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} />
                </mesh>
            </group>

            {/* Right leg */}
            <group ref={rightLegRef} position={[0.18, -0.35, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.35, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.55, 0]}>
                    <capsuleGeometry args={[0.06, 0.25, 8, 16]} />
                    <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.75, 0.05]}>
                    <boxGeometry args={[0.12, 0.06, 0.18]} />
                    <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.4} />
                </mesh>
            </group>
        </>
    );
};

// Full robot assembly
const Robot: React.FC<{ mousePosition: { x: number; y: number }; rotationDirection: number }> = ({ mousePosition, rotationDirection }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        groupRef.current.rotation.y += 0.005 * rotationDirection;

        const targetRotationY = mousePosition.x * 0.5;
        const targetRotationX = -mousePosition.y * 0.3;
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;

        const breathe = 1 + Math.sin(time * 1.0) * 0.02;
        groupRef.current.scale.setScalar(breathe);
    });

    return (
        <group ref={groupRef} position={[0, -0.3, 0]}>
            <RobotHead />
            <RobotBody />
            <RobotArms />
            <RobotLegs />

            {/* Floating orbs around robot */}
            <FloatingCore position={[-0.8, 0.5, 0.3]} color="#60a5fa" size={0.08} />
            <FloatingCore position={[0.8, 0.7, -0.2]} color="#c084fc" size={0.06} />
            <FloatingCore position={[0.5, -0.3, 0.5]} color="#22d3ee" size={0.05} />
        </group>
    );
};

// Brighter animated lights
const AnimatedLights: React.FC = () => {
    const lightRef1 = useRef<THREE.PointLight>(null);
    const lightRef2 = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (lightRef1.current) {
            lightRef1.current.position.x = Math.sin(time * 0.5) * 3;
            lightRef1.current.position.y = Math.cos(time * 0.3) * 2 + 2;
            lightRef1.current.intensity = 1.5 + Math.sin(time * 0.7) * 0.5;
        }
        if (lightRef2.current) {
            lightRef2.current.position.x = Math.cos(time * 0.4) * 3;
            lightRef2.current.position.z = Math.sin(time * 0.6) * 3;
            lightRef2.current.intensity = 1.2 + Math.cos(time * 0.5) * 0.4;
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight ref={lightRef1} position={[3, 3, 3]} intensity={1.5} color="#60a5fa" />
            <pointLight ref={lightRef2} position={[-3, -2, 3]} intensity={1.2} color="#c084fc" />
            <spotLight position={[0, 5, 5]} intensity={0.8} angle={0.6} penumbra={1} castShadow />
            <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        </>
    );
};

// Wandering positions for the robot
const wanderPositions = [
    { x: 0, y: 0 },
    { x: 50, y: -30 },
    { x: -40, y: 20 },
    { x: 30, y: 40 },
    { x: -30, y: -20 },
];

const Robot3D: React.FC<Robot3DProps> = ({ enableRotation = true, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotationDirection, setRotationDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [wanderIndex, setWanderIndex] = useState(0);

    // Wandering effect - move to new position every 5-10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setWanderIndex(prev => (prev + 1) % wanderPositions.length);
        }, 7000); // Move every 7 seconds

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!enableRotation || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
    };

    const currentPosition = wanderPositions[wanderIndex];

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: currentPosition.x,
                y: currentPosition.y
            }}
            transition={{
                duration: 2,
                x: { duration: 2.5, ease: "easeInOut" },
                y: { duration: 2.5, ease: "easeInOut" }
            }}
            className={`relative w-full aspect-square ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setMousePosition({ x: 0, y: 0 }); setIsHovered(false); }}
            onMouseEnter={() => setIsHovered(true)}
            onClick={() => setRotationDirection(prev => -prev)}
            style={{ cursor: isHovered ? 'pointer' : 'default' }}
        >
            {/* 3D Canvas - no background container */}
            <Canvas
                shadows
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
                style={{ background: 'transparent' }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
                <AnimatedLights />
                <Environment preset="city" />
                <Suspense fallback={null}>
                    <Robot mousePosition={mousePosition} rotationDirection={rotationDirection} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>
        </motion.div>
    );
};

export default Robot3D;
