import React, { forwardRef } from 'react';
import { ArtifactCardProps } from '../types';
import { RedactedText } from './RedactedText';
import { ThreeDTilt } from './ThreeDTilt';

// Using forwardRef to allow the parent (Portfolio page) to measure this element's position
export const ArtifactCard = forwardRef<HTMLDivElement, ArtifactCardProps>(({ 
  artifact, 
  rotation = 'rotate-0',
  className = '',
  // Allow passing style for animations (e.g. hiding the card while modal is open)
  ...props
}, ref) => {
  // Adjusted for "Film Stock" feel: Higher frequency (1.2), lower opacity
  const filmGrain = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E";

  return (
    <div 
      ref={ref}
      className={`group relative ${rotation} ${className}`}
      style={{ containerType: 'inline-size', ...props }}
    >
      {/* 
        ThreeDTilt Container
        - Uses a slightly warmer off-white background to match the movie feel
        - [SHADOW CONFIGURATION]
          The class 'shadow-[...]' controls the resting state shadow.
          The last value inside rgba(..., 0.2) is the OPACITY.
      */}
      <ThreeDTilt 
        intensity={10} 
        className="rounded-[2px] bg-[#fdfcf8] shadow-[0_20px_30px_-10px_rgba(0,0,0,0.5)] w-full aspect-[2/3] border border-stone-200/60 flex flex-col h-full overflow-hidden relative"
      >
          {/* Vignette Overlay (Inner Shadow) for aged photo look */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_-20px_rgba(100,90,80,0.4)] rounded-[2px]" />

          {/* Film Grain Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.2]"
            style={{ backgroundImage: `url("${filmGrain}")` }}
          />
          
          {/* Content Wrapper (z-10 to sit above texture) */}
          <div className="relative z-10 flex flex-col h-full">
            
            {/* Top Header Area */}
            {/* Adjusted height slightly to be more compact */}
            <div className="h-[6%] flex justify-between items-center px-[6%] flex-shrink-0 pt-[2%]">
              <span className="font-mono text-[3.5cqw] font-normal text-stone-500/80 tracking-tighter mix-blend-multiply">
                {artifact.id}
              </span>
              <span className="font-mono text-[3.5cqw] font-normal text-stone-500/80 mix-blend-multiply">
                {artifact.year}
              </span>
            </div>

            {/* Middle Section: Image */}
            {/* 
               Added extra padding/border effect to look like a mounted photo 
            */}
            <div className="mx-[5%] mt-0 aspect-square relative overflow-hidden bg-stone-200 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] flex-shrink-0 border border-stone-900/5">
                <img 
                    src={artifact.imageUrl} 
                    alt={artifact.title}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-110 mix-blend-multiply"
                />
                {/* Gloss/Reflection Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/10 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Bottom Section: Text */}
            <div className="flex-grow flex flex-col text-left overflow-hidden px-[6%] py-[5%]">
                {/* Title - slightly smaller text to prevent truncation on smaller cards */}
                <h3 className="font-sans font-bold text-stone-800/90 text-[8cqw] leading-[0.9] mb-[1cqw] truncate mix-blend-multiply mt-1">
                    {artifact.title}
                </h3>
                
                {/* Subtitle */}
                <div className="font-mono text-[2.5cqw] font-bold text-stone-500 uppercase tracking-[0.15em] mb-[3cqw] mix-blend-multiply">
                    {artifact.subtitle}
                </div>

                {/* Description - Optimized line-clamp and line-height */}
                <div className="mt-auto relative">
                  <p className="font-serif text-stone-600/90 text-[4cqw] italic leading-[1.2] line-clamp-4 mix-blend-multiply">
                    <RedactedText text={artifact.description} />
                  </p>
                </div>
            </div>
          </div>

      </ThreeDTilt>
    </div>
  );
});

ArtifactCard.displayName = 'ArtifactCard';