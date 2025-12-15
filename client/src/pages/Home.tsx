import React, { useEffect } from 'react';
import { FlipContainer } from '@/components/FlipContainer';
import { ASSETS } from '@/lib/constants';
import { Menu, ArrowRight } from 'lucide-react';

export default function Home() {
  
  // Sections Data
  const sections = [
    {
      id: 'hero',
      isHero: true,
      subtitle: 'Welcome to',
      title: 'AURA',
      description: 'An immersive digital experience exploring the boundaries of visual perception and artistic expression.',
      image: ASSETS.bg,
      theme: 'dark' as const,
      align: 'center' as const
    },
    {
      id: 'sculpture',
      subtitle: 'Collection 01',
      title: 'Form & Void',
      description: 'Exploring the negative space in modern metallic structures. A study of gold and silence.',
      image: ASSETS.sculpture,
      theme: 'dark' as const,
      align: 'left' as const
    },
    {
      id: 'digital',
      subtitle: 'Collection 02',
      title: 'Digital Soul',
      description: 'Fragmentation of the self in the digital age. Glitch aesthetics meeting classical portraiture.',
      image: ASSETS.portrait,
      theme: 'dark' as const,
      align: 'right' as const
    },
    {
      id: 'architecture',
      subtitle: 'Collection 03',
      title: 'Monolith',
      description: 'The silent giants of our concrete jungles. Capturing the geometry of urban isolation.',
      image: ASSETS.arch,
      theme: 'dark' as const,
      align: 'left' as const
    },
    {
      id: 'contact',
      subtitle: 'Get in Touch',
      title: 'Collaborate',
      description: 'Open for commissions and creative partnerships. Let\'s build something timeless.',
      theme: 'light' as const,
      align: 'center' as const,
      // No image for last slide, just clean light theme
      children: (
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
          <button className="group relative px-8 py-4 bg-black text-white font-bold tracking-widest overflow-hidden transition-all hover:pr-12">
            <span className="relative z-10">EMAIL ME</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10" />
          </button>
          
          <button className="px-8 py-4 border-2 border-black text-black font-bold tracking-widest hover:bg-black hover:text-white transition-all duration-300">
            INSTAGRAM
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-accent selection:text-white">
      {/* Fixed Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="text-xl font-serif font-bold tracking-tighter pointer-events-auto cursor-pointer">
          AURA
        </div>
        
        <div className="pointer-events-auto cursor-pointer hover:text-accent transition-colors">
          <Menu className="w-8 h-8" />
        </div>
      </nav>

      {/* Main Flip Container */}
      <FlipContainer sections={sections} />
      
      {/* Progress Indicator (Optional fixed element) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mix-blend-difference pointer-events-none">
         {sections.map((_, i) => (
           <div key={i} className="w-1 h-1 bg-white rounded-full opacity-50" />
         ))}
      </div>
    </div>
  );
}
