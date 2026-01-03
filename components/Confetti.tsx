import React, { useRef, useEffect } from 'react';
import { ConfettiParticle } from '../types';

interface ConfettiProps {
  active: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: ConfettiParticle[] = [];
    // Strawberry Matcha Colors: Emeralds, Mints, Roses, and Pinks
    const colors = ['#10b981', '#34d399', '#6ee7b7', '#f43f5e', '#fb7185', '#fda4af', '#a7f3d0'];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 10 + 5, // radius
        d: Math.random() * 10 + 10, // density
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleIncremental;
        
        p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle - (i / 3)) * 15;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        // Respawn if out of bounds
        if (p.x > width + 20 || p.x < -20 || p.y > height) {
          if (active) {
            particles[i] = {
              x: Math.random() * width,
              y: -10,
              r: p.r,
              d: p.d,
              color: p.color,
              tilt: p.tilt,
              tiltAngle: p.tiltAngle,
              tiltAngleIncremental: p.tiltAngleIncremental
            };
          } else {
            // Remove particle if inactive
            particles.splice(i, 1);
          }
        }
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(draw);
      } else {
         ctx.clearRect(0, 0, width, height);
      }
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{ zIndex: 5 }}
    />
  );
};