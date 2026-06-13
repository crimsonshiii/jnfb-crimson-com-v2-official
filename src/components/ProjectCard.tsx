import React, { useState } from 'react';
import { Project } from '../data';
import { 
  FolderGit2, 
  ExternalLink, 
  Users, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Terminal,
  Play,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isPersonal = project.type === 'personal';

  return (
    <Card
      className={`relative group rounded-lg border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? 'bg-[#0c0c0c] border-[#dc2626]/40 shadow-[0_5px_15px_rgba(185,28,28,0.04)]' 
          : 'bg-[#0c0c0c] border-zinc-800/40 hover:border-[#dc2626]/30 hover:bg-[#0c0c0c]/85 shadow-sm'
      }`}
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
      <CardContent className="p-6">
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

        {/* Project Metrics Header */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/30 text-xs font-mono text-zinc-400">
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors font-bold text-[11px] cursor-pointer"
          >
            {isExpanded ? 'COLLAPSE DIAG' : 'EXPAND SPEC'}
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        </div>
      </CardContent>

      {/* Expandable Module section showing detailed bullets and logs */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-zinc-800/30 bg-[#0a0a0a]/50"
          >
            <div className="p-6 space-y-4 font-mono text-xs text-zinc-400">
              <div className="space-y-2 border-l border-zinc-800/50 pl-4">
                <h4 className="text-zinc-500 font-bold tracking-widest text-[10px] uppercase mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-red-500" />
                  CASE_BULLETINS_AND_COMPLETIONS
                </h4>
                
                {project.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-300 leading-relaxed font-sans mb-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800/45 hover:bg-zinc-200 dark:hover:bg-zinc-800/40 text-zinc-800 dark:text-zinc-300 transition-all font-bold text-[10px] tracking-wider uppercase font-mono cursor-pointer shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5" /> ACCESS SOURCE REPOSITORY
                  </a>
                )}

                {project.interactiveLink && (
                  <a
                    href={project.interactiveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/25 border border-red-900/40 hover:bg-red-950/50 text-red-500 hover:text-red-450 transition-all font-bold text-[10px] tracking-wider uppercase shadow-[0_0_10px_rgba(185,28,28,0.06)] cursor-pointer"
                  >
                    DEPLOY INTERACTIVE DEMO <Play className="w-3 h-3" />
                  </a>
                )}

                {project.websiteLink && (
                  <a
                    href={project.websiteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-blue-700 dark:text-blue-400 transition-all font-bold text-[10px] tracking-wider uppercase cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.06)]"
                  >
                    VISIT LIVE WEBSITE <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
