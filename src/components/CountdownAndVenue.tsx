import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface CountdownAndVenueProps {
  targetDate: Date;
}

export const CountdownAndVenue: React.FC<CountdownAndVenueProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4">
      
      {/* Countdown Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24 w-full"
      >
        <h2 className="font-display text-5xl sm:text-6xl text-[#3a2d27] mb-6">
          Countdown
        </h2>
        
        <span className="text-[#5a4d46] font-sans text-[9px] sm:text-[10px] tracking-[0.3em] font-medium uppercase mb-12">
          To the most special day of our lives
        </span>

        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[#3a2d27]">
          
          <div className="flex flex-col items-center">
            <span className="font-sans font-light text-4xl sm:text-5xl mb-2 w-16 sm:w-20">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#5a4d46]">Days</span>
          </div>
          
          <span className="font-sans font-light text-3xl sm:text-4xl mb-6 text-[#7a6d66]">:</span>

          <div className="flex flex-col items-center">
            <span className="font-sans font-light text-4xl sm:text-5xl mb-2 w-16 sm:w-20">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#5a4d46]">Hour</span>
          </div>
          
          <span className="font-sans font-light text-3xl sm:text-4xl mb-6 text-[#7a6d66]">:</span>

          <div className="flex flex-col items-center">
            <span className="font-sans font-light text-4xl sm:text-5xl mb-2 w-16 sm:w-20">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#5a4d46]">Minutes</span>
          </div>
          
          <span className="font-sans font-light text-3xl sm:text-4xl mb-6 text-[#7a6d66]">:</span>

          <div className="flex flex-col items-center">
            <span className="font-sans font-light text-4xl sm:text-5xl mb-2 w-16 sm:w-20">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#5a4d46]">Seconds</span>
          </div>

        </div>
      </motion.div>

      {/* Venue Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center text-center w-full"
      >
        <span className="text-[#5a4d46] font-sans text-[10px] sm:text-[11px] tracking-[0.35em] font-medium uppercase mb-6">
          The Venue
        </span>



        {/* Separator */}
        <div className="flex items-center justify-center gap-3 mb-8 w-full">
          <div className="w-12 h-[1px] bg-[#5a4d46]/30"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#5a4d46]/60"></div>
          <div className="w-12 h-[1px] bg-[#5a4d46]/30"></div>
        </div>

        <span className="text-[#3a2d27] font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 font-medium">
          October 09, 2026
        </span>

        <p className="text-[#5a4d46] font-sans text-sm sm:text-base leading-relaxed mb-10">
          Time : 5.00 p.m.
        </p>

        {/* Map Placeholder */}
        <div className="w-full max-w-sm sm:max-w-md h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg border border-[#5a4d46]/10 relative mb-8">
          <iframe 
            src="https://maps.google.com/maps?q=7.438750,81.817222&hl=en&z=17&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Location"
          ></iframe>
        </div>

        {/* Live Location Button */}
        <a 
          href="https://maps.app.goo.gl/XbG731Rpihehw3KUA"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-3.5 bg-transparent border border-[#3a2d27]/40 rounded-full text-[#3a2d27] font-sans tracking-[0.3em] text-[9px] sm:text-[10px] uppercase hover:bg-[#3a2d27] hover:text-[#FAF9F6] transition-all duration-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
        >
          <MapPin className="w-4 h-4" />
          Live Location
        </a>

      </motion.div>

    </div>
  );
};
