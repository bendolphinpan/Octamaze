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
  
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const trackHeight = scrollTrackRef.current.offsetHeight;
      
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

  const FLY_IN_DURATION = 0.7; 
  
  let animationPhase = 0; 
  if (scrollProgress < FLY_IN_DURATION) {
      animationPhase = scrollProgress / FLY_IN_DURATION;
  } else {
      animationPhase = 1;
  }

  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  const t_pos = easeInOutCubic(animationPhase);
  const t_rot = easeInOutCubic(animationPhase); 

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const currentOpacity = lerp(0.3, 1, t_pos);
  const currentGrayscale = lerp(100, 0, t_pos);

  const textRevealStart = 0.85; 
  const textOpacity = Math.max(0, Math.min(1, (animationPhase - textRevealStart) / (1 - textRevealStart)));

  const leftCard = {
    x: lerp(-40, 0, t_pos), 
    y: lerp(-60, 0, t_pos),
    z: lerp(-150, 0, t_pos), 
    rotateY: lerp(15, 8, t_rot), 
    rotateZ: lerp(-12, -2, t_rot), 
  };

  const rightCard = {
    x: lerp(40, 0, t_pos),
    y: lerp(-40, 40, t_pos), 
    z: lerp(-150, 0, t_pos),
    rotateY: lerp(-15, -8, t_rot),
    rotateZ: lerp(12, 2, t_rot),
  };

  return (
    <Layout>
      <SEO 
        title="OCTAMAZE | Enter The Unknown" 
        description="OCTAMAZE is an independent game studio."
        keywords="game dev, indie games, octamaze"
      />
      
      {/* 
         HERO SECTION 
         Improved layout stability with fixed heights and white-space control
      */}
      <div className={`relative z-0 flex flex-col items-center pt-8 md:pt-10 pb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full flex flex-col items-center justify-center min-h-[160px] md:min-h-[220px] px-4 overflow-hidden">
            <h1 className="font-sans font-bold text-[8.5vw] sm:text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1] tracking-tight text-center">
              {/* Added whitespace-nowrap and fixed line-height to prevent jumping */}
              <div className="block min-h-[1.2em] flex items-center justify-center whitespace-nowrap overflow-visible">
                  <DecryptionText text="We Don't Just Build Games," speed={20} revealDelay={300} />
              </div>
              <div className="block min-h-[1.2em] flex items-center justify-center text-stone-600 mt-1 md:mt-0 whitespace-nowrap overflow-visible">
                  <DecryptionText text="We Forge Universes." speed={50} revealDelay={1000} />
              </div>
            </h1>
          </div>
          <div className="h-12 flex items-center justify-center mt-6 w-full">
            <p className="text-stone-500 text-lg md:text-xl font-serif italic relative inline-flex items-center">
               Where Code Meets Chaos.
            </p>
          </div>
          <div className="mt-12 text-stone-400 opacity-30">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </div>
      </div>

      {/* 
         SCROLL ANIMATION TRACK 
      */}
      <div ref={scrollTrackRef} className="relative h-[400vh] w-full z-10 -mt-24">
        <div 
            className="sticky top-0 left-0 w-full h-screen overflow-visible flex flex-col items-center justify-center pointer-events-none"
            style={{ 
                perspective: '1200px',
                perspectiveOrigin: 'center center'
            }}
        >
          {/* 
              Status Indicator (Background Layer)
              Placed here with z-0 to ensure it is visually behind the cards.
          */}
          <div 
            className="absolute bottom-12 font-mono text-[10px] text-stone-400 tracking-[0.2em] uppercase pointer-events-none z-0"
            style={{ 
                opacity: textOpacity,
                transform: `translateY(${(1 - textOpacity) * 10}px)`,
                transition: 'opacity 0.2s linear'
            }}
          >
             System Locked // Observation Mode
          </div>

          {/* Cards Container (Foreground Layer) */}
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 transform-style-3d pointer-events-auto z-10">
            {/* Left Card */}
            <div 
                className="w-full max-w-[380px] md:w-[45%] lg:w-[420px] will-change-transform"
                style={{ 
                    transformStyle: 'preserve-3d',
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
                className="w-full max-w-[380px] md:w-[45%] lg:w-[420px] will-change-transform"
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
        </div>
      </div>

      {/* 
         CTA Section 
      */}
      <div className="relative z-20 bg-[#e8e6e1] pt-48 pb-34">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="font-serif text-2xl text-stone-600 leading-relaxed mb-10 inline-block min-h-[4rem] flex items-center justify-center">
            <RedactedText text="Warning: The boundaries between [[reality]] and simulation are [[degrading]]." />
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="text-xl px-8 py-5 border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300 font-mono tracking-widest uppercase">
                Contact Us
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
};