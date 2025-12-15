import React from 'react';

export const SnowEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Creating a simple star/snow field with CSS box-shadow would be performant, 
            but for this implementation, we use a simple gradient overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-yellow-100/20 text-6xl animate-pulse">✨</div>
        <div className="absolute bottom-20 right-20 text-yellow-100/20 text-4xl animate-pulse delay-700">✨</div>
        <div className="absolute top-1/2 left-1/4 text-red-500/10 text-9xl">🍉</div>
    </div>
  );
};