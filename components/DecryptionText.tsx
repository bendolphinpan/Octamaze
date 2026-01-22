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
        setDisplayText(prev => {
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

  return (
    <span className={`inline-block whitespace-nowrap transition-opacity duration-200 ${className} ${isRevealing ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
    </span>
  );
};