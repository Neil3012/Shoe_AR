import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { ScrollControls } from '@react-three/drei';
import { GalaxyScene } from './components/GalaxyScene';
import { ProductOverlay } from './components/ProductOverlay';
import { products } from './data/products';
import './index.css';

const store = createXRStore();

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>

      {/* 3D Galaxy Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050508']} />
        <XR store={store}>
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.2} infinite>
              <GalaxyScene
                products={products}
                onSelect={setSelectedProduct}
              />
            </ScrollControls>
          </Suspense>
        </XR>
      </Canvas>

      {/* UI Overlay for Selected Product */}
      {selectedProduct && (
        <ProductOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          enterAR={() => store.enterAR()}
        />
      )}

      {/* Hero / HUD Elements (Always visible when no product selected) */}
      {!selectedProduct && (
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '2rem', pointerEvents: 'none' }}>
          <h1 className="text-glow" style={{ fontSize: '2rem', fontWeight: '800' }}>ANTI-GRAVITY</h1>
          <p style={{ color: 'var(--accent-cyan)', letterSpacing: '2px' }}>SCROLL TO EXPLORE</p>
        </div>
      )}
    </div>
  );
}

export default App;
