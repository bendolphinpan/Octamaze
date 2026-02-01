import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';
import { RedactedText } from '../components/RedactedText';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// ============================================================================
// CONFIGURATION: MODAL DIMENSIONS
// 您可以在这里调节展开后卡片的大小
// ============================================================================
const MODAL_CONFIG = {
  // 宽度占屏幕宽度的百分比 (0.1 - 1.0) | Width as percentage of viewport width
  widthRatio: 0.75, 
  // 高度占屏幕高度的百分比 (0.1 - 1.0) | Height as percentage of viewport height
  heightRatio: 0.9,
  // 最大像素宽度限制 | Max width in pixels
  maxWidthPx: 800,
  // 最大像素高度限制 | Max height in pixels
  maxHeightPx: 2400,
};

// Data with Gallery Images
const GAMES: GameProject[] = [
  {
    id: 'GC-25',
    title: 'Gate of Chaos',
    subtitle: 'CORE_EXP_01 // HORROR',
    year: '2025',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-head21769006869126.jpg',
    gallery: [
      'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-head21769006869126.jpg',
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1200',
      'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1200'
    ],
    description: 'A procedural descent into [[madness]]. Every playthrough [[fractures reality]] differently, challenging players to adapt to shifting laws of physics and ancient eldritch horrors. The game utilizes non-euclidean geometry to create a sense of unease, ensuring that no two corridors ever lead to the same destination twice.'
  },
  {
    id: 'GM-25',
    title: 'God Mode',
    subtitle: 'CORE_EXP_02 // SIM',
    year: '2025',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-final%20set%20up1769010345825.png',
    gallery: [
       'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-final%20set%20up1769010345825.png',
       'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'
    ],
    description: 'Total control. [[Zero consequences]]. Reshape terrain, rewrite DNA, and observe civilization rise or crumble under your [[absolute will]] in this hyper-realistic simulation. From the microscopic manipulation of cellular structures to the macroscopic shifting of tectonic plates, you are the architect of existence.'
  },  
  {
    id: 'CT-25',
    title: "Cipher's Toy",
    subtitle: 'CORE_EXP_03 // STEALTH',
    year: '2026',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152523_2_1201769844404948.jpg',
    gallery: [
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152523_2_1201769844404948.jpg',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200'
    ],
    description: 'Ghost in the machine. Infiltrate [[secure networks]] using advanced neural hacking. Silence is your only ally in this high-stakes [[espionage]] simulation. Navigate complex digital landscapes visualized as physical spaces, breaking encryptions with logic and reflex.'
  },
  {
    id: 'PR-26',
    title: 'Pawarallel',
    subtitle: 'CORE_EXP_04 // PUZZLE',
    year: '2026',
    imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152524_3_1201769844409896.jpg',
    gallery: [
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152524_3_1201769844409896.jpg',
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200'
    ],
    description: 'Your own voice is the key. Solve acoustic puzzles where [[sound waves]] manipulate the environment. Beware: some echoes carry [[deadly secrets]]. Speak softly to build bridges, scream to shatter barriers, and whisper to reveal hidden paths.'
  }
];

const filmGrain = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E";

