import React from 'react';
import { Cpu, Tv, CheckCircle2 } from 'lucide-react';
import { Experience } from '../data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExperienceCardProps {
  job: Experience;
  key?: string | number;
}

export default function ExperienceCard({ job }: ExperienceCardProps) {
  const isCreator = job.id === 'youtube-freelance';

  return (
    <Card 
      className={`bg-[#0c0c0c] border rounded-lg p-6 space-y-4 relative overflow-hidden transition-all duration-300 hover:border-red-900/40 ${
        isCreator ? 'border-red-900/30' : 'border-zinc-800/50'
      }`}
    >
      {isCreator && (
        <div className="absolute top-0 right-0 h-16 w-16 pointer-events-none overflow-hidden block">
          <div className="absolute transform rotate-45 bg-red-700 text-[8px] font-mono font-bold tracking-wider text-white text-center py-1 px-4 top-2 right-[-24px] uppercase shadow-sm">
            Live
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-zinc-800/30 pb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${isCreator ? 'bg-red-950/40 text-red-500' : 'bg-[#0a0a0a] text-zinc-400 border border-zinc-800/50'}`}>
            {isCreator ? <Tv className="w-5 h-5 animate-pulse" /> : <Cpu className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors leading-snug">
              {job.role}
            </h3>
            <p className="text-xs text-red-500 font-mono font-bold mt-1">{job.company}</p>
          </div>
        </div>

        <div className="text-left md:text-right text-xs font-mono shrink-0 space-y-1.5 flex flex-col md:items-end">
          <Badge className="bg-[#0a0a0a] px-2.5 py-1 rounded border border-zinc-800/50 text-zinc-400 font-bold inline-block hover:bg-[#0a0a0a]">
            {job.duration}
          </Badge>
          <span className="text-zinc-500 block text-[10px]">{job.location}</span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {job.bullets.map((bullet, bIdx) => (
          <div key={bIdx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed font-sans font-normal">
            <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      {isCreator && (
        <div className="mt-4 pt-3 border-t border-zinc-800/30 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#0a0a0a]/50 p-3 rounded-lg border border-zinc-800/40 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block uppercase text-[9px] tracking-wider mb-0.5">Focus Titles</span>
            <span className="text-red-500 font-bold">The Outlast Trials, R.E.P.O.</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase text-[9px] tracking-wider mb-0.5">Media Gear</span>
            <span className="text-zinc-300 font-medium">OBS Studio, Steam In-built Recording</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase text-[9px] tracking-wider mb-0.5">Metrics Tracked</span>
            <span className="text-zinc-350 font-medium font-bold text-zinc-400">CTR, Retention, Demographics</span>
          </div>
        </div>
      )}
    </Card>
  );
}
