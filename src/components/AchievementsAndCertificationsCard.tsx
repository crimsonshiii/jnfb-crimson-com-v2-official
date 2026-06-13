import React from 'react';
import { Award, Sparkles, Zap, ClipboardList } from 'lucide-react';
import { jnfbCertifications, jnfbAchievements } from '../data';

export default function AchievementsAndCertificationsCard() {
  return (
    <section id="achievements" className="scroll-mt-20 space-y-6">
      <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-red-500" />
          Achievements & Certifications
        </h2>
        <span className="font-mono text-xs text-zinc-500 font-bold">AUTHENTICATED // SECURE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Certifications block */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2 pl-1.5">
            <Sparkles className="w-4 h-4 text-red-500" />
            TECHNICAL_CERTIFICATIONS (VERIFIED)
          </h3>

          <div className="space-y-3">
            {jnfbCertifications.map((cert) => (
              <div 
                key={cert.id} 
                className="p-4 bg-[#0c0c0c] border border-zinc-800/40 hover:border-red-900/30 hover:bg-[#0c0c0c]/90 rounded-lg transition-all duration-300 flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-950/25 text-red-500 rounded-lg border border-red-900/10">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{cert.title}</h4>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{cert.issuer} ({cert.year})</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0">
                  {cert.location.split(',')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* General & Organizational Achievements */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2 pl-1.5">
            <ClipboardList className="w-4 h-4 text-red-500" />
            ACCOLADES_AND_ORGANIZATIONAL_SECRETARY
          </h3>

          <div className="space-y-3">
            {jnfbAchievements.map((achievement) => {
              const isCivil = achievement.id === 'csc-eligibility';
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-300 space-y-2 select-none hover:border-red-900/30 ${
                    isCivil 
                      ? 'bg-amber-950/10 border-amber-900/30 hover:border-amber-700/50 p-5' 
                      : 'bg-[#0c0c0c] border-zinc-800/40 hover:bg-[#0c0c0c]/90'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded ${isCivil ? 'bg-amber-950 text-amber-500' : 'bg-red-950/20 text-red-500'}`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <h4 className={`text-sm font-bold ${isCivil ? 'text-amber-400' : 'text-zinc-100'}`}>
                        {achievement.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans font-normal pl-8">
                    {achievement.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
