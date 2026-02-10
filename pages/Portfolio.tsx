import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';
import { RedactedText } from '../components/RedactedText';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// Data with Gallery Images
const GAMES: GameProject[] = [
  {
    id: 'GC-25',
    title: 'Gate of Chaos',
    year: '2025',
    card: {
      subtitle: 'SURREALIST // PUZZLE',
      imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-head21769006869126.jpg',
      description: 'Within the sigil lies a realm of chaos, where a mighty divine beast is bound. Seven Gates of Chaos rise within. Will Baboo unravel the ancient restraints?'
    },
    info: {
      subtitle: 'SURREALIST // PUZZLE',
      gallery: [
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-head-tuya1770739386375.jpg',
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-Hand%20drawn-tuya1770739386377.jpg',
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-in%20game%20screen%20shots-tuya1770739386376.jpg',
        'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-s9A-tuya1770739386378.png'
      ],
      description: "The Gate of Chaos is a series of point-and-click puzzle games rendered in a realistic artistic style. Hand-drawn on paper and developed using Unreal Engine.Players assume the role of Baboo, the protagonist, who enters a mystical talisman. Within it, chaos has formed a disordered realm, imprisoning a powerful divine beast. Seven Gates of Chaos stand within this space. Each gate possesses its own theme and rules, sealing a fragment of the beast's power. Through observation, exploration, and puzzle-solving, players must restore order from chaos, progressively unlocking all seven gates. As chaos unravels, the seal upon the beast gradually weakens—revealing the hidden story within. \n The Gate of Chaos: Unceasing is the first installment in the series, representing the first of the seven gates—the Gate of Unceasing.Within this gate, players will gain an initial understanding of how chaos operates, and through puzzle-solving and exploration, make first contact with the sealed divine beast. Upon completion, players will unlock a preliminary glimpse of the beast's visage and consciousness, laying the foundation for the gates yet to come.",
      techSpecs: [
         '> Engine: Unreal Engine',
         '> Estimated playtime: 1–2 hours',
      ],
      devNote: 'Within the sigil lies a realm of chaos, where a mighty divine beast is bound. Seven Gates of Chaos rise within. Will Baboo unravel the ancient restraints?'
    }
  },
  {
    id: 'GM-25',
    title: 'God Mode',
    year: '2025',
    card: {
      subtitle: 'VALENTINE // PUZZLE',
      imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-final%20set%20up1769010345825.png',
      description: 'Do all lovers find their way to each other?'
    },
    info: {
      subtitle: 'VALENTINE // PUZZLE',
      gallery: [
         'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-final%20set%20up-tuya1770739318073.jpg',
         'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-A_closeupR_ref-tuya1770739318072.jpg',
         'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-grave02-tuya1770739318074.jpg',
         'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/02-in%20brainW_ref02-tuya1770739318071.jpg'
      ],
      description: "God Mode is a compact game created for a Game Jam, developed by a two-person team within seven days. Entirely hand-drawn and built using Unreal Engine. \n  Set against the backdrop of Valentine's Day, it features straightforward gameplay as a lightweight point-and-click puzzle experience. The narrative carries a subtle satirical undertone, which players may gradually discern throughout their journey. \n This project served as a relaxed and enjoyable experiment for our team. Despite employing ultra-fine linework and flat coloring without textured shading, the overall atmosphere draws inspiration from my personal favorite, Rusty Lake—a heartfelt homage to the games we admire.",
      techSpecs: [
         '> Engine: Unreal Engine',
         '> Estimated playtime: 20 minutes',
      ],
      devNote: 'Do all lovers find their way to each other?'
    }
  },  
  {
    id: 'CT-26',
    title: "Cipher's Toy",
    year: '2026',
    card: {
      subtitle: 'SURREALIST // PUZZLE',
      imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152523_2_1201769844404948.jpg',
      description: 'Glimpse the secrets and stories concealed behind the gift shop.'
    },
    info: {
    subtitle: 'SURREALIST // PUZZLE',
    gallery: [
'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152523_2_1201769844404948.jpg',
    ],
    description: 'Within a clandestine shop, unravel mysteries to glimpse the secrets and stories concealed behind each peculiar artifact. ',
    techSpecs: ['Up coming...'],
    devNote: 'Glimpse the secrets and stories concealed behind the gift shop.'
}
  },
  {
    id: 'PR-26',
    title: 'Pawarallel',
    year: '2026',
    card: {
      subtitle: 'COOPERATE // PUZZLE',
      imageUrl: 'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152524_3_1201769844409896.jpg',
      description: 'Two selves. Two fragments. Two worlds.'
    },
    info: {
    subtitle: 'COOPERATE // PUZZLE',
    gallery: [
'https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260131152524_3_1201769844409896.jpg',
    ],
    description: 'Players assume control of two distinct characters, operating in intertwined parallel worlds to collaborate and escape from an enclosed space. ',
    techSpecs: ['Up coming...'],
    devNote: 'Two selves. Two fragments. Two worlds.'
}
  }
];

