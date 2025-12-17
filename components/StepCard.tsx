import React from 'react';
import { SectionData } from '../types';

interface StepCardProps {
  data: SectionData;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ data, index }) => {
  const Icon = data.icon;

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-${data.color}-500 transition-all duration-300 shadow-lg group`}>
      <div className="flex items-center mb-4 space-x-3">
        <div className={`p-3 rounded-lg bg-${data.color}-500/10 text-${data.color}-400 group-hover:text-${data.color}-300 group-hover:bg-${data.color}-500/20 transition-colors`}>
          <Icon size={24} />
        </div>
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Étape {index + 1}</span>
          <h3 className="text-xl font-bold text-slate-100">{data.title}</h3>
        </div>
      </div>

      <div className="space-y-4">
        {data.content.map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
            {item.label && (
              <h4 className={`text-xs font-semibold text-${data.color}-400 mb-1 uppercase tracking-wide`}>
                {item.label}
              </h4>
            )}
            
            {Array.isArray(item.value) ? (
              <ul className="list-disc list-inside space-y-1">
                {item.value.map((v, i) => (
                  <li key={i} className="text-slate-300 text-sm">{v}</li>
                ))}
              </ul>
            ) : (
              <div className="text-slate-200 font-medium">{item.value}</div>
            )}
            
            {item.subtext && (
              <p className="text-xs text-slate-500 mt-1 italic">{item.subtext}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepCard;