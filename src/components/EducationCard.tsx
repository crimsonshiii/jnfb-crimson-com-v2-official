import React from 'react';
import { BookOpen, Award } from 'lucide-react';

export default function EducationCard() {
  return (
    <div className="md:col-span-2 bg-[#0c0c0c] border border-zinc-800/40 rounded-lg p-6 space-y-6 hover:border-red-900/30 transition-all duration-300">
      <h3 className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-red-500" />
        ACADEMIC_INSTITUTIONS
      </h3>

      <div className="space-y-6 relative border-l border-zinc-800/40 pr-1 pl-6 ml-2">
        {/* BSCS University of Makati */}
        <div className="relative">
          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-700 border-4 border-[#0a0a0a]" />
          <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
            <div>
              <h4 className="text-base font-bold text-white">University of Makati</h4>
              <p className="text-xs text-red-500 font-mono font-bold">Bachelor of Science in Computer Science</p>
            </div>
            <span className="font-mono text-[10px] tracking-wider uppercase bg-[#0a0a0a] px-2 py-0.5 rounded border border-zinc-800/50 text-zinc-400">
              2022 - Present
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-1">J.P. Rizal, Extension, West Rembo, Taguig City</p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Concentration in <span className="text-white font-bold">Application Development</span>. Excels at front-end designs, database schema systems, and cross-framework web applications. Maintains strong leadership status inside academic groups.
          </p>
        </div>

        {/* Higher School ng Umak */}
        <div className="relative font-sans">
          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-800 border-4 border-[#0a0a0a]" />
          <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
            <div>
              <h4 className="text-base font-bold text-zinc-200">University of Makati - Higher School ng UMak</h4>
              <p className="text-xs text-zinc-400 font-mono font-bold">Science, Technology, Engineering, and Mathematics (STEM)</p>
            </div>
            <span className="font-mono text-[10px] tracking-wider uppercase bg-[#0a0a0a] px-2 py-0.5 rounded border border-zinc-800/50 text-zinc-500">
              2020 - 2022
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-1">J.P. Rizal, Extension, West Rembo, Taguig City</p>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-950/10 border border-amber-900/30 p-2 rounded-lg mt-2 font-mono">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            Graduated with High Honors (Academic Distinction Badge)
          </div>
        </div>
      </div>
    </div>
  );
}
