import React from 'react';
import { Languages } from 'lucide-react';
import { jnfbProfile } from '../data';

export default function Biodata() {
  return (
    <div className="bg-[#0c0c0c] border border-zinc-800/40 rounded-lg p-6 space-y-4 hover:border-red-900/30 transition-all duration-300">
      <h3 className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
        REAGENT_BIODATA
      </h3>
      <div className="space-y-3 text-sm font-sans">
        <div className="flex justify-between py-1 border-b border-zinc-800/30">
          <span className="text-zinc-500 font-mono">CIVIL STATUS:</span>
          <span className="text-zinc-200 font-bold">{jnfbProfile.civilStatus}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800/30">
          <span className="text-zinc-500 font-mono">BIRTHDATE:</span>
          <span className="text-zinc-200 font-bold">{jnfbProfile.birthDate}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800/30">
          <span className="text-zinc-500 font-mono">BIRTHPLACE:</span>
          <span className="text-zinc-200 font-bold">Manila, PH</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800/30">
          <span className="text-zinc-500 font-mono font-bold text-red-500">AGE PARAMETER:</span>
          <span className="text-red-500 font-bold font-mono">22 Years</span>
        </div>
        <div className="flex justify-between py-1 border-b border-zinc-800/30">
          <span className="text-zinc-500 font-mono">STATION CODE:</span>
          <span className="text-zinc-200 font-mono font-bold">UMAK-CS-APPMOB</span>
        </div>
      </div>

      {/* Language skills */}
      <div className="pt-2">
        <h4 className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-zinc-500" /> Communicative Interfaces
        </h4>
        <div className="space-y-2 text-xs">
          {jnfbProfile.languages.map((lang, idx) => (
            <div key={idx} className="flex justify-between bg-[#0a0a0a] p-2 rounded border border-zinc-805/40">
              <span className="font-bold text-zinc-300">{lang.name}</span>
              <span className="text-zinc-500 font-mono text-[10px]">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
