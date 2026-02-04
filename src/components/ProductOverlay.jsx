import React from 'react';
import { motion } from 'framer-motion';

export function ProductOverlay({ product, onClose, enterAR }) {
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={onClose} // Click outside to close
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-panel-dark neon-border"
                style={{
                    width: '90%',
                    maxWidth: '500px',
                    padding: '2rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.5rem', background: 'none', color: 'white' }}
                >
                    ×
                </button>

                <div>
                    <h2 className="text-glow" style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>{product.name}</h2>
                    <div style={{ color: product.colors.accent, letterSpacing: '2px', fontSize: '0.9rem' }}>{product.tagline.toUpperCase()}</div>
                </div>

                <p style={{ lineHeight: 1.6, color: '#ddd' }}>
                    {product.description} featuring our signature Anti-Gravity sole technology and {product.type} verified performance specs.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>WEIGHT</div>
                        <div style={{ fontSize: '1.2rem' }}>180g</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>DROP</div>
                        <div style={{ fontSize: '1.2rem' }}>4mm</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{product.price}</div>

                    <button
                        onClick={enterAR}
                        style={{
                            background: `linear-gradient(45deg, ${product.colors.accent}, ${product.colors.main})`,
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            boxShadow: `0 0 20px ${product.colors.accent}40`,
                            cursor: 'pointer'
                        }}
                    >
                        View in AR
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
