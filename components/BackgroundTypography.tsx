
import React from 'react';

const BackgroundTypography: React.FC = () => {
  const rows = Array.from({ length: 10 });
  const text = "YOU MADE MY DAY ❤️ ";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex flex-col justify-around">
      <style>{`
        @keyframes scrollText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-text {
          white-space: nowrap;
          display: inline-block;
          animation: scrollText 20s linear infinite;
        }
        .scrolling-text:nth-child(even) {
          animation-direction: reverse;
        }
      `}</style>
      {rows.map((_, i) => (
        <div key={i} className="flex overflow-hidden">
          <div className="scrolling-text font-['Poppins'] font-bold text-[#FF4D6D] opacity-[0.08] text-[80px] md:text-[150px] leading-none">
            {text.repeat(10)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackgroundTypography;
