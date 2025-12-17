import React from 'react';

export const DrumVisualizer = () => {
  // 16 steps (4 bars of 4/16 or 1 bar of 16th notes)
  // Kick on 1, 5, 9, 13 (1, 2, 3, 4 quarter notes)
  // Clap on 5, 13 (2 and 4)
  // Closed Hat on offbeats (3, 7, 11, 15)
  // Open Hat on 15 (4&)
  
  const steps = Array.from({ length: 16 }, (_, i) => i + 1);

  const getActive = (step: number, type: 'kick' | 'clap' | 'chat' | 'ohat') => {
    // 0-indexed logic internally
    const s = step - 1; 
    if (type === 'kick') return s % 4 === 0;
    if (type === 'clap') return s === 4 || s === 12; // Beats 2 and 4 (indices 4 and 12 in 16-step grid)
    if (type === 'chat') return s % 2 !== 0; // Offbeats (1&, 2&...)
    if (type === 'ohat') return s === 14; // 4& (index 14)
    return false;
  };

  return (
    <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
      <div className="text-xs text-slate-400 mb-2 flex justify-between">
        <span>1</span><span>&</span><span>2</span><span>&</span>
        <span>3</span><span>&</span><span>4</span><span>&</span>
      </div>
      <div className="grid grid-cols-16 gap-1 mb-2">
        {steps.map(s => (
          <div key={`k-${s}`} className={`h-8 rounded-sm ${getActive(s, 'kick') ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`} title="Kick" />
        ))}
      </div>
      <div className="grid grid-cols-16 gap-1 mb-2">
        {steps.map(s => (
          <div key={`c-${s}`} className={`h-6 rounded-sm ${getActive(s, 'clap') ? 'bg-cyan-400' : 'bg-slate-800'}`} title="Clap/Snare" />
        ))}
      </div>
      <div className="grid grid-cols-16 gap-1">
        {steps.map(s => (
          <div key={`h-${s}`} className={`h-4 rounded-sm ${getActive(s, 'chat') ? 'bg-yellow-400' : getActive(s, 'ohat') ? 'bg-orange-500' : 'bg-slate-800'}`} title="HiHats" />
        ))}
      </div>
      <div className="text-[10px] text-slate-600 mt-2 text-center uppercase tracking-widest">Drum Grid (16th notes)</div>
    </div>
  );
};

export const StructureVisualizer = () => {
  return (
    <div className="flex w-full mt-4 h-12 rounded-lg overflow-hidden text-xs font-bold text-center leading-[3rem]">
      <div className="w-1/4 bg-slate-700 text-slate-300 border-r border-slate-900">INTRO (8)</div>
      <div className="w-1/4 bg-indigo-600 text-indigo-100 border-r border-slate-900">PARTIE A (8)</div>
      <div className="w-1/4 bg-slate-600 text-slate-300 border-r border-slate-900">BREAK (8)</div>
      <div className="w-1/4 bg-pink-600 text-white">DROP (8)</div>
    </div>
  );
};