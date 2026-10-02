import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return touch;
}

export const Hero: React.FC<HeroProps> = ({ event = 'both', inviteeName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const useParallax = !reducedMotion && !isTouch;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf7]">
      <div className="absolute inset-0 z-0">
        <img
          src="/ChatGPT Image Sep 30, 2026, 06_01_34 PM.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 h-full mt-[-5%] sm:mt-[-2%]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center gap-1.5 mb-6 sm:mb-8 text-center px-4"
        >
          <span className="text-[#4a3d36] text-xl sm:text-2xl mb-8 sm:mb-12 relative top-[-2cm] sm:top-0">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </span>
          <span className="text-[#4a3d36] font-sans text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] font-medium uppercase mt-2">
            Joyfully invite you
          </span>
          <span className="text-[#4a3d36] font-sans text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] font-medium uppercase">
            to their wedding
          </span>
        </motion.div>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
          <h1 className="text-[3.5rem] sm:text-[5rem] font-display text-[#3a2d27] drop-shadow-sm leading-[0.8] font-normal">
            {"Ihsan".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[#4a3d36] font-sans text-[10px] sm:text-[12px] tracking-[0.2em] uppercase mt-1 mb-2"
          >
            Son of Mr & Mrs. S. L. Subair
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-2xl sm:text-4xl font-display text-[#3a2d27] drop-shadow-sm my-1 font-normal"
          >
            &
          </motion.span>
          
          <h1 className="text-[3.5rem] sm:text-[5rem] font-display text-[#3a2d27] drop-shadow-sm leading-[0.8] font-normal mt-2">
            {"Fathima Hanah".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + i * 0.06, ease: "easeOut" }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="text-[#4a3d36] font-sans text-[10px] sm:text-[12px] tracking-[0.2em] uppercase mt-1"
          >
            Daughter of Mr & Mrs. M. B. M. Muzammil
          </motion.span>
        </div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30"
      >
        <button 
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="bg-gradient-to-r from-[#fceef0]/90 via-[#ffffff]/90 to-[#fceef0]/90 backdrop-blur-md border border-[#C5A059]/30 px-10 sm:px-12 py-3.5 sm:py-4 rounded-full hover:bg-white transition-all text-[#3a3a3a] font-sans text-[10px] sm:text-[11px] tracking-[0.4em] font-bold uppercase shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-95"
        >
          SCROLL
        </button>
      </motion.div>

      {/* Swaying Lilies Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-[-10px] right-[-20px] sm:bottom-[-20px] sm:right-[-20px] z-20 pointer-events-none"
      >
        <motion.img
          animate={{ 
            rotate: [0, -2, 1.5, -1, 0],
            y: [0, -3, 0, -2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut" 
          }}
          src="/Gemini_Generated_Image_lutajhlutajhluta-removebg-preview.png"
          alt="Lilies"
          className="w-48 sm:w-72 h-auto origin-bottom-right drop-shadow-md mix-blend-multiply"
        />
      </motion.div>
    </div>
  );
};
