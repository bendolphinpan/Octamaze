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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !shineRef.current) return;

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
    const transformString = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    containerRef.current.style.transform = transformString;

    // Dynamic Shadow Logic
    // Reduced multiplier from 15 to 8 for less aggressive movement
    const shadowX = -normX * 8;
    const shadowY = -normY * 8;
    // Softer shadow: reduced opacity (0.25 -> 0.15) and blur (30px -> 20px)
    const boxShadowString = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.15)`;
    containerRef.current.style.boxShadow = boxShadowString;

    // Update Shine Position
    // We update the background gradient position directly via style
    shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
    shineRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !shineRef.current) return;
    
    isHovering.current = false;
    
    // Switch to slower transition for the reset
    containerRef.current.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out';
    
    // Reset Transform
    containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    // Reset Shadow (remove inline style to revert to CSS class or default)
    containerRef.current.style.boxShadow = '';
    
    // Reset Shine
    shineRef.current.style.opacity = '0';
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
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