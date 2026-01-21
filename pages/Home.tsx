import React, { useEffect, useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { Button } from '../components/Button';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';
import { DecryptionText } from '../components/DecryptionText';
import { RedactedText } from '../components/RedactedText';

const HERO_GAMES: GameProject[] = [
  {
    id: 'GC-24',
    title: 'Gate of Chaos',
    subtitle: 'CORE_EXP_01 // HORROR',
    year: '2024',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-head21769006869126.jpg',
    description: 'A procedural descent into [[madness]]. Every playthrough [[fractures reality]] differently, challenging players to adapt to shifting laws of physics and ancient eldritch horrors.'
  },
  {
    id: 'GM-25',
    title: 'God Mode',
    subtitle: 'CORE_EXP_02 // SIM',
    year: '2025',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-final%20set%20up1769010345825.png',
    description: 'Total control. [[Zero consequences]]. Reshape terrain, rewrite DNA, and observe civilization rise or crumble under your [[absolute will]] in this hyper-realistic simulation.'
  }
];

export const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref for the tall container
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const trackHeight = scrollTrackRef.current.offsetHeight;
      
      // Calculate progress relative to the track
      const totalScrollableDistance = trackHeight - viewportHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / totalScrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // --- Animation Phases ---
  
  // 0.00 -> 0.40: Fly In 
  // 0.40 -> 1.00: Locked
  const FLY_IN_DURATION = 0.40; 
  
  let animationPhase = 0; 
  
  if (scrollProgress < FLY_IN_DURATION) {
      animationPhase = scrollProgress / FLY_IN_DURATION;
  } else {
      animationPhase = 1;
  }

  // --- Easing Functions ---
  
  // Ease In Out Cubic: Slow start, fast middle, slow end.
  // This provides the "缓起缓停" (ease-in-out) effect.
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  const t_pos = easeInOutCubic(animationPhase);
  const t_rot = easeInOutCubic(animationPhase); 

  // --- Physics & Transform Calculations ---

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Opacity & Grayscale
  const currentOpacity = lerp(0.6, 1, t_pos);
  const currentGrayscale = lerp(100, 0, t_pos);

  // Text Appearance
  const textRevealStart = 0.8; 
  const textOpacity = Math.max(0, Math.min(1, (animationPhase - textRevealStart) / (1 - textRevealStart)));

  // --- LEFT CARD PHYSICS ---
  // Reduced angles to avoid "compressed/squashed" look in standby.
  const leftCard = {
    x: lerp(-60, 0, t_pos), 
    y: lerp(-100, 0, t_pos),
    // Z: Reduced depth start (-300 -> -120) so it doesn't look too small/distant
    z: lerp(-120, 0, t_pos), 
    
    // Rotate Y: Reduced from 65 -> 40 to avoid extreme foreshortening (thinness)
    rotateY: lerp(0, 10, t_rot), 
    
    // Rotate Z: Reduced slightly
    rotateZ: lerp(-10, -2, t_rot), 
  };

  // --- RIGHT CARD PHYSICS ---
  const rightCard = {
    x: lerp(60, 0, t_pos),
    y: lerp(-80, 30, t_pos), 
    z: lerp(-120, 0, t_pos),
    
    rotateY: lerp(0, -10, t_rot),
    rotateZ: lerp(10, 2, t_rot),
  };

  return (
    <Layout>
      <SEO 
        title="OCTAMAZE | Enter The Unknown" 
        description="OCTAMAZE is an independent game studio. We hide secrets in code."
        keywords="game dev, indie games, octamaze, mystery, puzzle"
      />
      
      {/* HERO SECTION */}
      <div className={`relative z-10 flex flex-col items-center pt-20 md:pt-32 pb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full flex flex-col items-center justify-center min-h-[160px] md:min-h-[260px] px-4">
            <h1 className="font-sans font-bold text-4xl md:text-7xl lg:text-8xl text-stone-900 leading-tight md:leading-tight tracking-tight text-center">
              <div className="block min-h-[1.2em] flex items-end justify-center">
                  <DecryptionText text="We Don't Just Build Games," speed={20} revealDelay={300} />
              </div>
              <div className="block min-h-[1.2em] flex items-start justify-center text-stone-600 mt-2 md:mt-0">
                  <DecryptionText text="We Forge Universes." speed={50} revealDelay={1000} />
              </div>
            </h1>
          </div>
          <div className="h-20 flex items-center justify-center mt-4 w-full">
            <p className="text-stone-500 text-xl md:text-2xl font-serif italic relative inline-flex items-center">
               <span className="font-mono text-xs absolute -left-28 top-1/2 -translate-y-1/2 opacity-50 hidden md:block w-24 text-right">LOG: 0824</span>
               Where Code Meets Chaos.
            </p>
          </div>
          
          <div className="absolute bottom-4 animate-bounce text-stone-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </div>
      </div>

      {/* 
         SCROLL ANIMATION TRACK 
      */}
      <div ref={scrollTrackRef} className="-mt-24 relative h-[420vh] w-full z-20">
        
        {/* 
           STICKY VIEWPORT
        */}
        <div 
            className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#ebeae8]"
            style={{ 
                perspective: '1000px',
                perspectiveOrigin: 'center center'
            }}
        >
          
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 transform-style-3d">
            
            {/* Left Card */}
            <div 
                className="w-full max-w-[420px] md:w-[45%] will-change-transform"
                style={{ 
                    transformStyle: 'preserve-3d',
                    // Reordered: RotateY first (orientation), then RotateZ (tilt) for cleaner physics
                    transform: `
                        translateX(${leftCard.x}%) 
                        translateY(${leftCard.y}px)
                        translateZ(${leftCard.z}px)
                        rotateY(${leftCard.rotateY}deg) 
                        rotateZ(${leftCard.rotateZ}deg) 
                    `,
                    opacity: currentOpacity,
                    filter: `grayscale(${currentGrayscale}%)` 
                }}
            >
                <ArtifactCard 
                    number="01" 
                    artifact={HERO_GAMES[0]} 
                    className="w-full" 
                />
            </div>

            {/* Right Card */}
            <div 
                className="w-full max-w-[420px] md:w-[45%] will-change-transform"
                style={{ 
                    transformStyle: 'preserve-3d',
                    transform: `
                        translateX(${rightCard.x}%) 
                        translateY(${rightCard.y}px) 
                        translateZ(${rightCard.z}px)
                        rotateY(${rightCard.rotateY}deg) 
                        rotateZ(${rightCard.rotateZ}deg) 
                    `,
                    opacity: currentOpacity,
                    filter: `grayscale(${currentGrayscale}%)`
                }}
            >
                <ArtifactCard 
                    number="02" 
                    artifact={HERO_GAMES[1]} 
                    className="w-full"
                />
            </div>

          </div>
          
          {/* Status Indicator */}
          <div 
            className="absolute bottom-12 font-mono text-xs text-stone-400 tracking-[0.2em] uppercase pointer-events-none will-change-transform"
            style={{ 
                opacity: textOpacity,
                transform: `translateY(${(1 - textOpacity) * 10}px)`,
                transition: 'opacity 0.1s linear'
            }}
          >
             System Locked // Observation Mode
          </div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-[#ebeae8] pt-32 pb-48">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="font-serif text-2xl text-stone-600 leading-relaxed mb-10 inline-block min-h-[4rem] flex items-center justify-center">
            <RedactedText text="Warning: The boundaries between [[reality]] and simulation are [[degrading]]." />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="text-xl px-12 py-5 border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300 font-mono tracking-widest uppercase">
                Initialize_Sequence
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
};