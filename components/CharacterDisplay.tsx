import React, { useState } from 'react';

interface CharacterDisplayProps {
  name: string;
  defaultImage: string;
  isRobot?: boolean;
  message?: string;
}

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ name, defaultImage, isRobot, message }) => {
  const [imgSrc, setImgSrc] = useState(defaultImage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImgSrc(url);
    }
  };

  return (
    <div className={`flex flex-col items-center relative group ${isRobot ? 'animate-float' : ''}`}>
      {/* Speech Bubble */}
      {message && (
        <div className="absolute -top-16 right-0 bg-white text-yalda-dark p-3 rounded-2xl rounded-br-none shadow-xl border-2 border-yalda-gold max-w-[200px] z-10 text-sm font-bold animate-pulse-slow">
          {message}
        </div>
      )}

      {/* Character Image Container */}
      <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 ${isRobot ? 'border-yalda-gold shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'border-yalda-red shadow-[0_0_20px_rgba(211,47,47,0.5)]'} bg-white`}>
        <img 
          src={imgSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        
        {/* Hover Upload Overlay */}
        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs text-center p-2">
          تغییر عکس {name}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
      
      <div className="mt-2 bg-yalda-dark/80 px-4 py-1 rounded-full border border-white/20 backdrop-blur-sm">
        <span className="text-white font-bold">{name}</span>
      </div>
    </div>
  );
};