export const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Animation State
  // Added 'rotation' to track the card's tilt
  const [transformValues, setTransformValues] = useState({ x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 });
  const [isExpanded, setIsExpanded] = useState(false); 
  const [showContent, setShowContent] = useState(false); 
  const [isAnimating, setIsAnimating] = useState(false);

  // Map to store refs of all cards to measure them
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const handleCardClick = (project: GameProject, index: number) => {
    if (isAnimating) return;

    const el = cardRefs.current.get(project.id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // 1. Calculate the FINAL Dimensions based on MODAL_CONFIG
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    
    const targetW = Math.min(viewportW * MODAL_CONFIG.widthRatio, MODAL_CONFIG.maxWidthPx);
    const targetH = Math.min(viewportH * MODAL_CONFIG.heightRatio, MODAL_CONFIG.maxHeightPx);
    
    // 2. Calculate Centers for Alignment
    // We align the modal's center to the card's center to ensure rotation pivots match.
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const modalCenterX = viewportW / 2;
    const modalCenterY = viewportH / 2;

    // 3. Calculate Transform Deltas
    // Distance from Center of Screen (Modal default) to Center of Card
    const tX = cardCenterX - modalCenterX;
    const tY = cardCenterY - modalCenterY;

    // Scale factors
    const sX = rect.width / targetW;
    const sY = rect.height / targetH;

    // 4. Calculate Rotation to match the underlying card's tilt
    const isDesktop = window.innerWidth >= 768;
    const rotation = isDesktop ? (index % 2 === 0 ? 1 : -1) : 0;

    // 5. Set Initial State
    setTransformValues({ x: tX, y: tY, scaleX: sX, scaleY: sY, rotation });
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsAnimating(true);
    setShowContent(false); 
    setIsExpanded(false); 
    
    // 6. Trigger Animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsExpanded(true); // Animate to Center
        
        // Fade in content AFTER geometry animation is complete
        setTimeout(() => {
          setShowContent(true);
          setIsAnimating(false);
        }, 550);
      });
    });
  };

  const handleClose = () => {
    if (isAnimating) return;

    // 1. Fade out content
    setShowContent(false);
    setIsAnimating(true);
    
    // 2. Shrink Geometry after content fade begins
    setTimeout(() => {
      setIsExpanded(false); // Shrink to Card

      // 3. Cleanup
      // Increased timeout to 750ms to ensure opacity transition (0.55s) is completely finished
      // before unmounting.
      setTimeout(() => {
        setSelectedProject(null);
        setIsAnimating(false);
      }, 750);
    }, 150);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const gallery = selectedProject.gallery || [selectedProject.imageUrl];
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const gallery = selectedProject.gallery || [selectedProject.imageUrl];
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <Layout>
      <SEO 
        title="Games | OCTAMAZE" 
        description="Explore the complete library of games developed by OCTAMAZE."
        keywords="games list, portfolio, releases, prototypes"
      />
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl text-stone-800 mb-4">Game Library</h1>
            <p className="text-stone-500 max-w-xl mx-auto">Explore our released titles and work-in-progress prototypes. Each project represents a new [[experiment]] in gameplay.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-20 max-w-7xl mx-auto">
          {GAMES.map((item, index) => (
            <div 
                key={item.id} 
                className="flex justify-center"
            >
                <div 
                  ref={(el) => {
                    if (el) cardRefs.current.set(item.id, el);
                    else cardRefs.current.delete(item.id);
                  }}
                  // Removed 'hover:scale-[1.02]' to avoid conflict with ThreeDTilt scaling
                  className="w-full max-w-[320px] cursor-pointer active:scale-95 transition-transform duration-300"
                  // Pass index to handleCardClick to calculate rotation
                  onClick={() => handleCardClick(item, index)}
                >
                  <ArtifactCard 
                      number={`0${index + 1}`} 
                      artifact={item}
                      rotation={index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}
                      // Removed 'pointer-events-none' so the card can receive mouse hover events for the tilt/scale effect
                      className="" 
                  />
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ----------------------------------------------------
        PERFORMANCE OPTIMIZED MODAL
        ----------------------------------------------------
      */}
      {selectedProject && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
          />

          {/* 
             The Morphing Paper Container 
          */}
          <div 
            // Changed origin-top-left to origin-center for correct rotation alignment
            className="fixed z-[200] overflow-hidden flex flex-col bg-[#fdfcf8] shadow-2xl origin-center"
            style={{
              // Static Centered Positioning based on MODAL_CONFIG
              top: '50%',
              left: '50%',
              width: `min(${MODAL_CONFIG.widthRatio * 100}vw, ${MODAL_CONFIG.maxWidthPx}px)`,
              height: `min(${MODAL_CONFIG.heightRatio * 100}vh, ${MODAL_CONFIG.maxHeightPx}px)`,
              // Center offset adjustment
              marginTop: `calc(min(${MODAL_CONFIG.heightRatio * 100}vh, ${MODAL_CONFIG.maxHeightPx}px) / -2)`,
              marginLeft: `calc(min(${MODAL_CONFIG.widthRatio * 100}vw, ${MODAL_CONFIG.maxWidthPx}px) / -2)`,
              borderRadius: '2px',

              // ANIMATION
              // Added rotation to the closed state transform to align with the card's tilt
              transform: isExpanded 
                ? `translate3d(0, 0, 0) scale(1) rotate(0deg)` 
                : `translate3d(${transformValues.x}px, ${transformValues.y}px, 0) scale(${transformValues.scaleX}, ${transformValues.scaleY}) rotate(${transformValues.rotation}deg)`,
              
              // OPACITY TRANSITION:
              opacity: isExpanded ? 1 : 0,

              // TRANSITION CONFIG:
              // Open: Fade in immediately (ease-out).
              // Close: Wait 0.35s (delay), then fade out quickly over 0.2s (linear). 
              // This ensures the card stays opaque while shrinking to cover the underlying card, preventing double-vision.
              transition: isExpanded
                 ? 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0s ease-out'
                 : 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s linear 0.3s',
              
              willChange: 'transform, opacity',
            }}
            onClick={(e) => e.stopPropagation()}
          >
             {/* Texture Overlays (Always visible on the paper) */}
             <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_-20px_rgba(100,90,80,0.4)] rounded-[2px]" />
             <div 
                className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.2]"
                style={{ backgroundImage: `url("${filmGrain}")` }}
             />

             {/* Close Button - Fades in with content */}
             <button 
                onClick={handleClose}
                className={`absolute top-4 right-4 z-50 p-2 bg-stone-900/80 text-white rounded-full hover:bg-stone-800 transition-all duration-300 backdrop-blur-md ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
             >
                <X size={24} />
             </button>

             {/* 
               Content Layout 
               Using static padding (p-5 = 20px) to avoid layout shift.
             */}
             <div className="w-full h-full flex flex-col p-5 md:p-6">
               {/* 
                 Inner Frame (Border & Content)
                 The opacity controls the visibility of the Border, Shadow, and Content.
                 During expansion (showContent=false), this is invisible.
               */}
               <div 
                 className="flex flex-col w-full h-full border border-stone-200/80 bg-stone-50 overflow-hidden shadow-sm relative transition-opacity duration-500 ease-in-out"
                 style={{ opacity: showContent ? 1 : 0 }}
               >
                  
                  {/* IMAGE SECTION */}
                  <div 
                    className="relative w-full flex-shrink-0 bg-stone-200 overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]"
                    style={{
                      aspectRatio: '16/9',
                    }}
                  >
                     <img 
                        src={selectedProject.gallery ? selectedProject.gallery[currentImageIndex] : selectedProject.imageUrl}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent pointer-events-none mix-blend-multiply" />

                     {/* Gallery UI */}
                     {(selectedProject.gallery && selectedProject.gallery.length > 1) && (
                        <div className="absolute inset-0">
                           <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm z-30"><ChevronLeft size={32} /></button>
                           <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-sm z-30"><ChevronRight size={32} /></button>
                           <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                                {selectedProject.gallery.map((_, idx) => (
                                    <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
                                ))}
                            </div>
                        </div>
                     )}
                  </div>

                  {/* TEXT SECTION */}
                  <div 
                     className="flex-1 flex flex-col relative overflow-y-auto"
                     style={{ padding: '2rem 2.5rem' }}
                  >
                     <div className="flex justify-between items-start mb-4 border-b border-stone-300 pb-4">
                        <div>
                           <h2 className="font-sans font-bold text-3xl md:text-4xl text-stone-800 mix-blend-multiply mb-2 leading-none">{selectedProject.title}</h2>
                           <div className="font-mono text-xs md:text-xs text-stone-500 mt-2 tracking-[0.15em] uppercase mix-blend-multiply">{selectedProject.subtitle}</div>
                        </div>
                        <div className="hidden md:block text-right">
                           <div className="font-mono text-2xl text-stone-300 font-bold opacity-50">{selectedProject.year}</div>
                           <div className="font-mono text-xs text-stone-400 mt-1 uppercase">Project_ID: {selectedProject.id}</div>
                        </div>
                     </div>
                     <div className="mt-auto space-y-6">
                        <p className="font-serif text-s md:text-s text-stone-600/90 italic leading-tight mix-blend-multiply"><RedactedText text={selectedProject.description} /></p>
                        <div className="p-4 bg-stone-100/50 border-l-2 border-stone-300">
                             <span className="font-mono font-bold text-xs text-stone-400 uppercase tracking-wider block mb-2">Development Log // Excerpt</span>
                             <p className="text-stone-600 text-base">The system architecture was designed to mimic neural pathways. [[Anomaly detected]] in sector 7.</p>
                        </div>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </>
      )}
    </Layout>
  );
};