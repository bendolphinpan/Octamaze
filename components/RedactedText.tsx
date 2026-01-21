import React from 'react';

interface RedactedTextProps {
  text: string;
  className?: string;
}

export const RedactedText: React.FC<RedactedTextProps> = ({ text, className = '' }) => {
  // Regex to find content inside [[ ]]
  // The capturing group (group 1) will include the brackets for identification
  const parts = text.split(/(\[\[.*?\]\])/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          // Remove brackets and render as redacted
          const content = part.slice(2, -2);
          return (
            <span key={index} className="redacted select-none transition-colors duration-300">
              {content}
            </span>
          );
        }
        // Render normal text
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};