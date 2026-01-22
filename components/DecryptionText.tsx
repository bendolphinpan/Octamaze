import React, { useEffect, useState } from 'react';

interface DecryptionTextProps {
  text: string;
  className?: string;
  speed?: number;
  revealDelay?: number;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

export const DecryptionText: React.FC<DecryptionTextProps> = ({ 
  text, 
  className = '', 
  speed = 50,
  revealDelay = 0 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    let interval: number;
    let iteration = 0;
    
    const startTimeout = setTimeout(() => {
      setDisplayText(
        text.split('').map((char) => {
            if (char === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }).join('')
      );
      
      setIsRevealing(true);
      
      interval = window.setInterval(() => {
        setDisplayText(_ => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);

    }, revealDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, revealDelay]);

  // To prevent layout jumping, we render each character in an inline-grid slot
  // where a hidden version of the final character defines the width.
  return (
    <span className={`inline transition-opacity duration-200 ${className} ${isRevealing ? 'opacity-100' : 'opacity-0'}`}>
      {text.split('').map((char, index) => (
        <span key={index} className="inline-grid grid-cols-1 grid-rows-1 align-bottom">
          {/* Invisible target character defines the exact width of the slot */}
          <span className="invisible row-start-1 col-start-1 whitespace-pre">
            {char}
          </span>
          {/* Visible animating character stays centered in that fixed-width slot */}
          <span className="row-start-1 col-start-1 text-center whitespace-pre overflow-visible">
            {displayText[index] || char}
          </span>
        </span>
      ))}
    </span>
  );
};