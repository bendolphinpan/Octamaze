import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { Button } from '../components/Button';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';
import { DecryptionText } from '../components/DecryptionText';
import { RedactedText } from '../components/RedactedText';

const HERO_GAMES: GameProject[] = [
  {
    id: 'GC-25',
    title: 'Gate of Chaos',
    subtitle: 'CORE_EXP_01 // HORROR',
    year: '2025',
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
  },  
  {
    id: 'CT-25',
    title: "Cipher's Toy",
    subtitle: 'CORE_EXP_03 // STEALTH',
    year: '2026',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152523_2_1201769844404948.jpg',
    description: 'Ghost in the machine. Infiltrate [[secure networks]] using advanced neural hacking. Silence is your only ally in this high-stakes [[espionage]] simulation.'
  },
  {
    id: 'PR-26',
    title: 'Pawarallel',
    subtitle: 'CORE_EXP_04 // PUZZLE',
    year: '2026',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152524_3_1201769844409896.jpg',
    description: 'Your own voice is the key. Solve acoustic puzzles where [[sound waves]] manipulate the environment. Beware: some echoes carry [[deadly secrets]].'
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      
      if (requestRef.current) return;

      requestRef.current = requestAnimationFrame(() => {
        if (!scrollTrackRef.current) {
             requestRef.current = undefined;
             return;
        }

        const rect = scrollTrackRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const trackHeight = scrollTrackRef.current.offsetHeight;
        
        const totalScrollableDistance = trackHeight - viewportHeight;
        const scrolled = -rect.top;
        
        let progress = scrolled / totalScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        setScrollProgress(progress);
        requestRef.current = undefined;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    if (scrollTrackRef.current) {
        const rect = scrollTrackRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const trackHeight = scrollTrackRef.current.offsetHeight;
        const totalScrollableDistance = trackHeight - viewportHeight;
        const scrolled = -rect.top;
        let progress = scrolled / totalScrollableDistance;
        setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
    checkMobile();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', checkMobile);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timer);
    };
  }, []);

  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const textRevealStart = 0.9; 
  const textOpacity = Math.max(0, Math.min(1, (scrollProgress - textRevealStart) / (1 - textRevealStart)));

  // Dynamic Styles Calculation
  const getCardStyle = (index: number) => {
    if (isMobile) {
      // Mobile: One by one linear scroll
      // -------------------------------------------------------
      // [手机端滚动逻辑] / [MOBILE SCROLL LOGIC]
      // 这里的逻辑是将所有卡片排成一列长队，根据页面滚动进度整体向上移动。
      // We align cards in a long vertical line and move the whole line up based on scroll.
      // -------------------------------------------------------
      
      // 1. 定义间距：每张卡片相隔多少像素 (Spacing between cards)
      const spacing = 450; 
      const phase = easeInOutCubic(Math.max(0, Math.min(1, scrollProgress / 0.8)));
      
      // 2. 计算卡片的基准位置 (Base position on the timeline)
      // Index 0 在 0, Index 1 在 550, Index 2 在 1100...
      const basePosition = index * spacing;
      
      // 3. 计算总行程 (Total distance we need to scroll to show all cards)
      // 我们希望滚动到底部时，最后一张卡片刚好在中心或者滚走一点
      const totalTravelDistance = (HERO_GAMES.length - 0.5) * spacing;
      
      // 4. 当前滚动位置 (Current scroll offset)
      const currentScrollOffset = scrollProgress * totalTravelDistance;
      
      // 5. 最终 Y 坐标：基准位置 - 滚动位移 (Final Y: Base - Scroll)
      // 结果为 0 时，卡片在正中心。
      // 结果为 负数 时，卡片向上滚走了。
      // 结果为 正数 时，卡片还在下面等着上来。
      const yPosition = basePosition - currentScrollOffset;

      // 6. 视觉特效 (Visual Effects based on distance from center)
      const distFromCenter = Math.abs(yPosition);
      
      // 缩放：在中心时最大(1.0)，离开中心变小
      const scale = Math.max(0.85, 1 - (distFromCenter / 1500));
      
      // 透明度：距离中心太远就淡出
      const opacity = Math.max(1, 1 - (distFromCenter / 450));
      const rot_pre = [-8,5,-5,8];
      const rot_done = [-6, -2, 2, 6]; 

      return {
        x: 0,
        y: yPosition,
        rotateY: 0,
        // 添加一点轻微的旋转，随移动变化，增加动态感
        rotateZ: lerp(rot_pre[index],rot_done[index],phase), 
        scale: scale,
        opacity: opacity, 
        zIndex: 10 - index
      };
    } else {
      // Desktop: Wide Horizontal Scatter -> Overlapping Compact
      // Note: Layout is now "Grid Pile" (centered), so X is relative to center (0).
      const phase = easeInOutCubic(Math.max(0, Math.min(1, scrollProgress / 0.8)));
      
      // Scatter: Spread out horizontally (Percentage of CARD WIDTH)
      // Since cards are now stacked at 0, we push them out left (-) and right (+)
      const scatterX = [-180, -95, 95, 180]; 
      
      // Compact: Overlapping fan
      const compactX = [-150, -50, 50, 150]; 
      
      // Y Offsets: Random vertical variation relative to center
      const scatterY = [-180, 0, -100, -150]; 
      const compactY = [10, -10, 15, -15];

      // Rotations
      const scatterRot = [-8, 5, -5, 8];
      const compactRot = [-6, -2, 2, 6]; 

      return {
        x: lerp(scatterX[index], compactX[index], phase),
        y: lerp(scatterY[index], compactY[index], phase),
        rotateY: 0,
        rotateZ: lerp(scatterRot[index], compactRot[index], phase),
        scale: lerp(0.9, 1.05, phase), 
        opacity: 1, 
        zIndex: index + 10
      };
    }
  };

  return (
    <Layout>
      <SEO 
        title="OCTAMAZE | Enter The Unknown" 
        description="OCTAMAZE is an independent game studio crafting immersive digital universes."
        keywords="game dev, indie games, octamaze, film aesthetic"
      />
      
      <div className={`relative z-0 flex flex-col items-center pt-8 md:pt-12 pb-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-sans font-bold text-stone-900 leading-[1.2] tracking-tight">
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

      {/* Main Scroll Track */}
      <div ref={scrollTrackRef} className={`relative h-[600vh] w-full z-30 ${isMobile ? 'pt-0 mt-0' : '-mt-24'}`}>
        <div 
            className="sticky top-0 left-0 w-full h-screen overflow-visible flex flex-col items-center justify-center pointer-events-none"
            style={{ 
                perspective: '1200px',
                perspectiveOrigin: 'center center',
                transform: 'translate3d(0,0,0)'
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

          {/* 
            Container Refactor:
            Changed from Flex Row to Grid Pile (cols-1 rows-1).
            This allows cards to be stacked on top of each other at center,
            allowing them to be fully sized (no flex shrinking) and positioned purely by transforms.
          */}
          <div className="relative w-full max-w-[95rem] mx-auto px-4 md:px-8 grid grid-cols-1 grid-rows-1 place-items-center pointer-events-auto z-10">
            {HERO_GAMES.map((game, index) => {
                const style = getCardStyle(index);
                return (
                    <div 
                        key={game.id}
                        // -------------------------------------------------------
                        // [CARD WIDTH CONFIGURATION]
                        // Adaptive width based on screen width coefficients.
                        // Mobile: 75% of screen width (w-[75vw])
                        // Tablet: 45% of screen width (w-[45vw])
                        // Desktop: 25% of screen width (w-[25vw])
                        // -------------------------------------------------------
                        className="col-start-1 row-start-1 w-[75vw] md:w-[23vw] lg:w-[23vw] transition-transform duration-75 ease-out group hover:!z-[100]"
                        style={{ 
                            transform: `
                                translateX(${style.x}%) 
                                translateY(${style.y}px)
                                rotateY(${style.rotateY}deg) 
                                rotateZ(${style.rotateZ}deg)
                                scale(${style.scale})
                            `,
                            opacity: style.opacity,
                            zIndex: style.zIndex,
                            backfaceVisibility: 'visible'
                        }}
                    >
                        <ArtifactCard 
                            number={`0${index + 1}`} 
                            artifact={game} 
                        />
                    </div>
                );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-[#e8e6e1] pt-0 pb-10 md:pt-0 md:pb-10 border-t border-stone-200">
        <div className="max-w-3xl mx-auto text-center px-8">
          <div className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed mb-12 inline-block min-h-[4rem] flex items-center justify-center">
            <RedactedText text="Warning: The boundaries between [[reality]] and simulation are [[degrading]]." />
          </div>
          
          <div className="flex justify-center">
            <Button 
                onClick={() => navigate('/about')}
                variant="outline" 
                className="text-lg md:text-xl px-10 md:px-12 py-5 border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300 font-mono tracking-widest uppercase"
            >
                Contact Us
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
};