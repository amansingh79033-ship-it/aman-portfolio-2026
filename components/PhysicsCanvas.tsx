import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}

const PhysicsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [particleCount, setParticleCount] = useState<number>(30);

  // Initialize particles
  const initParticles = (count: number) => {
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#22d3ee', '#34d399', '#a78bfa', '#f87171', '#fbbf24'];
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 15 + 10;
      const canvas = canvasRef.current;
      if (!canvas) continue;
      
      particles.push({
        id: i,
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        mass: radius * 0.1
      });
    }
    
    particlesRef.current = particles;
  };

  // Handle collisions between particles
  const handleCollisions = () => {
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Collision detected
        if (distance < p1.radius + p2.radius) {
          // Calculate collision normal
          const nx = dx / distance;
          const ny = dy / distance;

          // Relative velocity
          const dvx = p2.vx - p1.vx;
          const dvy = p2.vy - p1.vy;

          // Velocity along normal
          const velocityAlongNormal = dvx * nx + dvy * ny;

          // Only collide if moving towards each other
          if (velocityAlongNormal > 0) continue;

          // Impulse scalar
          const impulse = 2 * velocityAlongNormal / (p1.mass + p2.mass);

          // Apply impulse
          p1.vx += impulse * p2.mass * nx;
          p1.vy += impulse * p2.mass * ny;
          p2.vx -= impulse * p1.mass * nx;
          p2.vy -= impulse * p1.mass * ny;

          // Position correction to prevent sticking
          const overlap = (p1.radius + p2.radius - distance) / 2;
          p1.x -= overlap * nx;
          p1.y -= overlap * ny;
          p2.x += overlap * nx;
          p2.y += overlap * ny;
        }
      }

      // Boundary collision - walls repel particles
      const p = particles[i];
      if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx = -p.vx * 0.9; // Dampening effect
      } else if (p.x + p.radius > canvas.width) {
        p.x = canvas.width - p.radius;
        p.vx = -p.vx * 0.9;
      }

      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy = -p.vy * 0.9;
      } else if (p.y + p.radius > canvas.height) {
        p.y = canvas.height - p.radius;
        p.vy = -p.vy * 0.9;
      }
    }
  };

  // Update particle positions
  const updateParticles = () => {
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Apply slight friction/drag to make movement more natural
      p.vx *= 0.999;
      p.vy *= 0.999;
    }
  };

  // Draw particles
  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with a semi-transparent overlay for motion trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const p of particlesRef.current) {
      // Draw particle with gradient
      const gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.radius
      );
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, `${p.color}80`); // Semi-transparent edge
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a subtle glow
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  };

  // Animation loop
  const animate = () => {
    updateParticles();
    handleCollisions();
    drawParticles();
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Handle window resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Reinitialize particles to fit new canvas size
    initParticles(particleCount);
  };

  // Handle mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Apply force to nearby particles
    for (const p of particlesRef.current) {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) { // Influence radius
        const force = (100 - distance) / 100;
        const angle = Math.atan2(dy, dx);
        
        p.vx += Math.cos(angle) * force * 0.5;
        p.vy += Math.sin(angle) * force * 0.5;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Initialize particles
    initParticles(particleCount);

    // Start animation
    animate();

    // Set up event listeners
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full rounded-xl cursor-pointer"
        style={{ background: 'radial-gradient(ellipse at center, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)' }}
      />
      
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => setParticleCount(prev => Math.min(100, prev + 5))}
          className="px-3 py-1 bg-sky-600/80 hover:bg-sky-500 text-white text-sm rounded-lg transition-colors"
        >
          + Particles
        </button>
        <button 
          onClick={() => setParticleCount(prev => Math.max(5, prev - 5))}
          className="px-3 py-1 bg-slate-700/80 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
        >
          - Particles
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 text-xs text-slate-400 bg-black/30 px-3 py-1.5 rounded-lg">
        Move mouse to influence particles • Collisions & Repulsion Physics
      </div>
    </div>
  );
};

export default PhysicsCanvas;