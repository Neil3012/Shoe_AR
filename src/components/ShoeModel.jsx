import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';

export function ShoeModel({ color, geometryConfig = { type: 'low', soleHeight: 0.2 }, onClick, ...props }) {
    const group = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        // Independent floating if not handled by parent GalaxyScene
        // But GalaxyScene might handle the orbital motion. 
        // We add local rotation for "life".
        if (group.current) {
            group.current.rotation.y += 0.005;
        }
    });

    const materialProps = {
        color: color.main,
        roughness: 0.2,
        metalness: 0.4
    };

    // Geometry variations based on config
    const bodyHeight = geometryConfig.type === 'high' ? 1.0 : 0.6;
    const soleH = geometryConfig.soleHeight || 0.2;

    return (
        <group
            ref={group}
            {...props}
            onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.1 : 1}
        >
            {/* Sole */}
            <mesh position={[0, -soleH / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.2, soleH, 3]} />
                <meshStandardMaterial color={color.sole} roughness={0.5} />
            </mesh>

            {/* Neon Sole Glow */}
            {hovered && (
                <pointLight position={[0, -0.5, 0]} color={color.accent} intensity={2} distance={3} />
            )}

            {/* Main Body */}
            <mesh position={[0, bodyHeight / 2, 0.5]} castShadow>
                <boxGeometry args={[1.1, bodyHeight, 1.8]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Toe Box */}
            <mesh position={[0, 0.2, -1]} rotation={[0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.5, 0.6, 1.5, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Tongue / Laces */}
            <mesh position={[0, bodyHeight, -0.2]} rotation={[-0.5, 0, 0]}>
                <boxGeometry args={[0.8, 0.1, 1.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Accents */}
            <mesh position={[0.6, 0.2, 0.5]}>
                <capsuleGeometry args={[0.05, 1, 4, 8]} />
                <meshStandardMaterial color={color.accent} emissive={color.accent} emissiveIntensity={2} />
            </mesh>

            {hovered && (
                <Html position={[0, 1.5, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                    <div className="glass-panel-dark" style={{ padding: '0.5rem 1rem', color: 'white', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.8rem', color: color.accent }}>VIEW DETAIL</div>
                    </div>
                </Html>
            )}
        </group>
    );
}
