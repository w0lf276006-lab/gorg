import React, { useState } from 'react';
import { AppSection } from './types';
import { Story } from './features/Story';
import { Fal } from './features/Fal';
import { Checklist } from './features/Checklist';
import { SnowEffect } from './components/SnowEffect';
import { Button } from './components/Button';

// Placeholder images - The prompt implies specific characters, 
// using these placeholders with the option in CharacterDisplay to upload real ones is the best UX.
// In a real scenario, these would be the URLs provided by the user.
const DEFAULT_SABA_IMG = "https://picsum.photos/seed/saba_yalda/400/400"; 
const DEFAULT_SEPAND_IMG = "https://picsum.photos/seed/sepand_robot/400/400"; 

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);

  const renderSection = () => {
    switch (section) {
      case AppSection.STORY:
        return <Story sabaImg={DEFAULT_SABA_IMG} sepandImg={DEFAULT_SEPAND_IMG} />;
      case AppSection.FAL:
        return <Fal sepandImg={DEFAULT_SEPAND_IMG} />;
      case AppSection.CHECKLIST:
        return <Checklist sepandImg={DEFAULT_SEPAND_IMG} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-10 py-10 animate-fade-in">
            <div className="text-center space-y-4 max-w-2xl px-4">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yalda-red via-red-500 to-yalda-gold drop-shadow-lg leading-tight py-2">
                یلدای باصرفه
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light">
                با صبا و سپند، طولانی‌ترین شب سال رو جشن بگیریم <br/> و حواسمون به مصرف انرژی هم باشه!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl px-6 justify-center">
              <div 
                onClick={() => setSection(AppSection.STORY)}
                className="group flex-1 bg-yalda-dark/80 backdrop-blur-sm border-2 border-white/10 hover:border-yalda-red p-6 rounded-3xl cursor-pointer transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(211,47,47,0.4)] flex flex-col items-center gap-4"
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">📖</span>
                <h3 className="text-2xl font-bold">قصه‌گویی</h3>
                <p className="text-center text-sm text-gray-300">داستان‌های اختصاصی صبا و سپند برای یلدا</p>
              </div>

              <div 
                 onClick={() => setSection(AppSection.FAL)}
                 className="group flex-1 bg-yalda-dark/80 backdrop-blur-sm border-2 border-white/10 hover:border-yalda-gold p-6 rounded-3xl cursor-pointer transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] flex flex-col items-center gap-4"
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🕯️</span>
                <h3 className="text-2xl font-bold">فال حافظ</h3>
                <p className="text-center text-sm text-gray-300">نیت کن و ببین حافظ چی میگه</p>
              </div>

              <div 
                 onClick={() => setSection(AppSection.CHECKLIST)}
                 className="group flex-1 bg-yalda-dark/80 backdrop-blur-sm border-2 border-white/10 hover:border-green-500 p-6 rounded-3xl cursor-pointer transition-all hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(56,142,60,0.4)] flex flex-col items-center gap-4"
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">⚡</span>
                <h3 className="text-2xl font-bold">ماموریت انرژی</h3>
                <p className="text-center text-sm text-gray-300">به سپند کمک کن شارژ بمونه</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden pb-12">
      <SnowEffect />
      
      {/* Header */}
      <header className="relative z-10 w-full p-4 flex justify-between items-center max-w-6xl mx-auto">
        {section !== AppSection.HOME && (
          <Button variant="secondary" onClick={() => setSection(AppSection.HOME)} className="!px-4 !py-2 text-sm">
            🏠 بازگشت به خانه
          </Button>
        )}
        <div className="flex gap-2 text-2xl">
           <span>🍉</span>
           <span className="hidden md:inline font-bold text-white">یلدا مبارک</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full pt-4 md:pt-10">
        {renderSection()}
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
