
import React, { useState, useEffect } from 'react';
import { Flower } from '../types';
import { FLOWER_EMOJIS } from '../constants';

const FlowerBurst: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const interval = setInterval(() => {
      const newFlower: Flower = {
        id: idCounter++,
        emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
        left: `${Math.random() * 100}%`,
        duration: 2 + Math.random() * 3,
        size: 20 + Math.random() * 30,
        drift: (Math.random() - 0.5) * 40,
      };

      setFlowers(prev => [...prev, newFlower]);

      // Cleanup flower after animation finishes
      setTimeout(() => {
        setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
      }, (newFlower.duration + 0.5) * 1000);
    }, 150);

    // Stop spawning after 3 seconds as requested
    const timeout = setTimeout(() => clearInterval(interval), 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flowers.map(flower => (
        <span
          key={flower.id}
          className="flower-particle"
          style={{
            left: flower.left,
            bottom: '-50px',
            fontSize: `${flower.size}px`,
            animationDuration: `${flower.duration}s`,
            '--drift': `${flower.drift}px`
          } as React.CSSProperties}
        >
          {flower.emoji}
        </span>
      ))}
    </div>
  );
};

export default FlowerBurst;
