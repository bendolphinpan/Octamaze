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
  // Initialize with the original text so it takes up the correct space in the DOM immediately
  // (We hide it with opacity-0 via CSS until the delay passes)
  const [displayText, setDisplayText] = useState(text);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    let interval: number;
    let iteration = 0;
    
    // Start after delay
    const startTimeout = setTimeout(() => {
      // Before making it visible, scramble the text so the original doesn't flash
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
              // Keep spaces as spaces
              if (char === ' ') return ' ';
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Slow down the reveal index while characters scramble fast
      }, speed);

    }, revealDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, revealDelay]);

  return (
    <span className={`inline-block transition-opacity duration-200 ${className} ${isRevealing ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
    </span>
  );
};