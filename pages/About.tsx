import React from 'react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { DecryptionText } from '../components/DecryptionText';
import { RedactedText } from '../components/RedactedText';

export const About: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="About | OCTAMAZE Studio" 
        description="Learn about OCTAMAZE's mission to create groundbreaking indie games."
        keywords="game studio, indie devs, team, mission"
      />
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 py-12">
          
          <div className="space-y-8">
            <h1 className="font-serif text-5xl md:text-6xl text-stone-800">
              <span className="font-mono text-sm tracking-widest text-stone-400 block mb-2">FILE_ID: ORIGIN_STORY</span>
              Coding <br />
              <span className="italic text-stone-500">Dreams</span>
            </h1>
            <div className="h-1 w-24 bg-stone-800"></div>
            
            <p className="font-sans text-stone-600 leading-loose text-lg">
              <RedactedText text="OCTAMAZE was founded on a premise we are still trying to prove: that [[reality]] is just a very [[high-resolution game]]. We blend technical excellence with artistic vision to create experiences that linger." />
            </p>
            
            <div className="relative pl-6 border-l-4 border-stone-800 py-2">
                <p className="font-serif text-stone-500 italic leading-relaxed text-lg">
                "<DecryptionText text="We don't just make games to be played. We make worlds to be lived in." speed={30} revealDelay={800} />"
                </p>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
             <div className="absolute inset-0 border-2 border-stone-800 transform translate-x-4 translate-y-4 rounded-sm hidden md:block bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
             <div className="relative overflow-hidden rounded-sm group">
                <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop" 
                alt="Game Studio" 
                className="relative w-full h-[300px] md:h-[500px] object-cover grayscale contrast-125 group-hover:contrast-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors"></div>
                {/* Glitch overlay */}
                <div className="absolute inset-0 bg-stone-900/0 hover:bg-stone-900/10 mix-blend-overlay pointer-events-none"></div>
             </div>
          </div>

        </div>

        <div className="mt-24 mb-12">
          <h2 className="font-mono font-bold text-xl text-stone-400 mb-8 uppercase tracking-[0.2em] text-center border-b border-stone-300 pb-4 w-max mx-auto">Core_Directives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "Innovation", text: "Pushing gameplay mechanics beyond [[established conventions]]." },
               { title: "Immersion", text: "Building atmospheric worlds that [[breathe]] and react." },
               { title: "Narrative", text: "Stories that respect the player's [[intelligence]] and agency." }
             ].map((item, idx) => (
               <div key={idx} className="bg-[#fdfcf8] p-8 border border-stone-200/60 shadow-sm text-center group hover:shadow-lg transition-all hover:-translate-y-1 duration-300 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-stone-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                 <div className="font-mono text-4xl text-stone-200 mb-4 group-hover:text-stone-800 transition-colors">0{idx + 1}</div>
                 <h3 className="font-bold text-stone-800 mb-3">{item.title}</h3>
                 <p className="text-stone-500 text-sm">
                    <RedactedText text={item.text} />
                 </p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};