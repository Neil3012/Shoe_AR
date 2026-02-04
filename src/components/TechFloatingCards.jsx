import React from 'react';
import { Html } from '@react-three/drei';

export function TechFloatingCards() {
    return (
        <group>
            <Html position={[5, 2, -15]} transform>
                <div className="glass-panel-dark" style={{ padding: '1rem', width: '200px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--accent-cyan)' }}>ZERO-G CUSHIONING</h3>
                    <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Impact absorption that defies physics.</p>
                </div>
            </Html>

            <Html position={[-5, -2, -30]} transform>
                <div className="glass-panel-dark" style={{ padding: '1rem', width: '200px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--accent-purple)' }}>ENERGY RETURN</h3>
                    <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Propulsion systems for the next step.</p>
                </div>
            </Html>

            <Html position={[0, 4, -45]} transform>
                <div className="glass-panel-dark" style={{ padding: '1rem', width: '200px', textAlign: 'center' }}>
                    <h3 style={{ color: '#fff' }}>ADAPTIVE WEAVE</h3>
                    <p style={{ fontSize: '0.8rem', color: '#ccc' }}>Materials that mold to your movement.</p>
                </div>
            </Html>
        </group>
    );
}
