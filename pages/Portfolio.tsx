import React from 'react';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';

const GAMES: GameProject[] = [
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

export const Portfolio: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Games | OCTAMAZE" 
        description="Explore the complete library of games developed by OCTAMAZE."
        keywords="games list, portfolio, releases, prototypes"
      />
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl text-stone-800 mb-4">Game Library</h1>
            <p className="text-stone-500 max-w-xl mx-auto">Explore our released titles and work-in-progress prototypes. Each project represents a new [[experiment]] in gameplay.</p>
        </div>

        {/* Use 3 columns on desktop for vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-20 max-w-7xl mx-auto">
          {GAMES.map((item, index) => (
            <div key={item.id} className="flex justify-center">
                <ArtifactCard 
                    number={`0${index + 1}`} 
                    artifact={item}
                    rotation={index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}
                    className="w-full max-w-[320px]"
                />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};