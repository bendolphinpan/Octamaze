import React, { useRef, MouseEvent } from 'react';

interface ThreeDTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const ThreeDTilt: React.FC<ThreeDTiltProps> = ({ 
  children, 
  className = '',
  intensity = 20 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  
  // We use refs to track hovering state to avoid re-renders
  const isHovering = useRef(false);

  // Added MouseEnter to trigger the scale effect immediately upon entry
  const handleMouseEnter = () => {
    isHovering.current = true;
    if (containerRef.current && shineRef.current) {
        // Set a quick transition for the initial "pop"
        // transform 0.2s is fast enough to feel responsive but smooth
        containerRef.current.style.transition = 'transform 0.2s ease-out, box-shadow 0.2s ease-out';
        shineRef.current.style.transition = 'opacity 0.3s ease-out';
        
        // Immediately apply scale 1.05. Rotations stay at 0 until mouse moves.
        // FIXED: Consistent 1.05 scale
        containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.05, 1.05, 1.05)';
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !shineRef.current) return;

    // If for some reason MouseEnter didn't fire (edge cases), ensure state is set
    if (!isHovering.current) {
        isHovering.current = true;
        containerRef.current.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
        shineRef.current.style.transition = 'opacity 0.3s ease-out';
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalized coordinates (-1 to 1)
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // Attraction Logic (Magnet):
    const rotateX = normY * intensity;
    const rotateY = normX * -intensity;

    // Direct DOM manipulation for performance (bypassing React render cycle)
    // IMPORTANT: Maintained scale3d(1.05, 1.05, 1.05) to keep the zoom effect active while tilting
    const transformString = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    containerRef.current.style.transform = transformString;

    // Dynamic Shadow Logic
    const shadowX = -normX * 5;
    const shadowY = -normY * 5;
    const boxShadowString = `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.5)`;
    containerRef.current.style.boxShadow = boxShadowString;

    // Update Shine Position
    shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
    shineRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !shineRef.current) return;
    
    isHovering.current = false;
    
    // Switch to slower transition for the reset
    containerRef.current.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
    
    // Reset Transform - Scale returns to 1
    containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    // Reset Shadow
    containerRef.current.style.boxShadow = '';
    
    // Reset Shine
    shineRef.current.style.opacity = '0';
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        // Set initial transform to prevent layout shift
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      }}
    >
      <div className="relative z-10 h-full transform-style-preserve-3d pointer-events-none">
         {children}
      </div>
      
      {/* Shine/Glare Overlay */}
      <div 
        ref={shineRef}
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
        style={{
            // Initial state
            opacity: 0,
            mixBlendMode: 'overlay',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)'
        }}
      />
    </div>
  );
};