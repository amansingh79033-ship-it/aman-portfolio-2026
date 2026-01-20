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
  const isHoveredRef = useRef(false);

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
    
    // Touch event handlers for mobile interaction
    const handleTouchStart = () => {
      isHoveredRef.current = true;
    };
    
    const handleTouchEnd = () => {
      isHoveredRef.current = false;
    };
    
    // Mouse enter and leave handlers for hover effects
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };
    
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
      // Add touch event listeners for mobile devices
      containerRef.current.addEventListener('touchstart', handleTouchStart);
      containerRef.current.addEventListener('touchend', handleTouchEnd);
    }

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Get time for animations
      const time = Date.now() * 0.001;
      
      if (brainRef.current) {
        // Adjust rotation speed based on hover state
        const rotationSpeed = isHoveredRef.current ? 0.005 : 0.002;
        const rotationSpeedY = isHoveredRef.current ? 0.007 : 0.003;
        
        // Rotate the brain with enhanced effect when hovered
        brainRef.current.rotation.x += rotationSpeed;
        brainRef.current.rotation.y += rotationSpeedY;
        
        // Enhanced neural node animation when hovered
        neuralNodes.forEach((node, index) => {
          // Create a pulsating effect
          const pulseBase = isHoveredRef.current ? 0.3 : 0.2;
          const pulse = Math.sin(time * (isHoveredRef.current ? 3 : 2) + index) * pulseBase + 1;
          node.scale.set(pulse, pulse, pulse);
                
          // Change emissive intensity for glowing effect
          if (node.material instanceof THREE.MeshPhongMaterial) {
            const intensityBase = isHoveredRef.current ? 0.5 : 0.3;
            const intensity = Math.sin(time * (isHoveredRef.current ? 2 : 1.5) + index) * intensityBase + (isHoveredRef.current ? 0.7 : 0.5);
            node.material.emissiveIntensity = intensity;
          }
          
          // Add subtle positional animation when hovered
          if (isHoveredRef.current) {
            const offset = Math.sin(time * 2 + index) * 0.02;
            node.position.x += offset * 0.1;
            node.position.y += offset * 0.1;
            node.position.z += offset * 0.1;
          }
        });
              
        // Enhanced particle animation when hovered
        if (particlesRef.current && particlesGeometryRef.current) {
          const positions = particlesRef.current.geometry.attributes.position;
          const originalPositions = particlesGeometryRef.current.getAttribute('position').array as Float32Array;
                
          for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
                  
            // Add small oscillation to each particle
            const particleSpeed = isHoveredRef.current ? 0.1 : 0.05;
            positions.array[i3] = originalPositions[i3] + Math.sin(time * (isHoveredRef.current ? 1 : 0.5) + i) * particleSpeed;
            positions.array[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * (isHoveredRef.current ? 0.6 : 0.3) + i) * particleSpeed;
            positions.array[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * (isHoveredRef.current ? 1.4 : 0.7) + i) * particleSpeed;
          }
                
          positions.needsUpdate = true;
        }
        
        // Enhanced mouse interaction when hovered
        if (cameraRef.current) {
          const interactionStrength = isHoveredRef.current ? 0.1 : 0.05;
          const cameraDistance = isHoveredRef.current ? 3 : 4;
          
          // Smoothly adjust camera position based on mouse movement
          cameraRef.current.position.x += (mouseRef.current.x * (isHoveredRef.current ? 3 : 2) - cameraRef.current.position.x) * interactionStrength;
          cameraRef.current.position.y += (mouseRef.current.y * (isHoveredRef.current ? 3 : 2) - cameraRef.current.position.y) * interactionStrength;
          
          // Adjust camera distance when hovered
          if (cameraRef.current.position.z > cameraDistance && !isHoveredRef.current) {
            cameraRef.current.position.z -= 0.05;
          } else if (cameraRef.current.position.z < cameraDistance && isHoveredRef.current) {
            cameraRef.current.position.z += 0.05;
          }
          
          // Ensure camera stays at appropriate distance and looks at the brain
          cameraRef.current.lookAt(0, 0, 0);
        }
        
        // Add subtle scaling effect when hovered
        if (brainRef.current && isHoveredRef.current) {
          brainRef.current.scale.x = 1 + Math.sin(time * 2) * 0.05;
          brainRef.current.scale.y = 1 + Math.cos(time * 2) * 0.05;
          brainRef.current.scale.z = 1 + Math.sin(time * 2) * 0.05;
        } else if (brainRef.current) {
          brainRef.current.scale.set(1, 1, 1);
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
      
      // Remove mouse and touch listeners
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
      }
      
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