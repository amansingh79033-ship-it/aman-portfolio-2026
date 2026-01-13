import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBrainProps {
  className?: string;
}

const ThreeBrain: React.FC<ThreeBrainProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background to blend with parent container
    scene.fog = new THREE.Fog(0x1e293b, 10, 25); // Slate fog for depth
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      65,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    camera.position.y = 1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create brain geometry
    const brainGroup = new THREE.Group();
    brainRef.current = brainGroup;

    // Main brain sphere
    const brainGeometry = new THREE.SphereGeometry(1, 32, 32);
    const brainMaterial = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.5,
      wireframe: false,
    });
    const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
    brainGroup.add(brainMesh);

    // Add neural connections
    for (let i = 0; i < 50; i++) {
      const connectionGeometry = new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8);
      const connectionMaterial = new THREE.MeshPhongMaterial({
        color: 0x22d3ee,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.5,
      });
      const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
      
      // Position connections randomly around the brain
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.2;
      
      connection.position.x = Math.sin(theta) * Math.cos(phi) * radius;
      connection.position.y = Math.cos(theta) * radius;
      connection.position.z = Math.sin(theta) * Math.sin(phi) * radius;
      
      // Orient the cylinder to point toward the center
      connection.lookAt(0, 0, 0);
      
      brainGroup.add(connection);
    }

    // Add neural nodes
    const neuralNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 30; i++) {
      const nodeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.7,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Position nodes randomly around the brain
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.3;
      
      node.position.x = Math.sin(theta) * Math.cos(phi) * radius;
      node.position.y = Math.cos(theta) * radius;
      node.position.z = Math.sin(theta) * Math.sin(phi) * radius;
      
      brainGroup.add(node);
      neuralNodes.push(node);
    }

    scene.add(brainGroup);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 1, 100);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);
    
    // Add subtle particles around the brain
    const particleCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 4;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Store references for animation
    particlesRef.current = particlesMesh;
    particlesGeometryRef.current = particlesGeometry;
    

    // Mouse move handler for interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Get time for animations
      const time = Date.now() * 0.001;
      
      if (brainRef.current) {
        // Rotate the brain slowly
        brainRef.current.rotation.x += 0.002;
        brainRef.current.rotation.y += 0.003;
        
        // Animate neural nodes with pulsating effect
        neuralNodes.forEach((node, index) => {
          // Create a pulsating effect
          const pulse = Math.sin(time * 2 + index) * 0.2 + 1;
          node.scale.set(pulse, pulse, pulse);
                
          // Change emissive intensity for glowing effect
          if (node.material instanceof THREE.MeshPhongMaterial) {
            const intensity = Math.sin(time * 1.5 + index) * 0.3 + 0.5;
            node.material.emissiveIntensity = intensity;
          }
        });
              
        // Animate particles for subtle movement
        if (particlesRef.current && particlesGeometryRef.current) {
          const positions = particlesRef.current.geometry.attributes.position;
          const originalPositions = particlesGeometryRef.current.getAttribute('position').array as Float32Array;
                
          for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
                  
            // Add small oscillation to each particle
            positions.array[i3] = originalPositions[i3] + Math.sin(time * 0.5 + i) * 0.05;
            positions.array[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * 0.3 + i) * 0.05;
            positions.array[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.7 + i) * 0.05;
          }
                
          positions.needsUpdate = true;
        }
        
        // Add subtle mouse interaction
        if (cameraRef.current) {
          // Smoothly adjust camera position based on mouse movement
          cameraRef.current.position.x += (mouseRef.current.x * 2 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y += (mouseRef.current.y * 2 - cameraRef.current.position.y) * 0.05;
          
          // Ensure camera stays at appropriate distance and looks at the brain
          cameraRef.current.lookAt(0, 0, 0);
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

export default ThreeBrain;