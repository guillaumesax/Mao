import React, { useState } from 'react';
import { Music, Sliders, Layers, PlayCircle, CheckSquare, Headphones, MoreHorizontal, Settings } from 'lucide-react';
import { SectionData, ChecklistItem } from './types';
import StepCard from './components/StepCard';
import { DrumVisualizer, StructureVisualizer } from './components/PatternVisualizer';
import AiTutor from './components/AiTutor';

// Data from the prompt
const sections: SectionData[] = [
  {
    title: "Batterie (Drum Rack)",
    icon: Layers,
    color: "indigo",
    content: [
      { label: "Kick", value: "Temps 1 – 2 – 3 – 4", subtext: "Four-on-the-floor (Noires)" },
      { label: "Clap / Snare", value: "Temps 2 et 4", subtext: "Superposé au Kick" },
      { label: "Closed Hat", value: "Contretemps (1& 2& 3& 4&)", subtext: "Entre les Kicks" },
      { label: "Open Hat", value: "Temps 4&", subtext: "Optionnel, pour donner du swing" }
    ]
  },
  {
    title: "Basse (Simpler)",
    icon: Music,
    color: "cyan",
    content: [
      { label: "Son", value: "Basse simple (Saw/Square filtrée)" },
      { label: "Notes", value: ["Mesure 1 : A (La)", "Mesure 2 : G (Sol)"] },
      { label: "Rythme", value: "Noires ou Blanches", subtext: "Rester minimaliste" }
    ]
  },
  {
    title: "Accords",
    icon: MoreHorizontal,
    color: "pink",
    content: [
      { label: "Progression", value: "Am7 – G – Fmaj7 – G" },
      { label: "Placement", value: "1 Accord par mesure" },
      { label: "Jeu", value: "Jeu en contretemps (Offbeat)", subtext: "Anticiper ou retarder les temps forts" }
    ]
  },
  {
    title: "Effet House",
    icon: Sliders,
    color: "yellow",
    content: [
      { label: "Sidechain", value: "Compressor depuis le Kick", subtext: "Ratio modéré, réglage léger" },
      { label: "Alternative", value: "Auto Pan", subtext: "Rate: 1/4 note (effet de pompe)" }
    ]
  }
];

const checklistData: ChecklistItem[] = [
  { id: '1', text: "Batterie House (Kick 4/4, Hats offbeat)", completed: false },
  { id: '2', text: "Ligne de basse simple (A - G)", completed: false },
  { id: '3', text: "Accords placés en contretemps", completed: false },
  { id: '4', text: "Structure claire (32 mesures)", completed: false },
  { id: '5', text: "Au moins 1 automation (Filtre, Volume...)", completed: false }
];

export default function App() {
  const [checklist, setChecklist] = useState(checklistData);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const progress = Math.round((checklist.filter(c => c.completed).length / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 text-slate-100 pb-20">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Headphones className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">FICHE ÉLÈVE – HOUSE DÉBUTANT</h1>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <PlayCircle size={14} /> 
                Référence : <span className="text-indigo-400 font-semibold">JAK – « Riviera »</span>
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">BPM</span>
              <span className="text-lg font-mono font-bold text-cyan-400">124</span>
            </div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Signature</span>
              <span className="text-lg font-mono font-bold text-slate-200">4/4</span>
            </div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Gamme</span>
              <span className="text-lg font-mono font-bold text-pink-400">Am</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Top Info Banner (Mobile friendly params) */}
        <div className="md:hidden grid grid-cols-3 gap-2 mb-6">
           <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
              <div className="text-xs text-slate-500">BPM</div>
              <div className="text-xl font-bold text-cyan-400">124</div>
           </div>
           <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
              <div className="text-xs text-slate-500">Gamme</div>
              <div className="text-xl font-bold text-pink-400">Am</div>
           </div>
           <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
              <div className="text-xs text-slate-500">DAW</div>
              <div className="text-xl font-bold text-slate-200">Live</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="text-slate-400" size={20} />
              <h2 className="text-2xl font-bold text-white">Instructions de Composition</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <StepCard key={index} data={section} index={index} />
              ))}
            </div>

            {/* Structure Section */}
            <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">5. Structure (32 Mesures)</h3>
              </div>
              <p className="text-slate-400 mb-4">Organiser les clips dans la vue Arrangement.</p>
              <StructureVisualizer />
            </div>

            {/* Visualizer Section */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Aide Visuelle : Rythme</h3>
              <DrumVisualizer />
            </div>
          </div>

          {/* Right Column: Checklist & Progress */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CheckSquare className="text-emerald-400" />
                    Checklist
                  </h2>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${progress === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 mb-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <label 
                      key={item.id} 
                      className={`flex items-start space-x-3 p-3 rounded-xl transition-all cursor-pointer border ${item.completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/50 border-transparent hover:bg-slate-700/50'}`}
                    >
                      <div className="relative flex items-center mt-1">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleCheck(item.id)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-500 rounded checked:bg-emerald-500 checked:border-emerald-500 transition-colors"
                        />
                        <svg className="absolute w-3 h-3 text-white hidden peer-checked:block left-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm ${item.completed ? 'text-slate-300 line-through decoration-slate-500' : 'text-slate-200'}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6">
                <h3 className="font-bold text-indigo-200 mb-2">Astuce Pro</h3>
                <p className="text-sm text-indigo-300/80 italic">
                  "Pour la basse, utilise un son simple (Onde en Dent de scie ou Carrée) et filtre les hautes fréquences avec un Low Pass Filter pour un son 'Deep'."
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
      
      {/* Floating AI Tutor */}
      <AiTutor />

    </div>
  );
}