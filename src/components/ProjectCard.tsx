import React, { useState, useEffect } from 'react';
import { Project } from '../data';
import { 
  FolderGit2, 
  ExternalLink, 
  Users, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  Terminal,
  Play,
  Github,
  X,
  Clock,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPersonal = project.type === 'personal';

  // Local Web Audio synthesizer for tactile sound feedback matching App.tsx theme
  const playLocalBeep = (freq = 440, type: OscillatorType = 'sine', duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = type;
      oscillator.frequency.value = freq;
      
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if browser blocks audio autoplay context
    }
  };

  const handleOpenModal = () => {
    playLocalBeep(520, 'sine', 0.06);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    playLocalBeep(420, 'sine', 0.06);
    setIsModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Lock document scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <Card
        className="relative group rounded-lg border bg-[#0c0c0c] border-zinc-800/40 hover:border-[#dc2626]/30 hover:bg-[#0c0c0c]/85 shadow-sm transition-all duration-300 overflow-hidden flex flex-col justify-between"
      >
        {/* Top ambient color-bar based on Academic vs Personal */}
        <div 
          className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ${
            isPersonal 
              ? 'bg-gradient-to-r from-red-800 via-red-650 to-rose-700' 
              : 'bg-gradient-to-r from-zinc-700 via-red-800 to-zinc-650'
          }`} 
        />

        {/* Main Content Area using CardContent */}
        <CardContent className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              {/* Card Badge Type using shadcn Badge */}
              <Badge 
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border ${
                  isPersonal 
                    ? 'bg-red-950/40 text-red-500 border-red-900/30' 
                    : 'bg-red-950/20 text-red-400 border-red-900/20'
                }`}
              >
                {project.type} PROJECT
              </Badge>

              {/* Project Duration */}
              <span className="text-xs font-mono text-zinc-500">{project.duration}</span>
            </div>

            {/* Project Name and Icon */}
            <div className="flex items-start gap-3 mb-2">
              <div className={`p-2 rounded-lg border ${isPersonal ? 'bg-red-950/40 text-red-500 border-red-900/20' : 'bg-[#0a0a0a] text-zinc-400 border-zinc-800/50'}`}>
                <FolderGit2 className="w-5 h-5 pointer-events-none" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-red-500 transition-colors">
                  {project.name}
                </h3>
                {/* Developer Role inside the project team */}
                <p className="text-xs font-mono text-zinc-400 font-medium">
                  {project.role}
                </p>
              </div>
            </div>

            {/* Project Bio Description */}
            <p className="text-sm text-zinc-400 mb-4 font-normal leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack Chips Grid using shadcn Badge */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech, idx) => (
                <Badge
                  key={idx}
                  className="px-2.5 py-0.5 rounded bg-[#0a0a0a] border border-zinc-800/45 hover:border-[#dc2626]/30 text-[10px] font-mono text-zinc-400 transition-colors hover:text-white"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Metrics Header */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/30 text-xs font-mono text-zinc-400 mt-auto">
            <div className="flex items-center gap-3">
              {project.teamSize && (
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  Team of {project.teamSize}
                </span>
              )}
              {project.platforms && (
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                  {project.platforms[0]}
                </span>
              )}
            </div>

            <button
              onClick={handleOpenModal}
              className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-all font-bold text-[11px] cursor-pointer group/btn"
            >
              EXPAND SPEC
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modern Sci-Fi Tactical Project Specifications Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
              onClick={handleCloseModal}
            />

            {/* Modal Card Box */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
              className="relative w-full max-w-2xl bg-[#0b0b0b] border border-[#dc2626]/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.12)] flex flex-col max-h-[85vh] z-10"
            >
              {/* Top accent line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 z-30 ${
                  isPersonal 
                    ? 'bg-gradient-to-r from-red-800 via-red-650 to-rose-700' 
                    : 'bg-gradient-to-r from-zinc-700 via-red-800 to-zinc-650'
                }`} 
              />

              {/* Scanning lines effect on background */}
              <div className="scanner-line pointer-events-none opacity-20 z-20" />

              {/* Header section */}
              <div className="p-6 pb-4 border-b border-zinc-800/40 flex items-start justify-between gap-4 bg-[#0d0d0d] relative z-10">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge 
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase border ${
                        isPersonal 
                          ? 'bg-red-950/40 text-red-500 border-red-900/30' 
                          : 'bg-red-950/20 text-red-400 border-red-900/20'
                      }`}
                    >
                      {project.type} CORE
                    </Badge>
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-100 flex items-center gap-2 font-sans tracking-tight">
                    <span className="text-red-500 font-mono text-lg">[FILE]</span>
                    {project.name}
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 font-medium">
                    DIAGNOSTIC ROLE: <span className="text-red-400">{project.role}</span>
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-md border border-zinc-800/60 bg-[#070707] hover:bg-zinc-900 hover:text-red-500 text-zinc-400 transition-all cursor-pointer shadow-sm hover:border-red-900/40"
                  title="Close console"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable specs body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar relative z-10">
                {/* Tactical specs grid */}
                <div className="grid grid-cols-2 gap-4 bg-[#070707] p-4 rounded-lg border border-zinc-800/40 font-mono text-xs text-zinc-400">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block tracking-wider">TEAM_STRUCTURE</span>
                    <span className="text-zinc-200 flex items-center gap-1.5 font-sans font-medium text-sm">
                      <Users className="w-4 h-4 text-red-500" />
                      {project.teamSize ? `Team of ${project.teamSize} developers` : 'Solo execution'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase block tracking-wider">TARGET_RUNTIMES</span>
                    <span className="text-zinc-200 flex items-center gap-1.5 font-sans font-medium text-sm truncate">
                      <Layers className="w-4 h-4 text-red-500" />
                      {project.platforms ? project.platforms.join(', ') : 'Web & API Gateways'}
                    </span>
                  </div>
                </div>

                {/* Narrative overview */}
                <div className="space-y-2">
                  <h4 className="text-zinc-500 font-mono font-bold tracking-widest text-[10px] uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-red-500" />
                    SYSTEM_OVERVIEW_AND_DESCRIPTION
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tech details */}
                <div className="space-y-2.5">
                  <h4 className="text-zinc-500 font-mono font-bold tracking-widest text-[10px] uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-red-500" />
                    DIAGNOSTIC_COMPILATION_STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="px-3 py-1 rounded bg-[#070707] border border-zinc-800/70 hover:border-[#dc2626]/40 text-xs font-mono text-zinc-300 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bulletins of action */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-zinc-500 font-mono font-bold tracking-widest text-[10px] uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-red-500" />
                    CASE_BULLETINS_AND_COMPLETIONS
                  </h4>
                  
                  <div className="space-y-3.5 border-l border-zinc-800/50 pl-4">
                    {project.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-zinc-300 leading-relaxed font-sans text-sm">
                        <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="p-6 bg-[#0d0d0d] border-t border-zinc-800/40 flex flex-wrap gap-3 relative z-10 justify-end">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playLocalBeep(620, 'sine', 0.08)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition-all font-bold text-[11px] tracking-wider uppercase font-mono cursor-pointer"
                  >
                    <Github className="w-4 h-4" /> REPOSITORY SOURCE
                  </a>
                )}

                {project.interactiveLink && (
                  <a
                    href={project.interactiveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playLocalBeep(660, 'sine', 0.08)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 hover:border-red-550/50 text-red-400 hover:text-red-300 transition-all font-bold text-[11px] tracking-wider uppercase font-mono cursor-pointer shadow-[0_0_15px_rgba(185,28,28,0.08)]"
                  >
                    DEPLOY INTERACTIVE DEMO <Play className="w-3.5 h-3.5 fill-current" />
                  </a>
                )}

                {project.websiteLink && (
                  <a
                    href={project.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playLocalBeep(640, 'sine', 0.08)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-blue-950/20 hover:bg-blue-950/40 border border-blue-900/40 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 transition-all font-bold text-[11px] tracking-wider uppercase font-mono cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                  >
                    LIVE SITE <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
