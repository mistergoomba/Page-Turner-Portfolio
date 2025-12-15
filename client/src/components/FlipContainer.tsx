import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Section } from './FlipSection';

interface FlipContainerProps {
  sections: Array<React.ComponentProps<typeof Section>>;
}

export const FlipContainer: React.FC<FlipContainerProps> = ({ sections }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalSections = sections.length;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressMapped = useTransform(smoothProgress, [0, 1], [0, totalSections - 1]);
  
  // Use a state to force re-render if needed, but mostly relying on CSS vars/motion values is better.
  // We'll stick to pure motion values for performance.

  return (
    <div 
      ref={containerRef} 
      style={{ height: `${totalSections * 100}dvh` }} 
      className="relative bg-black"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden perspective-1000">
        {sections.map((sectionData, index) => (
          <FlipCard 
            key={index} 
            index={index} 
            data={sectionData} 
            progress={progressMapped} 
            total={totalSections}
          />
        ))}
      </div>
    </div>
  );
};

const FlipCard = ({ index, data, progress, total }: { index: number, data: any, progress: any, total: number }) => {
  // Flip "Forward" by rotating 0 -> 180 (positive)
  const rotateX = useTransform(
    progress,
    [index, index + 1],
    [0, 180]
  );
  
  // Add a slight rotation on Y to make it less perfect/mechanical
  const rotateY = useTransform(
    progress,
    [index, index + 1],
    [0, -5]
  );
  
  const zIndex = total - index;

  return (
    <motion.div
      style={{ 
        zIndex,
        rotateX,
        rotateY,
        transformOrigin: "top center",
      }}
      className="absolute inset-0 w-full h-full backface-hidden transform-style-3d will-change-transform shadow-2xl"
    >
      {/* Front Face */}
      <div className="w-full h-full bg-background absolute inset-0 backface-hidden">
        <Section {...data} />
      </div>
      
      {/* Back Face */}
      <div 
        className="w-full h-full bg-[#111] absolute inset-0 backface-hidden flex items-center justify-center overflow-hidden"
        style={{ transform: "rotateX(180deg)" }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black" />
        <span className="text-[20vw] font-serif font-black text-white/5 select-none">
          AURA
        </span>
      </div>
    </motion.div>
  );
}
