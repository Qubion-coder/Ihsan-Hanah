import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onComplete: () => void;
  onMusicStart?: () => void;
  readyToTransition?: boolean;
}

export function WelcomeScreen({ onComplete, onMusicStart, readyToTransition = true }: WelcomeScreenProps) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startEntry = () => {
    if (!readyToTransition || started) return;
    
    setStarted(true);
    if (onMusicStart) {
      onMusicStart();
    }
    
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <>
      <style>{`
        .video-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: auto;
          background: #000;
          cursor: pointer;
        }
        .video-container video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
      <motion.div 
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="video-container" onClick={startEntry}>
          <video 
            ref={videoRef}
            src="/intro.mp4#t=0.001" 
            playsInline
            muted
            onEnded={handleVideoEnd}
          />
        </div>
      </motion.div>
    </>
  );
}
