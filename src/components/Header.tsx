import React from 'react';
import { Volume2, Sun, Moon, Menu } from 'lucide-react';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";

interface HeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playBeep: (freq?: number, type?: OscillatorType, duration?: number) => void;
  isLightMode: boolean;
  setIsLightMode: (enabled: boolean) => void;
  colorTheme: 'red' | 'green' | 'blue' | 'yellow';
  setColorTheme: (theme: 'red' | 'green' | 'blue' | 'yellow') => void;
}

export default function Header({ 
  soundEnabled, 
  setSoundEnabled, 
  playBeep,
  isLightMode,
  setIsLightMode,
  colorTheme,
  setColorTheme
}: HeaderProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800/40 px-4 py-3 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Pulsing logo icon */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-red-950/50 border border-red-500/30">
            <span className="text-red-500 font-mono text-[15px] font-bold">JN</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-650 border-2 border-zinc-950 animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-650 border-2 border-zinc-950" />
          </div>
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-500 font-bold block">PORTAL_NODE</span>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-white group hover:text-red-500 transition-colors">
              JNFB.<span className="text-red-600">CRIMSON</span>.COM
            </span>
          </div>
        </div>

        {/* Nav Selectors */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6 text-[10px] lg:text-[11px] font-mono tracking-[0.05em] lg:tracking-[0.15em] text-zinc-400 shrink-0">
          <a href="#about" onClick={() => playBeep(500, 'sine', 0.05)} className="hover:text-white transition-colors" title="Profile">
            <span className="xl:hidden">[01_PROF]</span>
            <span className="hidden xl:inline">[01_PROFILE]</span>
          </a>
          <a href="#projects" onClick={() => playBeep(520, 'sine', 0.05)} className="hover:text-white transition-colors" title="Projects">
            <span className="xl:hidden">[02_PROJ]</span>
            <span className="hidden xl:inline">[02_PROJECTS]</span>
          </a>
          <a href="#skills" onClick={() => playBeep(540, 'sine', 0.05)} className="hover:text-white transition-colors" title="Skills">
            <span className="xl:hidden">[03_SKIL]</span>
            <span className="hidden xl:inline">[03_SKILLS]</span>
          </a>
          <a href="#experience" onClick={() => playBeep(560, 'sine', 0.05)} className="hover:text-white transition-colors" title="Timeline">
            <span className="xl:hidden">[04_TIME]</span>
            <span className="hidden xl:inline">[04_TIMELINE]</span>
          </a>
          <a href="#achievements" onClick={() => playBeep(580, 'sine', 0.05)} className="hover:text-white transition-colors" title="Honors">
            <span className="xl:hidden">[05_HONO]</span>
            <span className="hidden xl:inline">[05_HONORS]</span>
          </a>
          <a href="#contact" onClick={() => playBeep(600, 'sine', 0.05)} className="hover:text-white transition-colors" title="Secure Relay">
            <span className="xl:hidden">[06_RELA]</span>
            <span className="hidden xl:inline">[06_SECURE_RELAY]</span>
          </a>
        </nav>

        {/* Auditive Design feedback toggler & Theme switch */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Dynamic Theme Color Selector */}
          <div className="relative flex items-center">
            <select
              id="color-theme-select"
              value={colorTheme}
              onChange={(e) => {
                const val = e.target.value as 'red' | 'green' | 'blue' | 'yellow';
                playBeep(560, 'sine', 0.08);
                setColorTheme(val);
              }}
              className={`font-mono text-[9px] uppercase font-bold tracking-wider outline-none cursor-pointer rounded-lg px-2.5 py-2 border transition-all ${
                isLightMode 
                  ? 'bg-white border-red-500/30 hover:bg-zinc-50' 
                  : 'bg-zinc-900/50 border-red-500/20 hover:text-zinc-200 focus:border-red-500/50'
              }`}
              style={{
                color: isLightMode
                  ? (colorTheme === 'red' ? '#dc2626' : colorTheme === 'green' ? '#16a34a' : colorTheme === 'blue' ? '#0284c7' : '#ca8a04')
                  : (colorTheme === 'red' ? '#f87171' : colorTheme === 'green' ? '#4ade80' : colorTheme === 'blue' ? '#38bdf8' : '#facc15')
              }}
              title="Select Color Profile"
            >
              <option value="red" style={{ color: isLightMode ? '#dc2626' : '#f87171', backgroundColor: isLightMode ? '#ffffff' : '#0c0c0c' }} className="font-bold">{isMobile ? 'R' : 'Red'}</option>
              <option value="green" style={{ color: isLightMode ? '#16a34a' : '#4ade80', backgroundColor: isLightMode ? '#ffffff' : '#0c0c0c' }} className="font-bold">{isMobile ? 'G' : 'Green'}</option>
              <option value="blue" style={{ color: isLightMode ? '#0284c7' : '#38bdf8', backgroundColor: isLightMode ? '#ffffff' : '#0c0c0c' }} className="font-bold">{isMobile ? 'B' : 'Blue'}</option>
              <option value="yellow" style={{ color: isLightMode ? '#ca8a04' : '#facc15', backgroundColor: isLightMode ? '#ffffff' : '#0c0c0c' }} className="font-bold">{isMobile ? 'Y' : 'Yellow'}</option>
            </select>
          </div>

          <button
            onClick={() => {
              playBeep(600, 'sine', 0.08);
              setIsLightMode(!isLightMode);
            }}
            className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
              isLightMode
                ? 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Toggle Light / Dark Mode"
          >
            {isLightMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest hidden xl:inline whitespace-nowrap">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-zinc-400" />
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest hidden xl:inline whitespace-nowrap">Dark</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              // Trigger sound instantly if enabled to verify
              if (!soundEnabled) {
                setTimeout(() => {
                  setSoundEnabled(true);
                  // play short confirmation melody
                  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  gain.gain.setValueAtTime(0.04, ctx.currentTime);
                  osc.frequency.setValueAtTime(440, ctx.currentTime);
                  osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
                  osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
                  osc.start();
                  osc.stop(ctx.currentTime + 0.35);
                }, 50);
              }
            }}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 shrink-0 ${
              soundEnabled 
                ? 'bg-red-950/40 text-red-500 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
            }`}
            title="Toggle Audio Feedback (Synthesizer UI Cues)"
          >
            <Volume2 className={`w-4 h-4 ${soundEnabled ? 'animate-bounce' : ''}`} />
            <span className="font-mono text-[9px] uppercase font-bold tracking-widest hidden xl:inline whitespace-nowrap">
              {soundEnabled ? 'Synth On' : 'Synth Off'}
            </span>
          </button>

          {/* Mobile Hamburger Menu (using shadcn/ui Sheet) */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                onClick={() => playBeep(520, 'sine', 0.05)}
                className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                  isLightMode
                    ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
                    : 'bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-4 h-4" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`w-[260px] p-0 flex flex-col justify-between border-l ${
                  isLightMode
                    ? 'bg-zinc-50 border-zinc-200 text-zinc-900 shadow-xl'
                    : 'bg-[#0a0a0a]/95 backdrop-blur-md border-zinc-800/85 text-zinc-100 shadow-2xl'
                }`}
              >
                <div className="flex flex-col">
                  <SheetHeader className="border-b border-zinc-800/30 p-4 text-left">
                    <SheetTitle className={`text-xs font-mono tracking-widest text-zinc-500 font-bold uppercase ${isLightMode ? 'text-zinc-600' : ''}`}>
                      PORTAL_RESOURCES
                    </SheetTitle>
                    <SheetDescription className={`text-[10px] font-mono ${isLightMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      [SECURE_SHELL_NAV]
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col p-4 font-mono gap-1">
                    <a
                      href="#about"
                      onClick={() => {
                        playBeep(500, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[01_PROFILE]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                    <a
                      href="#projects"
                      onClick={() => {
                        playBeep(520, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[02_PROJECTS]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                    <a
                      href="#skills"
                      onClick={() => {
                        playBeep(540, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[03_SKILLS]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                    <a
                      href="#experience"
                      onClick={() => {
                        playBeep(560, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[04_TIMELINE]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                    <a
                      href="#achievements"
                      onClick={() => {
                        playBeep(580, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[05_HONORS]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                    <a
                      href="#contact"
                      onClick={() => {
                        playBeep(600, 'sine', 0.05);
                        setIsOpen(false);
                      }}
                      className={`group flex items-center justify-between py-2.5 text-xs tracking-wider transition-colors border-b ${
                        isLightMode 
                          ? 'text-zinc-700 hover:text-red-600 border-zinc-200/50' 
                          : 'text-zinc-400 hover:text-white border-zinc-800/20'
                      }`}
                    >
                      <span>[06_SECURE_RELAY]</span>
                      <span className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>
                  </div>
                </div>

                <div className={`p-4 border-t font-mono text-[9px] flex flex-col gap-1 mt-auto ${
                  isLightMode ? 'border-zinc-200 text-zinc-400' : 'border-zinc-800/30 text-zinc-500'
                }`}>
                  <div>NODE: ACTIVE_PORTAL</div>
                  <div>SECURE_CONN_PORTAL_v3.5</div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
