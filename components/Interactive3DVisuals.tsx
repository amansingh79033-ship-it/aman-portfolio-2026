import React, { useRef, useMemo } from 'react';
// @ts-ignore
import { Canvas, useFrame } from '@react-three/fiber';
// @ts-ignore
import { Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSphereProps {
  position?: [number, number, number];
  color?: string;
  distort?: number;
  speed?: number;
  roughness?: number;
  size?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
}

export const FloatingSphere: React.FC<FloatingSphereProps> = ({
  position = [0, 0, 0],
  color = '#0ea5e9',
  distort = 0.3,
  speed = 2,
  roughness = 0.1,
  size = 1,
  floatSpeed = 1.5,
  rotationIntensity = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 32, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed}
          roughness={roughness}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

interface Interactive3DCanvasProps {
  children?: React.ReactNode;
}

export const Interactive3DCanvas: React.FC<Interactive3DCanvasProps> = ({ children }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 0
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ParticleField count={200} color="#38bdf8" />
      {children}
    </Canvas>
  );
};

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ count = 100, color = '#0ea5e9' }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.05;
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.6} />
    </points>
  );
};