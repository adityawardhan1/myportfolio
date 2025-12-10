import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface GLBAvatar3DProps {
    scale?: number;
    enableRotation?: boolean;
    autoRotate?: boolean;
    className?: string;
}

interface ModelProps {
    enableRotation: boolean;
    scale: number;
    mousePosition: { x: number; y: number };
    rotationDirection: number;
}

const Model: React.FC<ModelProps> = ({ enableRotation, scale, mousePosition, rotationDirection }) => {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/models/avatar.glb');

    const { clonedScene, autoScale } = React.useMemo(() => {
        const cloned = scene.clone();

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(cloned);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Calculate scale
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 2.5;
        const calculatedScale = maxDimension > 0 ? targetSize / maxDimension : 1;

        // Option A: Standard rotation
        cloned.rotation.set(0, Math.PI, 0);

        // Position: centered horizontally, lifted slightly (0.1)
        cloned.position.set(
            -center.x,
            -center.y + (size.y * 0.1), // Reduced to 0.1 to lower the model
            -center.z
        );

        console.log('🔴 AVATAR LOADED - TIMESTAMP:', new Date().toLocaleTimeString());
        console.log('📊 Size Y:', size.y.toFixed(2), 'Center Y:', center.y.toFixed(2));
        console.log('📐 Lift Amount:', (size.y * 0.1).toFixed(2), 'Final Y:', (-center.y + (size.y * 0.1)).toFixed(2));
        console.log('⚡ Scale:', calculatedScale.toFixed(2));

        return { clonedScene: cloned, autoScale: calculatedScale };
    }, [scene]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
        groupRef.current.position.x = Math.sin(time * 0.6) * 0.03;
        groupRef.current.rotation.y += 0.01 * rotationDirection;

        if (enableRotation) {
            const targetRotationY = mousePosition.x * 1.0;
            const targetRotationX = -mousePosition.y * 0.8;
            groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
            groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
        }

        const breathe = 1 + Math.sin(time * 1.0) * 0.08;
        groupRef.current.scale.setScalar(scale * autoScale * breathe);
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <primitive object={clonedScene} />
        </group>
    );
};

const AnimatedLights: React.FC = () => {
    const lightRef1 = useRef<THREE.PointLight>(null);
    const lightRef2 = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (lightRef1.current) {
            lightRef1.current.position.x = Math.sin(time * 0.5) * 3;
            lightRef1.current.position.y = Math.cos(time * 0.3) * 2 + 3;
            lightRef1.current.intensity = 1 + Math.sin(time * 0.7) * 0.3;
        }
        if (lightRef2.current) {
            lightRef2.current.position.x = Math.cos(time * 0.4) * 3;
            lightRef2.current.position.z = Math.sin(time * 0.6) * 3;
            lightRef2.current.intensity = 0.8 + Math.cos(time * 0.5) * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight ref={lightRef1} position={[5, 5, 5]} intensity={1} color="#3b82f6" />
            <pointLight ref={lightRef2} position={[-5, -5, 5]} intensity={0.8} color="#a855f7" />
            <spotLight position={[0, 5, 5]} intensity={0.5} angle={0.6} penumbra={1} castShadow />
        </>
    );
};

const GLBAvatar3D: React.FC<GLBAvatar3DProps> = ({ scale = 1.5, enableRotation = true, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotationDirection, setRotationDirection] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!enableRotation || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`relative w-full aspect-square ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setMousePosition({ x: 0, y: 0 }); setIsHovered(false); }}
            onMouseEnter={() => setIsHovered(true)}
            onClick={() => setRotationDirection(prev => -prev)}
            style={{ cursor: isHovered ? 'pointer' : 'default' }}
        >
            <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute inset-0" style={{ background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #a855f7, #ec4899, #3b82f6)', filter: 'blur(8px)' }} />
            </motion.div>

            <div className="absolute inset-[3px] rounded-3xl overflow-hidden glass-dark">
                <Canvas shadows gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />
                    <AnimatedLights />
                    <Environment preset="city" />
                    <Suspense fallback={null}>
                        <Model enableRotation={enableRotation} scale={scale} mousePosition={mousePosition} rotationDirection={rotationDirection} />
                    </Suspense>
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1, duration: 0.5 }} className="text-primary-400">
                    <div className="w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
                </motion.div>
            </div>

            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{ boxShadow: ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.3)'] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </motion.div>
    );
};

useGLTF.preload('/models/avatar.glb');

export default GLBAvatar3D;