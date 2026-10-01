import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface InviteeBannerProps {
  inviteeName: string;
  eventLabel: string;
}

export const InviteeBanner: React.FC<InviteeBannerProps> = ({ inviteeName, eventLabel }) => {
  return (
    <div className="w-full py-16 sm:py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center">

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-[#5a4d46] animate-pulse" />
            <span className="text-[#5a4d46] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-xs font-bold drop-shadow-sm">
              Specially Invited Guest
            </span>
            <Sparkles className="w-4 h-4 text-[#5a4d46] animate-pulse" />
          </div>

          <h2 className="text-[3.5rem] sm:text-[5rem] lg:text-[6rem] font-display text-[#3a2d27] mb-6 drop-shadow-sm font-normal py-2 leading-none">
            {inviteeName}
          </h2>

          <div className="flex items-center gap-4 justify-center max-w-xl mx-auto mt-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#3a2d27]/40" />
            <p className="text-[#5a4d46] font-sans text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] font-medium uppercase leading-relaxed text-center">
              We joyfully invite you to celebrate <br className="sm:hidden" /><span className="text-[#3a2d27] font-bold">{eventLabel}</span> with us.
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#3a2d27]/40" />
          </div>

          <Heart className="w-5 h-5 text-[#3a2d27] mt-10 fill-[#3a2d27]/10 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};
