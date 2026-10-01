import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

import { WelcomeScreen } from './components/WelcomeScreen';
import { InvitationContent } from './components/InvitationContent';
import { Admin } from './components/Admin';
import { INVITATION_IMAGE_URLS, preloadImages } from './utils/preloadImages';

const isAdminRoute = () => window.location.pathname === '/admin';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get('title') || '';
  const nameParam = params.get('name') || '';
  const eventParam = params.get('event') || 'both';

  let fullInviteeName = '';
  let isWaleema = false;
  const pathname = window.location.pathname;

  if (pathname.startsWith('/waleema')) {
    isWaleema = true;
    const namePart = pathname.replace('/waleema', '').replace(/^\//, '');
    if (namePart) {
      try {
        fullInviteeName = decodeURIComponent(namePart);
      } catch (e) {
        fullInviteeName = namePart;
      }
    }
  } else if (pathname !== '/' && pathname !== '/admin') {
    try {
      fullInviteeName = decodeURIComponent(pathname.slice(1));
    } catch (e) {
      fullInviteeName = pathname.slice(1);
    }
  } else if (titleParam || nameParam) {
    fullInviteeName = `${titleParam} ${nameParam}`.trim();
  }

  let eventLabel = isWaleema ? 'Our Waleema' : 'Our Wedding Celebration';

  const weddingDate = isWaleema ? new Date('2026-10-11T19:30:00') : new Date('2026-10-09T17:00:00');

  useEffect(() => {
    if (isAdminRoute()) return;

    let cancelled = false;

    preloadImages([...INVITATION_IMAGE_URLS]).then(() => {
      if (!cancelled) setAssetsReady(true);
    });
    
    // Preload video
    const videoLink = document.createElement('link');
    videoLink.rel = 'preload';
    videoLink.as = 'video';
    videoLink.href = '/intro.mp4';
    document.head.appendChild(videoLink);

    return () => {
      cancelled = true;
    };
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Saiyaara (Reprise - Female Version) Lyrics - Shreya Ghoshal, Faheem Abdullah.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'none';
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = useCallback(() => {
    setIsMusicPlaying(true);
    const audio = ensureAudio();
    audio.play().catch(console.error);
  }, [ensureAudio]);

  const toggleMusic = useCallback(() => {
    const audio = ensureAudio();
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsMusicPlaying((playing) => !playing);
  }, [ensureAudio, isMusicPlaying]);

  const handleEnvelopeComplete = useCallback(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      setShowInvitation(true);
    });
  }, []);

  if (isAdminRoute()) {
    return (
      <>
        <Toaster position="top-center" />
        <Admin />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <InvitationContent
        active={showInvitation}
        eventParam={eventParam}
        fullInviteeName={fullInviteeName}
        eventLabel={eventLabel}
        weddingDate={weddingDate}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        isWaleema={isWaleema}
      />

      <AnimatePresence mode="wait">
        {!showInvitation && (
          <WelcomeScreen
            key="welcome"
            onComplete={handleEnvelopeComplete}
            onMusicStart={handleMusicStart}
            readyToTransition={assetsReady}
          />
        )}
      </AnimatePresence>
      
      {/* Hidden video to force preload across all devices */}
      <video src="/intro.mp4" preload="auto" muted playsInline style={{ display: 'none' }} />
    </>
  );
}
