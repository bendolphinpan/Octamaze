import React, { useRef, useState, MouseEvent } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [boxShadow, setBoxShadow] = useState<string | undefined>(undefined);
  const [shineOpacity, setShineOpacity] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
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

    // Reduced scale from 1.02 to 1.01 for subtler effect
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
    
    // Dynamic Shadow Logic
    // Reduced multiplier from 15 to 8 for less aggressive movement
    const shadowX = -normX * 8;
    const shadowY = -normY * 8;
    // Softer shadow: reduced opacity (0.25 -> 0.15) and blur (30px -> 20px)
    setBoxShadow(`${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.15)`);

    // Update Shine Position
    setShinePos({ x, y });
    setShineOpacity(1);
    
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShineOpacity(0);
    setBoxShadow(undefined); // Revert to CSS defined shadow
  };

  return (
    <div 
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: transform,
        boxShadow: isHovering && boxShadow ? boxShadow : undefined,
        transition: isHovering 
            ? 'transform 0.1s ease-out, box-shadow 0.1s ease-out' 
            : 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative z-10 h-full transform-style-preserve-3d pointer-events-none">
         {children}
      </div>
      
      {/* Shine/Glare Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
        style={{
            background: `radial-gradient(circle at ${shinePos.x}px ${shinePos.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
            opacity: shineOpacity,
            transition: 'opacity 0.3s ease-out',
            mixBlendMode: 'overlay' 
        }}
      />
    </div>
  );
};