import React from 'react';
import { Layout } from '../components/Layout';
import { ArtifactCard } from '../components/ArtifactCard';
import { GameProject } from '../types';
import { SEO } from '../components/SEO';

const GAMES: GameProject[] = [
  {
    id: 'p1',
    title: 'Neon Dagger',
    subtitle: 'Cyberpunk Action',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1599596638520-562db94b055d?q=80&w=800&auto=format&fit=crop',
    description: 'A high-octane hack-and-slash set in a collapsing digital metropolis. [[Speed]] is your only weapon against the [[corruption]].'
  },
  {
    id: 'p2',
    title: 'Void Walker',
    subtitle: 'Atmospheric Platformer',
    year: '2022',
    imageUrl: 'https://images.unsplash.com/photo-1578320339893-a44252dc8888?q=80&w=800&auto=format&fit=crop',
    description: 'Traverse the emptiness between stars. A contemplative journey about [[isolation]] and the [[fear of the unknown]].'
  },
  {
    id: 'p3',
    title: 'Jade Dynasty',
    subtitle: 'Grand Strategy',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800&auto=format&fit=crop',
    description: 'Command ancient armies and rewrite history. But remember: [[history is written by the victors]].'
  },
  {
    id: 'p4',
    title: 'Marble Age',
    subtitle: 'City Builder',
    year: '2021',
    imageUrl: 'https://images.unsplash.com/photo-1545289415-50dff696dfa4?q=80&w=800&auto=format&fit=crop',
    description: 'Build Rome from a single stone. Manage resources, politics, and the whims of the [[forgotten gods]].'
  },
  {
    id: 'p5',
    title: 'Obsidian',
    subtitle: 'Horror Puzzle',
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop',
    description: 'Look into the reflection, but [[do not blink]]. A psychological horror game played entirely through [[mirrors]].'
  },
  {
    id: 'p6',
    title: 'Valhalla Calling',
    subtitle: 'VR Experience',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1629196914168-3a95b954153c?q=80&w=800&auto=format&fit=crop',
    description: 'Immersive VR combat. Feel the weight of the axe and the chill of the [[endless winter]].'
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