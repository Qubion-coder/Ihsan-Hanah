import { motion } from 'motion/react';
import { Music, VolumeX, Heart } from 'lucide-react';
import { Hero } from './Hero';
import { CountdownAndVenue } from './CountdownAndVenue';
import { LoveStory } from './LoveStory';


import { RSVPForm } from './RSVPForm';
import { BestWishes } from './BestWishes';

import { InviteeBanner } from './InviteeBanner';
import { DeferredMount } from './DeferredMount';

interface InvitationContentProps {
  active: boolean;
  eventParam: string;
  fullInviteeName: string;
  eventLabel: string;
  weddingDate: Date;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isWaleema?: boolean;
}

export function InvitationContent({
  active,
  eventParam,
  fullInviteeName,
  eventLabel,
  weddingDate,
  isMusicPlaying,
  onToggleMusic,
  isWaleema = false,
}: InvitationContentProps) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="font-sans text-stone-800 selection:bg-[#FAF9F6]/20"
      style={{ 
        backgroundImage: `url('/ChatGPT Image Sep 30, 2026, 07_49_45 PM.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={onToggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(176,137,104,0.15)] flex items-center justify-center border border-brand-lavender/50 text-brand-plum hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? (
          <Music className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </motion.button>

      <Hero event={eventParam} inviteeName={fullInviteeName} />

      {fullInviteeName && (
        <DeferredMount active={active} delay={80}>
          <InviteeBanner inviteeName={fullInviteeName} eventLabel={eventLabel} />
        </DeferredMount>
      )}

      <DeferredMount active={active} delay={80} minHeight="60vh">
        <CountdownAndVenue targetDate={weddingDate} isWaleema={isWaleema} />
      </DeferredMount>



      <DeferredMount active={active} delay={120} minHeight="40vh">
        <LoveStory />
      </DeferredMount>



      <DeferredMount active={active} delay={420} minHeight="30vh">
        <RSVPForm inviteeName={fullInviteeName} eventName={eventLabel} eventParam={eventParam} isWaleema={isWaleema} />
      </DeferredMount>

      <DeferredMount active={active} delay={480} minHeight="30vh">
        <BestWishes inviteeName={fullInviteeName} isWaleema={isWaleema} />
      </DeferredMount>

      <DeferredMount active={active} delay={520}>
        <footer className="py-12 bg-transparent text-center relative overflow-hidden mt-10">
          <Heart className="w-6 h-6 mx-auto mb-6 text-[#3a2d27]" />
          <p className="font-display text-4xl sm:text-5xl text-[#3a2d27] mb-2">Ihsan & Fathima Hanah</p>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-[#5a4d46] font-semibold block mb-4">
            October 09, 2026
          </span>
          
          <div className="w-12 h-[1px] bg-[#3a2d27]/30 mx-auto my-6" />

          <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-stone-400 uppercase">
            Want a beautiful wedding website like this? <br className="sm:hidden" />Create yours with{' '}
            <a 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#D4AF37] hover:text-brand-plum font-bold underline decoration-[#D4AF37]/40 hover:decoration-brand-plum/40 underline-offset-4 transition-colors" 
              href="https://wa.me/94707819074"
            >
              Invitemint
            </a>
          </p>
        </footer>
      </DeferredMount>
    </motion.div>
  );
}
