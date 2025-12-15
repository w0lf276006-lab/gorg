import React, { useState } from 'react';
import { EnergyTask } from '../types';
import { CharacterDisplay } from '../components/CharacterDisplay';
import { Button } from '../components/Button';
import { getSepandComment } from '../services/geminiService';

const INITIAL_TASKS: EnergyTask[] = [
  { id: '1', text: 'خاموش کردن لامپ‌های اضافه اتاق', completed: false, points: 10 },
  { id: '2', text: 'کم کردن درجه بخاری و پوشیدن لباس گرم', completed: false, points: 20 },
  { id: '3', text: 'استفاده از نور طبیعی در روز', completed: false, points: 10 },
  { id: '4', text: 'کشیدن دوشاخه لوازم برقی غیرضروری', completed: false, points: 15 },
  { id: '5', text: 'بستن در و پنجره‌ها برای حفظ گرما', completed: false, points: 15 },
];

interface ChecklistProps {
  sepandImg: string;
}

export const Checklist: React.FC<ChecklistProps> = ({ sepandImg }) => {
  const [tasks, setTasks] = useState<EnergyTask[]>(INITIAL_TASKS);
  const [sepandMessage, setSepandMessage] = useState("کمکم کن شارژ بشم!");
  
  const totalPoints = tasks.reduce((acc, curr) => curr.completed ? acc + curr.points : acc, 0);
  const maxPoints = tasks.reduce((acc, curr) => acc + curr.points, 0);
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    if (!task.completed) {
      // Just finished a task
      const comment = await getSepandComment(task.text);
      setSepandMessage(comment);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      
      {/* Sidebar / Status */}
      <div className="w-full md:w-1/3 flex flex-col items-center bg-yalda-dark/60 p-6 rounded-3xl border border-yalda-gold/30 sticky top-4">
        <CharacterDisplay name="سپند" defaultImage={sepandImg} isRobot message={sepandMessage} />
        
        <div className="mt-8 w-full">
          <div className="flex justify-between text-sm mb-2 text-yalda-gold font-bold">
            <span>سطح انرژی سپند</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-6 border-2 border-white/20 overflow-hidden relative">
            <div 
              className="bg-gradient-to-r from-yellow-600 to-yellow-300 h-full transition-all duration-1000 ease-out flex items-center justify-end px-2"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && <span className="text-yellow-900 text-xs font-bold animate-pulse">⚡</span>}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
            <h3 className="text-2xl font-black text-white">{totalPoints}</h3>
            <span className="text-gray-300 text-sm">امتیاز کل</span>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="w-full md:w-2/3 space-y-4">
        <h2 className="text-3xl font-black text-white mb-6 drop-shadow-md">لیست ماموریت‌های انرژی</h2>
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`
              cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group
              ${task.completed 
                ? 'bg-green-900/40 border-green-500/50 scale-[0.98] opacity-80' 
                : 'bg-yalda-dark/80 border-white/10 hover:border-yalda-gold hover:bg-yalda-dark hover:scale-[1.02] shadow-lg'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                ${task.completed ? 'bg-green-500 border-green-500' : 'bg-transparent border-gray-400 group-hover:border-yalda-gold'}
              `}>
                {task.completed && <span className="text-white font-bold">✓</span>}
              </div>
              <span className={`text-lg font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                {task.text}
              </span>
            </div>
            <span className={`
              text-sm font-bold px-3 py-1 rounded-full
              ${task.completed ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
            `}>
              {task.points} امتیاز
            </span>
          </div>
        ))}

        {percentage === 100 && (
          <div className="mt-8 bg-gradient-to-r from-yalda-gold to-orange-500 p-6 rounded-3xl text-center text-yalda-dark font-black shadow-[0_0_30px_rgba(255,215,0,0.6)] animate-bounce">
            🎉 هورا! سپند فول شارژ شد! یلداتون مبارک! 🎉
          </div>
        )}
      </div>

    </div>
  );
};