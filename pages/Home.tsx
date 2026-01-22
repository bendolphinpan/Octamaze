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
  const [isMobile, setIsMobile] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

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
    window.addEventListener('resize', checkMobile);
    
    handleScroll();
    checkMobile();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  let card1EntryPhase = 0;
  let card1ExitPhase = 0;
  let card2Phase = 0;

  if (isMobile) {
    card1EntryPhase = easeInOutCubic(Math.max(0, Math.min(1, scrollProgress / 0.45)));
    card1ExitPhase = easeInOutCubic(Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.4)));
    card2Phase = easeInOutCubic(Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.4)));
  } else {
    const phase = easeInOutCubic(Math.max(0, Math.min(1, scrollProgress / 0.7)));
    card1EntryPhase = phase;
    card2Phase = phase;
  }

  const textRevealStart = 0.9; 
  const textOpacity = Math.max(0, Math.min(1, (scrollProgress - textRevealStart) / (1 - textRevealStart)));

  const leftCardStyle = {
    x: isMobile ? 0 : lerp(-40, 0, card1EntryPhase), 
    y: isMobile 
        ? (card1ExitPhase > 0 
            ? lerp(0, -600, card1ExitPhase) 
            : lerp(320, 0, card1EntryPhase))
        : lerp(-60, 0, card1EntryPhase),
    z: lerp(-150, 0, card1EntryPhase), 
    rotateY: isMobile ? lerp(6, 2, card1EntryPhase) : lerp(15, 8, card1EntryPhase), 
    rotateZ: isMobile ? lerp(-4, -0.5, card1EntryPhase) : lerp(-12, -2, card1EntryPhase),
    opacity: isMobile ? lerp(0.8, 1, card1EntryPhase) : lerp(0.3, 1, card1EntryPhase),
    scale: isMobile ? 0.82 : 1
  };

  const rightCardStyle = {
    x: isMobile ? 0 : lerp(40, 0, card2Phase),
    y: isMobile ? lerp(600, 0, card2Phase) : lerp(-40, 40, card2Phase), 
    z: lerp(-150, 0, card2Phase),
    rotateY: isMobile ? lerp(-6, -2, card2Phase) : lerp(-15, -8, card2Phase),
    rotateZ: isMobile ? lerp(4, 0.5, card2Phase) : lerp(12, 2, card2Phase),
    opacity: isMobile ? card2Phase : lerp(0.3, 1, card2Phase),
    scale: isMobile ? 0.82 : 1
  };

  return (
    <Layout>
      <SEO 
        title="OCTAMAZE | Enter The Unknown" 
        description="OCTAMAZE is an independent game studio crafting immersive digital universes."
        keywords="game dev, indie games, octamaze, film aesthetic"
      />
      
      <div className={`relative z-0 flex flex-col items-center pt-8 md:pt-12 pb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-sans font-bold text-stone-900 leading-[1.2] tracking-tight">
              {/* 您可以在下方的 className 中调整文字大小。例如将 text-4xl 改为 text-5xl */}
              <div className="block min-h-[1.5em] md:min-h-[1.2em] overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <DecryptionText text="We Don't Just Build Games," speed={20} revealDelay={300} />
              </div>
              <div className="block min-h-[1.5em] md:min-h-[1.2em] text-stone-600 mt-2 md:mt-0 overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <DecryptionText text="We Forge Universes." speed={50} revealDelay={1000} />
              </div>
            </h1>
          </div>
          <div className="h-12 flex items-center justify-center mt-8 w-full px-8 text-center">
            <p className="text-stone-500 text-base md:text-xl font-serif italic relative inline-flex items-center">
               Where Code Meets Chaos.
            </p>
          </div>
          <div className="mt-12 text-stone-400 opacity-20 hidden md:block">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
          </div>
      </div>

      <div ref={scrollTrackRef} className={`relative h-[600vh] w-full z-10 ${isMobile ? 'pt-40 mt-0' : '-mt-24'}`}>
        <div 
            className="sticky top-0 left-0 w-full h-screen overflow-visible flex flex-col items-center justify-center pointer-events-none"
            style={{ 
                perspective: '1200px',
                perspectiveOrigin: 'center center'
            }}
        >
          <div 
            className="absolute bottom-10 md:bottom-12 font-mono text-[9px] md:text-[10px] text-stone-400 tracking-[0.2em] uppercase pointer-events-none z-0"
            style={{ 
                opacity: textOpacity,
                transform: `translateY(${(1 - textOpacity) * 10}px)`,
                transition: 'opacity 0.2s linear'
            }}
          >
             System Locked // Observation Mode
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-center items-center md:gap-20 transform-style-3d pointer-events-auto z-10 overflow-visible">
            <div 
                className={`${isMobile ? 'absolute' : 'relative'} w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] md:w-[45%] lg:w-[420px] will-change-transform`}
                style={{ 
                    transformStyle: 'preserve-3d',
                    transform: `
                        translateX(${leftCardStyle.x}%) 
                        translateY(${leftCardStyle.y}px)
                        translateZ(${leftCardStyle.z}px)
                        rotateY(${leftCardStyle.rotateY}deg) 
                        rotateZ(${leftCardStyle.rotateZ}deg)
                        scale(${leftCardStyle.scale})
                    `,
                    opacity: leftCardStyle.opacity,
                    visibility: isMobile && leftCardStyle.y < -550 ? 'hidden' : 'visible'
                }}
            >
                <ArtifactCard 
                    number="01" 
                    artifact={HERO_GAMES[0]} 
                    className="w-full shadow-2xl" 
                />
            </div>

            <div 
                className={`${isMobile ? 'absolute' : 'relative'} w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] md:w-[45%] lg:w-[420px] will-change-transform`}
                style={{ 
                    transformStyle: 'preserve-3d',
                    transform: `
                        translateX(${rightCardStyle.x}%) 
                        translateY(${rightCardStyle.y}px) 
                        translateZ(${rightCardStyle.z}px)
                        rotateY(${rightCardStyle.rotateY}deg) 
                        rotateZ(${rightCardStyle.rotateZ}deg)
                        scale(${rightCardStyle.scale})
                    `,
                    opacity: rightCardStyle.opacity,
                    visibility: isMobile && rightCardStyle.opacity <= 0.01 ? 'hidden' : 'visible'
                }}
            >
                <ArtifactCard 
                    number="02" 
                    artifact={HERO_GAMES[1]} 
                    className="w-full shadow-2xl"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-0 bg-[#e8e6e1] pt-32 pb-24 md:pt-48 md:pb-32 border-t border-stone-200">
        <div className="max-w-3xl mx-auto text-center px-8">
          <div className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed mb-12 inline-block min-h-[4rem] flex items-center justify-center">
            <RedactedText text="Warning: The boundaries between [[reality]] and simulation are [[degrading]]." />
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" className="text-lg md:text-xl px-10 md:px-12 py-5 border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300 font-mono tracking-widest uppercase">
                Contact Us
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
};