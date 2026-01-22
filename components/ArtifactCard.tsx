import React from 'react';
import { ArtifactCardProps } from '../types';
import { RedactedText } from './RedactedText';
import { ThreeDTilt } from './ThreeDTilt';

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ 
  // number prop is available in interface but not used in visual design currently
  artifact, 
  rotation = 'rotate-0',
  className = ''
}) => {
  const headerHeight = "h-5 md:h-6";
  
  // Adjusted for "Film Stock" feel: Higher frequency (1.2), lower opacity
  const filmGrain = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E";

  return (
    <div className={`group relative ${rotation} ${className}`}>
      {/* 
        ThreeDTilt Container
        - Uses a slightly warmer off-white background to match the movie feel
      */}
      <ThreeDTilt 
        intensity={10} 
        className="rounded-[2px] bg-[#fdfcf8] shadow-xl w-full aspect-[2/3] border border-stone-200/60 flex flex-col h-full overflow-hidden relative"
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
            <div className={`${headerHeight} flex justify-between items-center px-4 md:px-5 flex-shrink-0 pt-2`}>
              <span className="font-mono text-[12px] font-normal text-stone-500/80 tracking-tighter mix-blend-multiply">
                {artifact.id}
              </span>
              <span className="font-mono text-[12px] font-normal text-stone-500/80 mix-blend-multiply">
                {artifact.year}
              </span>
            </div>

            {/* Middle Section: Image */}
            {/* 
               Added extra padding/border effect to look like a mounted photo 
            */}
            <div className="mx-4 md:mx-5 mt-1 aspect-square relative overflow-hidden bg-stone-200 shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] flex-shrink-0 border border-stone-900/5">
                <img 
                    src={artifact.imageUrl} 
                    alt={artifact.title}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-110 mix-blend-multiply"
                />
                {/* Gloss/Reflection Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/10 to-transparent pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Bottom Section: Text */}
            <div className="flex-grow p-4 md:p-5 pt-4 flex flex-col text-left overflow-hidden">
                {/* Title */}
                <h3 className="font-sans font-bold text-stone-800/90 text-lg md:text-xl lg:text-2xl leading-none mb-1 truncate mix-blend-multiply">
                    {artifact.title}
                </h3>
                
                {/* Subtitle */}
                <div className="font-mono text-[9px] font-bold text-stone-500 uppercase tracking-[0.15em] mb-2 mix-blend-multiply">
                    {artifact.subtitle}
                </div>

                {/* Description */}
                <div className="mt-auto">
                  <p className="font-serif text-stone-600/90 text-xs md:text-[13px] italic leading-tight line-clamp-4 md:line-clamp-5 mix-blend-multiply">
                    <RedactedText text={artifact.description} />
                  </p>
                </div>
            </div>
          </div>

      </ThreeDTilt>
    </div>
  );
};