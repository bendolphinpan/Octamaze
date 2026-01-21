import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-2 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 shadow-md hover:shadow-lg",
    outline: "border border-stone-400 text-stone-800 hover:bg-stone-200 hover:border-stone-500 backdrop-blur-sm"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};