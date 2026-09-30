import React from 'react';
import { motion } from 'motion/react';

export const LoveStory = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-24 sm:py-32 px-6 sm:px-8 overflow-hidden">
      
      {/* Decorative Lily - top left */}
      <motion.img 
        initial={{ opacity: 0, x: -40, y: -40 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="/Gemini_Generated_Image_wmzpk5wmzpk5wmzp-removebg-preview.png" 
        alt="Lily decoration" 
        className="absolute top-0 left-0 w-24 sm:w-36 mix-blend-multiply pointer-events-none drop-shadow-sm"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto z-10"
      >
        <h2 className="font-display text-[4rem] sm:text-[5.5rem] text-[#3a2d27] mb-4 sm:mb-6 leading-none">
          Our Love Story
        </h2>
        
        <span className="text-[#5a4d46] font-sans text-[9px] sm:text-[10px] tracking-[0.35em] font-medium uppercase mb-16 sm:mb-20">
          How it all began
        </span>

        <p className="text-[#5a4d46] font-sans font-light text-xs sm:text-sm leading-[2] sm:leading-[2.2] tracking-wide mt-4">
          We met on a rainy Saturday afternoon at a cozy neighborhood coffee shop. There was only one seat left, so we awkwardly shared a table. What started as small talk about the weather turned into a three-hour conversation about travel dreams, favorite movies, and childhood stories. By the time the rain stopped, neither of us wanted the day to end.
        </p>

      </motion.div>
    </div>
  );
};
