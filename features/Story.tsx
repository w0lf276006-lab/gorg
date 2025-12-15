import React, { useState } from 'react';
import { Button } from '../components/Button';
import { CharacterDisplay } from '../components/CharacterDisplay';
import { generateYaldaStory } from '../services/geminiService';

interface StoryProps {
  sabaImg: string;
  sepandImg: string;
}

export const Story: React.FC<StoryProps> = ({ sabaImg, sepandImg }) => {
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("صرفه جویی در برق");

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateYaldaStory(topic);
    setStory(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
      <h2 className="text-3xl font-black text-yalda-gold drop-shadow-md">قصه‌های یلدایی</h2>
      
      <div className="flex justify-around w-full max-w-lg mb-4">
        <CharacterDisplay name="صبا" defaultImage={sabaImg} />
        <CharacterDisplay name="سپند" defaultImage={sepandImg} isRobot message={story ? "چه قصه قشنگی!" : "قصه بگو!"} />
      </div>

      <div className="w-full bg-yalda-dark/50 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
        {!story ? (
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-200">موضوع قصه امشب چی باشه؟</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['صرفه جویی در برق', 'گرمای کرسی', 'هندوانه شیرین', 'باتری خالی سپند'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-4 py-2 rounded-full border transition-colors ${topic === t ? 'bg-yalda-red text-white border-yalda-red' : 'bg-transparent text-gray-300 border-gray-500 hover:border-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={handleGenerate} isLoading={loading}>
                 ✨ تعریف کن
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-black/20 p-6 rounded-xl border border-white/5 leading-9 text-justify whitespace-pre-line">
              {story}
            </div>
            <div className="mt-6 flex justify-center">
              <Button variant="secondary" onClick={() => setStory("")}>
                یک قصه دیگه
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};