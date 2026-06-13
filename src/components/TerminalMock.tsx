import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Cpu, Check, CornerDownLeft, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jnfbProfile, jnfbProjects } from '../data';

interface CommandOutput {
  text: string;
  type: 'input' | 'system' | 'success' | 'error' | 'warning';
}

export default function TerminalMock() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { text: "CRIMSON TERMINAL (v3.5) - ACTIVE CONNECTION ESTABLISHED", type: "success" },
    { text: "INITIALIZING REAGENT DIAGNOSTICS FOR: Jao Nicholas Benedicto...", type: "system" },
    { text: "STATUS: 100% OPERATIONAL // ALL CIRCUITS ENERGIZED", type: "success" },
    { text: "LOCATION: J.P. Rizal, Extension, West Rembo, Taguig City", type: "system" },
    { text: "--------------------------------------------------------", type: "system" },
    { text: "Type 'help' in the console below to view diagnostic protocols.", type: "warning" },
  ]);
  const [systemOverclock, setSystemOverclock] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `user@crimsonshiii:~$ ${cmd}`, type: 'input' as const }];
    
    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: "AVAILABLE DIAGNOSTIC PROTOCOLS:", type: "system" },
          { text: "  profile      - Fetch reagent Jao Nicholas's comprehensive parameters", type: "success" },
          { text: "  skills       - Quantify full-stack software and design masteries", type: "success" },
          { text: "  projects     - Query operational catalog (academic + personal)", type: "success" },
          { text: "  overclock    - Push CPU state to maximum crimson frequency", type: "warning" },
          { text: "  clear        - Flush terminal buffer", type: "system" }
        );
        break;
      case 'profile':
        newHistory.push(
          { text: "REAGENT SPECS: " + jnfbProfile.name.toUpperCase(), type: "success" },
          { text: `  Role:        ${jnfbProfile.title}`, type: "system" },
          { text: `  Age:         ${jnfbProfile.age} (${jnfbProfile.birthDate})`, type: "system" },
          { text: `  Specialty:   ${jnfbProfile.subTitles[0]}`, type: "system" },
          { text: `  Address:     ${jnfbProfile.address}`, type: "system" },
          { text: `  Interests:   Immersive gaming, esports, sound design, retro mechanics`, type: "warning" }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: "COMPUTATIONAL UTILITY POOLS LOADED:", type: "success" },
          { text: "  - Front-End Engineering: HTML5, CSS3, Modern JS, React.js, Next.js (95%)", type: "system" },
          { text: "  - Styling Infrastructure: Tailwind CSS, Framer Motion, Styled-Components (95%)", type: "system" },
          { text: "  - Backend Controllers: PHP, Laravel Framework, CodeIgniter4 (88%)", type: "system" },
          { text: "  - Game Architecture: Unity, C# Scripting, Physics Engineering (85%)", type: "system" },
          { text: "  - Design Methodologies: Figma Prototyping, Canva Visuals, UI Layout Layouts (92%)", type: "system" }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: "OPERATIONAL RUNTIME MODULES DEPLOYED:", type: "success" },
          { text: "  - CIC Submission Portal: Core Submission Portal [Next.js + Supabase]", type: "system" },
          { text: "  - EmpowerPath: Job Recommendation Engine [Laravel + PHP]", type: "system" },
          { text: "  - CrimsonSkillBoost: The CS Academic Hub [CodeIgniter + Java]", type: "system" },
          { text: "  - Objection, Overruled!: Legal Courtroom Sim [C# + Unity]", type: "system" }
        );
        break;
      case 'overclock':
        setSystemOverclock(true);
        newHistory.push(
          { text: "CRITICAL ALERT: CORES EXCEEDING SAFE PARAMETERS!", type: "error" },
          { text: "PUMPING HYDRO-COOLING MATRIX... GENERATING CRIMSON GLOW...", type: "system" },
          { text: "OVERCLOCK RATING: 4.80 GHz // POWER LEVEL: UNLIMITED !!", type: "success" }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({
          text: `Command '${cmd}' not recognized in Taguig Core database. Type 'help' for support.`,
          type: 'error'
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div id="terminal" className="w-full max-w-4xl mx-auto mb-16 rounded-lg border border-zinc-800/50 bg-[#0c0c0c] shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-zinc-800/40 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-800" />
          </div>
          <span className="font-mono text-xs tracking-wider text-zinc-400 font-bold flex items-center gap-1.5 ml-2">
            <TerminalIcon className="w-4 h-4 text-red-500" />
            CRIMSON.TERM // REAGENT_PORTAL_v3.5
          </span>
        </div>
        
        <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold bg-[#0c0c0c] px-2 py-0.5 rounded border border-zinc-800/25">
          Terminal Shell
        </span>
      </div>

      <div className="relative p-6 font-mono text-sm leading-relaxed min-h-[380px] max-h-[500px] overflow-y-auto scanner-grid">
        <div className="scanner-line pointer-events-none" />

        <div className="space-y-3" onClick={focusInput}>
          {/* Command History */}
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap ${
                line.type === 'input'
                  ? 'text-zinc-300'
                  : line.type === 'system'
                  ? 'text-zinc-400'
                  : line.type === 'success'
                  ? 'text-red-400 font-semibold'
                  : line.type === 'warning'
                  ? 'text-yellow-500'
                  : 'text-red-500 font-semibold bg-red-950/10 px-2'
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* Simulated over-clocked graphic */}
          {systemOverclock && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 border border-red-500/30 bg-red-950/10 rounded-lg text-red-400 space-y-2"
            >
              <div className="flex items-center space-x-2 text-xs font-bold text-red-500 animate-pulse">
                <ShieldAlert className="w-4 h-4" />
                <span>OVERCLOCKED SYSTEM FREQUENCY // taguig_core_01</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="border border-red-950 bg-red-950/20 p-1 text-center">
                  <p className="text-zinc-500">CPU LOAD</p>
                  <p className="font-bold text-red-400">97.8%</p>
                </div>
                <div className="border border-red-950 bg-red-950/20 p-1 text-center">
                  <p className="text-zinc-500">TEMP RATE</p>
                  <p className="font-bold text-red-400">82.5 °C</p>
                </div>
                <div className="border border-red-950 bg-red-950/20 p-1 text-center">
                  <p className="text-zinc-500">CORES</p>
                  <p className="font-bold text-red-400">12 / 12 ACTIVE</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                Reagent intelligence parameters have been successfully accelerated. Ready for comprehensive viewing.
              </p>
            </motion.div>
          )}

          <div ref={bottomRef} />

          {/* Terminal input prompt */}
          <form onSubmit={handleCommand} className="flex items-center space-x-2 mt-4 pt-2 border-t border-zinc-900">
            <span className="text-red-500 font-semibold">user@crimsonshiii:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-red-300 focus:ring-0 font-mono caret-red-500"
              placeholder="type 'help', 'profile', or 'skills'..."
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Terminal Footer Quick Buttons */}
      <div className="px-5 py-3 bg-[#0a0a0a] border-t border-zinc-800/40 flex flex-wrap justify-between items-center gap-2">
        <div className="flex space-x-1.5 text-[10px] text-zinc-500 font-mono">
          <span className="bg-[#0c0c0c] px-1 py-0.5 rounded text-zinc-400 border border-zinc-800/40">F1</span>
          <span>Help</span>
          <span className="bg-[#0c0c0c] px-1 py-0.5 rounded text-zinc-400 ml-2 border border-zinc-800/40">Del</span>
          <span>Wipe Shell</span>
        </div>
        <div className="flex space-x-2 font-mono text-[11px]">
          <button
            onClick={() => {
              setHistory(h => [...h, { text: `user@crimsonshiii:~$ profile`, type: 'input' }, { text: "REAGENT SPECS: " + jnfbProfile.name.toUpperCase(), type: "success" }, { text: `  Role:        ${jnfbProfile.title}`, type: "system" }, { text: `  Age:         ${jnfbProfile.age} (${jnfbProfile.birthDate})`, type: "system" }, { text: `  Address:     ${jnfbProfile.address}`, type: "system" }]);
            }}
            className="text-zinc-400 hover:text-red-400 hover:underline transition-all flex items-center gap-1"
          >
            <Cpu className="w-3.5 h-3.5 text-red-500" />
            [01_QUERY_BIO]
          </button>
          <span className="text-zinc-800">|</span>
          <button
            onClick={() => {
              setHistory(h => [...h, { text: `user@crimsonshiii:~$ projects`, type: 'input' }, { text: "OPERATIONAL RUNTIME MODULES DEPLOYED:", type: "success" }, ...jnfbProjects.map(p => ({ text: `  - ${p.name} [${p.techStack.slice(0, 3).join(', ')}]`, type: 'system' as const }))]);
            }}
            className="text-zinc-400 hover:text-red-400 hover:underline transition-all flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5 text-green-500" />
            [02_DIAG_PROJECTS]
          </button>
        </div>
      </div>
    </div>
  );
}
