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
      subtitle: 'The Book of',
      title: 'Danielle',
      description:
        "This is a blueprint. We can change the sections, names, layout, text, design, etc. I wanted to test out this cool 'book turning' animation. Scroll down!",
      video: ASSETS.homeBgVideo,
      theme: 'dark' as const,
      align: 'center' as const,
    },
    {
      id: 'sculpture',
      subtitle: '',
      title: 'Artist',
      description: 'We can put some text here and then a button to get to the artist page.',
      image: ASSETS.sculpture,
      theme: 'dark' as const,
      align: 'left' as const,
    },
    {
      id: 'digital',
      subtitle: '',
      title: 'Workshops',
      description: 'Examples and a link to the workshops page.',
      image: ASSETS.portrait,
      theme: 'dark' as const,
      align: 'right' as const,
    },
    {
      id: 'architecture',
      subtitle: '',
      title: 'Activism',
      description: 'We can use different names and sections.',
      image: ASSETS.arch,
      theme: 'dark' as const,
      align: 'left' as const,
    },
    {
      id: 'contact',
      subtitle: 'Get in Touch',
      title: 'Collaborate',
      description:
        'All these are ideas thrown in to start the creative process. We can work on design, colors, fonts, and trippy ideas.',
      theme: 'light' as const,
      align: 'center' as const,
      // No image for last slide, just clean light theme
      children: (
        <div className='mt-12 flex flex-col md:flex-row gap-6 items-center'>
          <button className='group relative px-8 py-4 bg-black text-white font-bold tracking-widest overflow-hidden transition-all hover:pr-12'>
            <span className='relative z-10'>EMAIL ME</span>
            <div className='absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0' />
            <ArrowRight className='absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10' />
          </button>

          <button className='px-8 py-4 border-2 border-black text-black font-bold tracking-widest hover:bg-black hover:text-white transition-all duration-300'>
            INSTAGRAM
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='min-h-screen bg-black font-sans selection:bg-accent selection:text-white'>
      {/* Fixed Navigation Overlay */}
      <nav className='fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none'>
        <div className='pointer-events-auto cursor-pointer hover:text-accent transition-colors'>
          <Menu className='w-8 h-8' />
        </div>
      </nav>

      {/* Main Flip Container */}
      <FlipContainer sections={sections} />

      {/* Progress Indicator (Optional fixed element) */}
      <div className='fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mix-blend-difference pointer-events-none'>
        {sections.map((_, i) => (
          <div key={i} className='w-1 h-1 bg-white rounded-full opacity-50' />
        ))}
      </div>
    </div>
  );
}
