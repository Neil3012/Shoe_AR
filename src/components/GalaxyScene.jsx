import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { ShoeModel } from './ShoeModel';
import { Sparkles, Stars, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

export function GalaxyScene({ products, onSelect }) {
    const scroll = useScroll();
    const { width, height } = useThree((state) => state.viewport);

    // Determine positions relative to scroll progress
    // We want shoes to appear as we scroll down
    useFrame((state, delta) => {
        // Optional: Animate the entire group slightly based on scroll
        // groupRef.current.rotation.z = scroll.offset * 0.5;
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4444ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd00ff" />

            {/* Cosmic Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={500} scale={20} size={4} speed={0.4} opacity={0.5} color="#00f3ff" />
            <Environment preset="city" />

            <group>
                {products.map((product, i) => {
                    // Calculate spiral position
                    // y is determined by index + scroll adjustment (handled by ScrollControls via user interaction, 
                    // but here we place them in consistent 3D space and let camera move)
                    // Actually, better to place them along negative Z or Y axis and let user scroll "through" them.

                    // Spiral layout
                    const angle = (i / products.length) * Math.PI * 4; // 2 full turns
                    const radius = 4;
                    const zPos = -i * 10; // Spaced out by 10 units
                    const xPos = Math.cos(angle) * radius;
                    const yPos = Math.sin(angle) * radius;

                    return (
                        <Float key={product.id} speed={2} rotationIntensity={1} floatIntensity={1}>
                            <group position={[xPos, yPos, zPos]}>
                                <ShoeModel
                                    color={product.colors}
                                    geometryConfig={product.geometry}
                                    onClick={() => onSelect(product)}
                                    rotation={product.rotation}
                                />

                                {/* Floating Label */}
                                <mesh position={[0, -1.5, 0]}>
                                    <planeGeometry args={[3, 1]} />
                                    <meshBasicMaterial transparent opacity={0} />
                                    {/* Using Html inside ShoeModel or here? 
                          Let's keep 3D text minimal or use Html for overlay.
                      */}
                                </mesh>
                            </group>
                        </Float>
                    );
                })}
            </group>

            {/* Camera Controller that moves with scroll */}
            <GalaxyCamera products={products} />
        </>
    );
}

function GalaxyCamera({ products }) {
    const scroll = useScroll();
    const { camera } = useThree();

    useFrame(() => {
        // Move camera along the Z axis based on scroll offset
        // Total distance = products.length * 10
        const targetZ = -scroll.offset * (products.length * 10);

        // Smooth lerp
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 10, 0.1);

        // Optional: Look at the "current" shoe section center
        // const currentAngle = scroll.offset * Math.PI * 4;
        // camera.position.x = Math.cos(currentAngle) * 2;
        // camera.position.y = Math.sin(currentAngle) * 2;
        // camera.lookAt(0, 0, targetZ - 10);
    });

    return null;
}
