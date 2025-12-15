import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  video?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  isHero?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  description,
  image,
  video,
  theme = 'dark',
  align = 'center',
  children,
  isHero = false,
}) => {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <div
      className={cn(
        'w-full h-full relative overflow-hidden flex flex-col justify-center p-8 md:p-24 backface-hidden',
        alignmentClasses[align],
        theme === 'light' ? 'bg-[#F5F5F5] text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#F5F5F5]'
      )}
    >
      {/* Background Media */}
      <div className='absolute inset-0 z-0 w-full h-full overflow-hidden'>
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='absolute inset-0'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              minWidth: '100%',
              minHeight: '100%',
            }}
          >
            <source src={video} type='video/mp4' />
          </video>
        ) : image ? (
          <img
            src={image}
            alt='background'
            className='absolute inset-0'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              minWidth: '100%',
              minHeight: '100%',
            }}
          />
        ) : null}
        <div
          className={cn('absolute inset-0 z-10', theme === 'light' ? 'bg-white/20' : 'bg-black/40')}
        />
      </div>

      {/* Content */}
      <div className={cn('relative z-20 max-w-4xl flex flex-col gap-6', alignmentClasses[align])}>
        {subtitle && (
          <motion.div
            initial={{
              opacity: 0,
              x: align === 'left' ? -20 : align === 'right' ? 20 : 0,
              y: align === 'center' ? 20 : 0,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2 }}
            className='flex items-center gap-4'
          >
            {align === 'right' && <div className='h-[1px] w-12 bg-accent' />}
            <span className='text-accent text-sm md:text-base tracking-[0.2em] uppercase font-bold'>
              {subtitle}
            </span>
            {align === 'left' && <div className='h-[1px] w-12 bg-accent' />}
          </motion.div>
        )}

        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='text-5xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight'
          >
            {title}
          </motion.h1>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-xl',
              align === 'right' && 'ml-auto',
              align === 'left' && 'mr-auto'
            )}
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>

      {/* Scroll Indicator for Hero */}
      {isHero && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className='absolute bottom-10 left-1/2 -translate-x-1/2 z-20'
        >
          <div className='flex flex-col items-center gap-2 text-white/70'>
            <span className='text-xs tracking-widest uppercase'>Scroll</span>
            <ArrowDown className='w-6 h-6' />
          </div>
        </motion.div>
      )}
    </div>
  );
};