const filmGrain = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E";

export const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  
  // Animation States
  const [isVisible, setIsVisible] = useState(false); // Controls the slide-up animation
  
  // Gallery Logic
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimatingGallery, setIsAnimatingGallery] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // Small delay to allow render before triggering CSS transition
      setTimeout(() => setIsVisible(true), 50);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const handleCardClick = (project: GameProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setSlideDirection(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 500); // Match transition duration
  };

  // --------------------------------------------------------------------------
  // POKER CUT GALLERY LOGIC
  // --------------------------------------------------------------------------
  const getGallery = () => selectedProject?.info.gallery || (selectedProject ? [selectedProject.card.imageUrl] : []);
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimatingGallery || !selectedProject) return;

    setIsAnimatingGallery(true);
    setSlideDirection('next');

    const gallery = getGallery();
    
    // Wait for the "throw" animation to finish, then swap the image source
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
      setSlideDirection(null);
      setIsAnimatingGallery(false);
    }, 400);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimatingGallery || !selectedProject) return;

    setIsAnimatingGallery(true);
    setSlideDirection('prev');

    const gallery = getGallery();
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      setSlideDirection(null);
      setIsAnimatingGallery(false);
    }, 400);
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
            <h1 className="font-sono font-bold text-4xl text-stone-800 mb-4">Game Library</h1>
            <p className="font-serif italic text-stone-500 max-w-m mx-auto">Explore our released titles and work-in-progress prototypes. <br />Each project represents a new experiment in gameplay.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-20 max-w-7xl mx-auto">
          {GAMES.map((item, index) => (
            <div 
                key={item.id} 
                className="flex justify-center"
            >
                <div 
                  className="w-full max-w-[320px] cursor-pointer active:scale-95 transition-transform duration-300"
                  onClick={() => handleCardClick(item)}
                >
                  <ArtifactCard 
                      number={`0${index + 1}`} 
                      artifact={item}
                      rotation={index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}
                      className="" 
                  />
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ----------------------------------------------------
        DOSSIER MODAL (SLIDE UP)
        ----------------------------------------------------
      */}
      {selectedProject && (
        <>
          {/* Dark Backdrop */}
          <div 
            className={`fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-[150] transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
          />

          {/* Modal Container: Centers the content, handles positioning */}
          <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none p-0 md:p-6 lg:p-10">
            
            {/* 
               The File/Dossier Card
               - Starts translated down 100% (offscreen)
               - Slides up to 0
            */}
            <div 
              className={`
                 pointer-events-auto
                 relative w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[92vh] 
                 bg-[#f4f1ea] shadow-2xl overflow-hidden /* HIDE OVERFLOW ON FRAME */
                 flex flex-col rounded-t-lg md:rounded-lg
                 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                 ${isVisible ? 'translate-y-0' : 'translate-y-[110%]'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
                {/* 
                    Texture Overlays for Paper Feel 
                    - Positioned absolute to the CONTAINER, not the content.
                    - This ensures they stay fixed "on the glass"/frame while content scrolls inside.
                    - Fixes the "white bottom" issue.
                */}
                <div 
                    className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.15]"
                    style={{ backgroundImage: `url("${filmGrain}")` }}
                />
                <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_60px_-10px_rgba(100,90,80,0.15)] rounded-lg" />

                {/* 
                  --------------------
                  SCROLLABLE CONTENT WRAPPER 
                  - The scrolling happens HERE inside the frame.
                  --------------------
                */}
                <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col p-6 md:p-12 pb-20">
                      
                      {/* TOP LEFT: BACK BUTTON */}
                      <div className="mb-8 md:mb-10">
                        <button 
                          onClick={handleClose}
                          className="group flex items-center gap-2 font-mono text-stone-500 text-xs tracking-widest uppercase hover:text-stone-800 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full border border-stone-400 flex items-center justify-center group-hover:bg-stone-800 group-hover:border-stone-800 group-hover:text-stone-50 transition-all">
                            <ArrowLeft size={14} />
                          </div>
                          <span>Return to Index</span>
                        </button>
                      </div>

                      {/* 
                         PHOTO GALLERY SECTION (The "Polaroid" Style)
                      */}
                      <div className="relative w-full flex justify-center mb-12 group perspective-1000">
                          
                          {/* Wrapper for the tilt and border */}
                          <div 
                            className="relative w-full max-w-2xl aspect-video bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] p-3 md:p-4 rotate-[-2deg] transform transition-transform duration-500 ease-out hover:rotate-0 hover:scale-[1.01]"
                          >
                             {/* Image Container with Overflow Hidden */}
                             <div className="relative w-full h-full bg-stone-100 overflow-hidden shadow-inner">
                                
                                {/* LAYER 1: The "Next" Image (Bottom) */}
                                <img 
                                    src={getGallery()[(currentImageIndex + 1) % getGallery().length]}
                                    alt="Next"
                                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                                />

                                {/* LAYER 2: The "Current" Image (Top) */}
                                <img 
                                    key={currentImageIndex}
                                    src={getGallery()[currentImageIndex]}
                                    alt="Current"
                                    className={`
                                        absolute inset-0 w-full h-full object-cover z-10
                                        transition-all duration-400 ease-in-out
                                        ${slideDirection === 'next' ? 'translate-x-[120%] rotate-12 opacity-0' : ''}
                                        ${slideDirection === 'prev' ? '-translate-x-[120%] -rotate-12 opacity-0' : ''}
                                    `}
                                />

                                {/* Old School Photo Gloss */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/10 to-transparent pointer-events-none mix-blend-overlay z-20"></div>
                             </div>

                             {/* NAVIGATION ARROWS */}
                             {getGallery().length > 1 && (
                                 <>
                                    <button 
                                        onClick={handlePrevImage}
                                        className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 p-3 text-stone-400 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <ChevronLeft size={48} strokeWidth={1} />
                                    </button>
                                    <button 
                                        onClick={handleNextImage}
                                        className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 p-3 text-stone-400 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <ChevronRight size={48} strokeWidth={1} />
                                    </button>
                                 </>
                             )}
                          </div>
                      </div>


                      {/* 
                         TEXT CONTENT SECTION 
                      */}
                      <div className="max-w-3xl mx-auto w-full">
                         <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b-2 border-stone-800/10 pb-6 mb-8 gap-4">
                            <div>
                                <h2 className="font-sans font-bold text-5xl md:text-6xl text-stone-900 mix-blend-multiply leading-[0.8]">
                                    {selectedProject.title}
                                </h2>
                                <div className="font-mono text-sm text-stone-500 mt-3 tracking-[0.25em] uppercase">
                                    {selectedProject.info.subtitle}
                                </div>
                            </div>
                            <div className="flex flex-col md:items-end font-mono text-stone-400 text-xs tracking-wider">
                               <span>YEAR: {selectedProject.year}</span>
                               <span>ID: {selectedProject.id}</span>
                            </div>
                         </div>

                         <div className="space-y-8">
                            <div className="prose prose-stone max-w-none">
                                <p className="font-serif text-m md:text-m text-stone-700 leading-relaxed mix-blend-multiply whitespace-pre-line">
                                    <RedactedText text={selectedProject.info.description} />
                                </p>
                            </div>

                            {/* Additional Info Cards with Unique Data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                                {/* Tech Specs */}
                                <div className="bg-white/50 p-6 border border-stone-200 shadow-sm relative overflow-hidden group">
                                    <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 border-b border-stone-100 pb-2">Technical_Specs</h4>
                                    <ul className="space-y-2 font-mono text-xs text-stone-600">
                                        {selectedProject.info.techSpecs.map((spec, idx) => (
                                            <li key={idx} className="block">{spec}</li>
                                        ))}
                                        {selectedProject.info.techSpecs.length === 0 && <li>> No data available</li>}
                                    </ul>
                                </div>
                                
                                {/* Dev Note (Sticky Note Style) */}
                                <div className="bg-stone-800 text-stone-200 p-6 shadow-lg rotate-1 relative transition-transform hover:rotate-0 hover:scale-105 duration-300">
                                    {/* Tape effect */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-stone-300/40 backdrop-blur-sm shadow-sm rotate-1"></div>
                                    <h4 className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Dev_Note</h4>
                                    <p className="font-serif italic text-sm opacity-80 leading-relaxed">
                                        "{selectedProject.info.devNote || "Classified."}"
                                    </p>
                                </div>
                            </div>
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