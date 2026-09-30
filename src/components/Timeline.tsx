import React from 'react';
import { motion } from 'motion/react';

const events = [
  { time: '17:00', title: 'Guest Arrival', desc: 'Welcome & Seating' },
  { time: '18:00', title: 'Wedding Feast', desc: 'Join us for dinner' },
  { time: '20:00', title: 'Photographs', desc: 'Capturing memories' },
  { time: '21:00', title: 'Going Away', desc: 'The grand exit' },
];

const TextBlock = ({ event, isLeft }: { event: any, isLeft: boolean }) => (
  <div className={`flex flex-col ${isLeft ? 'items-end text-right' : 'items-start text-left'} max-w-[220px]`}>
    <h3 className="text-[#5a4d46] font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-medium leading-relaxed">
      {event.title}
    </h3>
    <div className="text-[#3a2d27] font-display text-[2.75rem] sm:text-5xl my-1 sm:my-2 leading-none">
      {event.time}
    </div>
    <p className="text-[#5a4d46] font-serif italic text-[11px] sm:text-xs leading-relaxed opacity-90">
      {event.desc}
    </p>
  </div>
);

export const Timeline = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-20 sm:py-32 px-4 overflow-hidden">
      
      {/* Decorative Lily - top right */}
      <motion.img 
        initial={{ opacity: 0, x: 40, y: -40 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="/Gemini_Generated_Image_ysl6ulysl6ulysl6-removebg-preview.png" 
        alt="Lily decoration" 
        className="absolute top-0 right-0 w-32 sm:w-48 mix-blend-multiply pointer-events-none drop-shadow-sm"
      />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 sm:mb-16 flex flex-col items-center relative z-10"
      >
        <h2 className="font-display text-[4rem] sm:text-[5rem] text-[#3a2d27] mb-2 sm:mb-4 leading-none">
          Wedding Day
        </h2>
        <span className="text-[#5a4d46] font-sans text-[9px] sm:text-[10px] tracking-[0.35em] font-medium uppercase mt-2">
          October 09, 2026
        </span>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-3xl mx-auto flex flex-col">
        {events.map((event, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex w-full h-[180px] sm:h-[220px] relative"
            >
              {/* Left Column */}
              <div className="flex-1 flex justify-end items-center pr-3 sm:pr-6">
                {isLeft && <TextBlock event={event} isLeft={true} />}
              </div>

              {/* Center Wavy Line */}
              <div className="w-16 sm:w-28 h-full relative flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
                  {isLeft ? (
                    <path 
                      d="M 50 0 C 50 25, 15 30, 15 50 C 15 70, 50 75, 50 100" 
                      stroke="#5a4d46" 
                      strokeWidth="1" 
                      fill="transparent" 
                      vectorEffect="non-scaling-stroke"
                      opacity="0.4"
                    />
                  ) : (
                    <path 
                      d="M 50 0 C 50 25, 85 30, 85 50 C 85 70, 50 75, 50 100" 
                      stroke="#5a4d46" 
                      strokeWidth="1" 
                      fill="transparent" 
                      vectorEffect="non-scaling-stroke"
                      opacity="0.4"
                    />
                  )}
                </svg>
                {/* Dot */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5a4d46] ${isLeft ? 'left-[15%] -translate-x-1/2' : 'left-[85%] -translate-x-1/2'}`} 
                />
              </div>

              {/* Right Column */}
              <div className="flex-1 flex justify-start items-center pl-3 sm:pl-6">
                {!isLeft && <TextBlock event={event} isLeft={false} />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
