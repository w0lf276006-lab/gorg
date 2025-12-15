import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateFalHafez } from '../services/geminiService';
import { CharacterDisplay } from '../components/CharacterDisplay';

interface FalProps {
  sepandImg: string;
}

export const Fal: React.FC<FalProps> = ({ sepandImg }) => {
  const [result, setResult] = useState<{ poem: string; interpretation: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'intro' | 'nit' | 'result'>('intro');

  const handleNiyat = async () => {
    setLoading(true);
    const rawJson = await generateFalHafez();
    try {
      const parsed = JSON.parse(rawJson);
      setResult(parsed);
      setStep('result');
    } catch (e) {
      setResult({ poem: "خطا در تفسیر", interpretation: "لطفا دوباره تلاش کنید." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8">
      <h2 className="text-3xl font-black text-yalda-gold">فال حافظ با سپند</h2>
      
      {step === 'intro' && (
        <div className="bg-yalda-dark/60 p-8 rounded-3xl border-2 border-yalda-gold/30 shadow-2xl flex flex-col items-center gap-6">
          <CharacterDisplay name="سپند" defaultImage={sepandImg} isRobot message="من برات فال میگیرم!" />
          <p className="text-xl leading-8">
            ای حافظ شیرازی، تو کاشف هر رازی... <br/>
            نیت کن تا سپند با انرژی مثبت برات فال بگیره!
          </p>
          <Button onClick={() => setStep('nit')} className="text-xl px-8">
            نیت کردم 📿
          </Button>
        </div>
      )}

      {step === 'nit' && (
        <div className="bg-yalda-dark/60 p-12 rounded-3xl border-2 border-yalda-gold/30 shadow-2xl flex flex-col items-center gap-6">
          <div className="animate-pulse text-6xl mb-4">📖</div>
          <p className="text-lg">در حال ارتباط با حافظه ابری و دیوان حافظ...</p>
          <Button onClick={handleNiyat} isLoading={loading}>
            باز کردن فال
          </Button>
        </div>
      )}

      {step === 'result' && result && (
        <div className="space-y-6">
           <div className="bg-gradient-to-b from-yalda-cream to-white text-yalda-dark p-8 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.2)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-yalda-red"></div>
             <div className="absolute bottom-0 left-0 w-full h-2 bg-yalda-green"></div>
             
             <h3 className="text-yalda-red font-bold text-xl mb-6">🪶 غزلی از خواجه حافظ شیرازی</h3>
             <p className="font-bold text-lg leading-10 whitespace-pre-line border-b-2 border-yalda-gold/20 pb-6 mb-6">
               {result.poem}
             </p>
             
             <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-blue-800 font-bold mb-2 flex items-center justify-center gap-2">
                   🤖 تفسیر رباتیک سپند:
                </h4>
                <p className="text-gray-700 leading-7">
                  {result.interpretation}
                </p>
             </div>
           </div>
           
           <Button variant="secondary" onClick={() => { setStep('intro'); setResult(null); }}>
             یک فال دیگر
           </Button>
        </div>
      )}
    </div>
  );
};