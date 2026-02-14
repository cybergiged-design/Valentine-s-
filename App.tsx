
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Position } from './types';
import { COLORS, LOVE_AUDIO_URL } from './constants';
import FlowerBurst from './components/FlowerBurst';
import FloatingHearts from './components/FloatingHearts';
import BackgroundTypography from './components/BackgroundTypography';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState<Position | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNoInteraction = useCallback(() => {
    // Shake the main container
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);

    // Escape cursor - find safe random position within viewport
    const btnWidth = 120;
    const btnHeight = 50;
    const padding = 50;
    
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    setNoButtonPos({
      x: Math.max(padding, Math.random() * maxX),
      y: Math.max(padding, Math.random() * maxY),
    });
  }, []);

  const handleYes = () => {
    setIsAccepted(true);
    
    // Play romantic audio
    if (!audioRef.current) {
      audioRef.current = new Audio(LOVE_AUDIO_URL);
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(e => console.log("Audio play blocked", e));
  };

  return (
    <main 
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-transition font-['Poppins']`}
      style={{ backgroundColor: isAccepted ? COLORS.WHITE : COLORS.SOFT_RED }}
    >
      {/* Background States */}
      {!isAccepted && <FloatingHearts />}
      {isAccepted && (
        <>
          <BackgroundTypography />
          <FlowerBurst />
        </>
      )}

      {/* Main Valentine Card/Heart */}
      <div 
        className={`
          relative z-10 
          w-[300px] h-[300px] 
          shadow-[0px_20px_60px_rgba(0,0,0,0.15)] 
          flex flex-col items-center justify-center p-8 
          transition-all duration-[700ms] ease-in-out
          ${isShaking ? 'animate-shake' : ''}
          ${isAccepted ? 'bg-[#FF4D6D] scale-[1.2]' : 'bg-white rounded-[28px]'}
        `}
        style={isAccepted ? {
          clipPath: 'path("M12 21.593c-5.63-5.54-11-10.231-11-15.093 0-4.001 3.058-7.5 7-7.5 2.21 0 4.192 1.11 5.41 2.84 1.218-1.73 3.2-2.84 5.41-2.84 3.942 0 7 3.499 7 7.5 0 4.862-5.37 9.553-11 15.093z")',
          transform: 'scale(15) translateY(2px)', // Massive scale to fill heart look
          transformOrigin: 'center center'
        } : {}}
      >
        <h1 
          className={`
            font-semibold text-center leading-tight
            text-[28px] text-[#1D1D1F]
            transition-opacity duration-500
            ${isAccepted ? 'opacity-0 select-none pointer-events-none' : 'opacity-100'}
          `}
        >
          Will you be my Valentine?
        </h1>
      </div>

      {/* Action Buttons */}
      <div 
        className={`
          mt-12 flex items-center gap-6 z-20 
          transition-all duration-500
          ${isAccepted ? 'opacity-0 pointer-events-none scale-90 translate-y-10' : 'opacity-100 translate-y-0'}
        `}
      >
        <button
          onClick={handleYes}
          className="bg-[#FF4D6D] text-white px-10 py-4 rounded-full font-semibold shadow-[0px_10px_25px_rgba(255,77,109,0.35)] transition-all hover:scale-110 active:scale-95 text-lg"
        >
          Yes
        </button>

        <button
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          className="bg-white text-[#1D1D1F] border-2 border-[#E63946] px-10 py-4 rounded-full font-semibold transition-all duration-300 ease-out text-lg"
          style={noButtonPos ? {
            position: 'fixed',
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
            zIndex: 100,
          } : {}}
        >
          No
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </main>
  );
};

export default App;
