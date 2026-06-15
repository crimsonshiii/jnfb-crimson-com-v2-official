import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon,
  User, 
  Cpu, 
  FolderGit2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronRight, 
  Calendar, 
  Flame, 
  Gamepad2, 
  Languages, 
  Activity, 
  CheckCircle2, 
  BookOpen, 
  Send,
  Tv,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  jnfbProfile, 
  jnfbProjects, 
  jnfbExperience, 
  jnfbSkills 
} from './data';
import TerminalMock from './components/TerminalMock';
import ProjectCard from './components/ProjectCard';
import Biodata from './components/Biodata';
import SkillCard from './components/SkillCard';
import EducationCard from './components/EducationCard';
import ExperienceCard from './components/ExperienceCard';
import AchievementsAndCertificationsCard from './components/AchievementsAndCertificationsCard';
import Header from './components/Header';
import profilePic from './assets/images/BENEDICTO_ID PIC.png';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'personal'>('all');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [colorTheme, setColorTheme] = useState<'red' | 'green' | 'blue' | 'yellow'>(() => {
    const saved = localStorage.getItem('theme-color-selection');
    return (saved === 'red' || saved === 'green' || saved === 'blue' || saved === 'yellow') ? saved : 'red';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isLightMode) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [isLightMode]);

  useEffect(() => {
    localStorage.setItem('theme-color-selection', colorTheme);
    const root = window.document.documentElement;
    root.classList.remove('theme-red', 'theme-green', 'theme-blue', 'theme-yellow');
    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);
  
  // States for contact form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formLogs, setFormLogs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Local list of submitted feedback (guestbook feature!)
  const [sentRelays, setSentRelays] = useState<{name: string, date: string, message: string}[]>([]);

  // Simulated typing effect for header sub-items
  const [typedTitle, setTypedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const coreRoles = ["Front-End Developer", "UI/UX Designer", "Graphic Designer", "Horror Game Streamer"];

  useEffect(() => {
    let currentRole = coreRoles[titleIndex];
    let charIdx = 0;
    let timer = setInterval(() => {
      setTypedTitle(currentRole.substring(0, charIdx + 1));
      charIdx++;
      if (charIdx === currentRole.length) {
        clearInterval(timer);
        setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % coreRoles.length);
        }, 2200); // Wait before switching
      }
    }, 80);

    return () => clearInterval(timer);
  }, [titleIndex]);

  // Handle Playful Diagnostic sound click
  const playBeep = (freq = 440, type: OscillatorType = 'sine', duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext fails gracefully (e.g. if iframe constraints block audios)
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playBeep(650, 'triangle', 0.15);
    setIsSubmitting(true);
    setFormLogs([
      "INITIALIZING SECURE PROTOCOL TRANSFER...",
      "TARGET CONSOLE: crimsonshiii@taguig.core",
      "CHECKING GATEWAY SECURE KEYS... OK",
    ]);

    // Simulate standard connection intervals
    setTimeout(() => {
      setFormLogs(logs => [...logs, "COMPUTING AES-256 DIGITAL ENCRYPTION CHAIN... DONE"]);
      playBeep(520, 'sine', 0.08);
    }, 700);

    setTimeout(() => {
      setFormLogs(logs => [...logs, "PING SPEED: 24ms (Taguig City, PH Server Routing)"]);
      playBeep(580, 'sine', 0.08);
    }, 1200);

    setTimeout(() => {
      setFormLogs(logs => [
        ...logs, 
        "COMPLETED: PAYLOAD DISPATCHED SUCCESSFULLY!"
      ]);
      playBeep(880, 'triangle', 0.25);
      
      // Add message to local guestbook list
      setSentRelays(prev => [
        {
          name: formData.name,
          date: new Date().toLocaleTimeString(),
          message: formData.message
        },
        ...prev
      ]);

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Auto reset success screen after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  // Filter projects list
  const filteredProjects = jnfbProjects.filter((project) => {
    if (activeTab === 'all') return true;
    return project.type === activeTab;
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-custom-gradient text-zinc-100 flex flex-col font-sans select-text selection:bg-red-700 selection:text-white">
      {/* Top Banner Grid background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none bg-radial-gradient from-red-950/15 via-zinc-950/0 to-zinc-950/0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-[400px] scanner-grid opacity-30 pointer-events-none z-0" />

      {/* Sticky Header / Command Navbar */}
      <Header 
        soundEnabled={soundEnabled} 
        setSoundEnabled={setSoundEnabled} 
        playBeep={playBeep} 
        isLightMode={isLightMode}
        setIsLightMode={setIsLightMode}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 z-10 space-y-16">
        
        {/* HERO INTRO SECTION */}
        <section id="hero" className="relative flex flex-col md:flex-row items-center gap-8 pt-6 select-text overflow-hidden">
          {/* Elegant Dark Background Watermark */}
          <div className="absolute right-0 bottom-0 text-red-950/5 text-[150px] md:text-[220px] font-black -z-10 select-none tracking-tighter font-sans leading-none">
            CRMSN
          </div>

          {/* Visual profile block */}
          <div className="w-full md:w-2/5 flex flex-col items-center z-10">
            <div className="relative group">
              {/* Outer boundary circles matching tactical vibe */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 opacity-45 blur-md group-hover:opacity-85 transition duration-1000 group-hover:duration-200" />
              
              {/* Profile Avatar Container with scanlines */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#0c0c0c] border-4 border-zinc-800/40 overflow-hidden flex flex-col items-center justify-center">
                <div className="scanner-line pointer-events-none opacity-40 z-10" />
                
                {/* Jao Nicholas portrait photo replaced as per user request */}
                <img
                  src={profilePic}
                  alt="Jao Nicholas F. Benedicto"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Quick Status Tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-red-950/30 border border-red-900/30 text-[10px] font-mono text-red-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-red-500 shrink-0" />
                REAGENT: ACTIVE
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#0c0c0c] border border-zinc-800/50 text-[10px] font-mono text-zinc-400 font-bold">
                EST: 2022
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#0c0c0c] border border-zinc-800/50 text-[10px] font-mono text-zinc-400 font-bold">
                LOC: TAGUIG CITY
              </span>
            </div>
          </div>

          {/* Text Summary Info details */}
          <div className="w-full md:w-3/5 space-y-5 text-center md:text-left z-10">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-red-500 tracking-[0.25em] uppercase font-bold inline-block border-l-2 border-red-700 pl-3">
                REAGENT DOSSIER INDUCTION
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {jnfbProfile.name}
              </h1>
              {/* Typewriter subtitle prompt */}
              <div className="h-6 flex items-center justify-center md:justify-start gap-2 text-zinc-400 font-mono text-xs tracking-wider">
                <Cpu className="w-4 h-4 text-red-500" />
                <span>Specializes in:</span>
                <span className="text-red-500 font-bold border-r-2 border-red-700 pr-1 animate-pulse">
                  {typedTitle}
                </span>
              </div>
            </div>

            <p className="text-sm font-sans font-normal text-zinc-400 leading-relaxed max-w-xl">
              {jnfbProfile.bio}
            </p>

            {/* Core credentials links block */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 text-[10px] font-mono tracking-wider">
              <a
                href={jnfbProfile.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playBeep(620, 'sine', 0.08)}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-red-700 hover:bg-red-800 text-white font-bold tracking-widest uppercase transition-all theme-glow-btn hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-4 h-4 text-white" />
                crimsonshiii
                <ExternalLink className="w-3 h-3 text-red-300" />
              </a>

              <a
                href={jnfbProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => playBeep(640, 'sine', 0.08)}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#0c0c0c] border border-zinc-800 hover:border-red-900/40 hover:bg-[#0c0c0c]/80 text-zinc-300 hover:text-white font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Linkedin className="w-4 h-4 text-red-500" />
                LinkedIn
                <ExternalLink className="w-3 h-3 text-zinc-500 font-normal" />
              </a>

              <a
                href={`mailto:${jnfbProfile.email}`}
                onClick={() => playBeep(660, 'sine', 0.08)}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#0c0c0c] border border-zinc-800 hover:border-red-900/40 hover:bg-[#0c0c0c]/80 text-zinc-300 hover:text-white font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-red-500" />
                Email Terminal
              </a>

              <a
                href="/BENEDICTO, JAO NICHOLAS - CURRICULUM VITAE (V1).pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => playBeep(700, 'sine', 0.1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#0c0c0c]/40 border border-red-500/55 hover:border-red-500 hover:bg-red-950/20 text-red-400 hover:text-red-350 font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer theme-glow-sm"
              >
                <FileText className="w-4 h-4 text-red-500" />
                View/Download Resume (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TERMINAL EMULATOR */}
        <section className="scroll-mt-20">
          <div className="mb-4 text-center md:text-left">
            <p className="font-mono text-xs text-red-500 tracking-wider">SECURE CONNECTION PORTAL</p>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 justify-center md:justify-start">
              <TerminalIcon className="w-5 h-5 text-red-500" />
              Interactive Diagnostic Console
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Type standard diagnostic parameters to audit Jao's intelligence cores.</p>
          </div>
          <TerminalMock />
        </section>

        {/* DETAILED PROFILE & ACADEMIC EDUCATION BENTO GRID */}
        <section id="about" className="scroll-mt-20 space-y-6">
          <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <User className="w-6 h-6 text-red-500" />
              Personal Profile & Credentials
            </h2>
            <span className="font-mono text-xs text-zinc-500">DOSSIER // BD_0418</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bio stats block */}
            <Biodata />

            {/* Academic institutions list */}
            <EducationCard />
          </div>
        </section>

        {/* PROJECTS SECTION WITH TAB FILTERS */}
        <section id="projects" className="scroll-mt-20 space-y-6">
          <div className="border-b border-zinc-800/40 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-red-500" />
                Operational Projects Catalog
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Filter and query case files for Jao's academic systems and gaming portals.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap bg-[#0c0c0c] p-1 rounded-lg border border-zinc-800/40 text-xs font-mono">
              <button
                onClick={() => {
                  setActiveTab('all');
                  playBeep(450, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase font-bold cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-red-950/40 text-red-400 border border-red-900/40'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => {
                  setActiveTab('personal');
                  playBeep(480, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase font-bold cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'personal'
                    ? 'bg-red-950/40 text-red-400 border border-red-900/40'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-red-500" />
                Personal Core
              </button>
              <button
                onClick={() => {
                  setActiveTab('academic');
                  playBeep(510, 'sine', 0.05);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase font-bold cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'academic'
                    ? 'bg-red-950/40 text-red-400 border border-red-900/40'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-red-500" />
                Academic Portals
              </button>
            </div>
          </div>

          {/* Cards Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* DETAILED SKILL MATRIX DASHBOARD */}
        <section id="skills" className="scroll-mt-20 space-y-6">
          <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-red-500" />
              Technical Skill Matrix
            </h2>
            <span className="font-mono text-xs text-zinc-500">ENGINE_STATS // v3.5</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jnfbSkills.map((category, catIdx) => (
              <SkillCard key={catIdx} category={category} catIdx={catIdx} />
            ))}
          </div>
        </section>

        {/* CAREER TIMELINE WITH SPECIAL FOCUS ON YOUTUBE & DEPLOYMENTS */}
        <section id="experience" className="scroll-mt-20 space-y-6">
          <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-red-500" />
              Career & Professional Timeline
            </h2>
            <span className="font-mono text-xs text-zinc-500">LOG_HISTORY // CHRONO</span>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {jnfbExperience.map((job) => (
              <ExperienceCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS & CERTIFICATIONS CAROUSEL / HIGHLIGHTS Grid */}
        <AchievementsAndCertificationsCard />

        {/* SECURE CONTACT TERMINAL FORM WITH COMMAND OUTPUTS */}
        <section id="contact" className="scroll-mt-20 space-y-6">
          <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Mail className="w-6 h-6 text-red-500" />
              Secure Diagnostic Gateway (Contact)
            </h2>
            <span className="font-mono text-xs text-zinc-500">ENDPOINT // CONSOLE_TRANSFER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Form layout card */}
            <div className="bg-[#0c0c0c] border border-zinc-800/40 rounded-lg p-6 space-y-4 hover:border-red-900/30 transition-colors duration-300">
              <div className="flex items-center gap-2 border-b border-zinc-800/30 pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-700 animate-ping" />
                <h3 className="font-mono text-xs font-bold tracking-widest text-zinc-300 uppercase">
                  PAYLOAD_MESSAGE_CONTROLLER
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-sm font-mono">
                <div className="space-y-1.5">
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block">Sender Name [UTF-8]</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-zinc-800/50 focus:border-red-700/60 outline-none p-2.5 rounded text-zinc-200 transition-all font-sans text-sm"
                    placeholder="Enter full name..."
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block">Secure Relay Email [SMTP]</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-zinc-800/50 focus:border-red-700/60 outline-none p-2.5 rounded text-zinc-200 transition-all font-sans text-sm"
                    placeholder="name@server.com"
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block">Communication Content [HEX]</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-zinc-800/50 focus:border-red-700/60 outline-none p-2.5 rounded text-zinc-200 transition-all font-sans text-sm resize-none"
                    placeholder="Write your diagnostic logs or collaboration proposal here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`w-full py-3 rounded font-mono font-bold uppercase text-xs tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 border shadow-md select-none cursor-pointer ${
                    submitSuccess
                      ? 'bg-red-950/25 text-red-500 border-red-700/30'
                      : 'bg-red-700 border-red-800 text-white hover:bg-red-800 theme-glow-btn'
                  }`}
                >
                  {isSubmitting ? 'ENCRYPTING PAYLOAD...' : submitSuccess ? 'DISPATCHED SUCCESSFULLY ✓' : 'TRANSMIT DIAGNOSTIC MESSAGE'}
                </button>
              </form>
            </div>

            {/* Diagnostic Logs Screen */}
            <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-6 font-mono text-xs flex flex-col justify-between h-full min-h-[300px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-zinc-850 pb-2">
                  <span>TERMINAL OUTPUT: PAYLOAD_LOGS_FEED</span>
                  <span>ONLINE PING: 24ms</span>
                </div>

                {/* Submitting Logs Stream */}
                <div className="space-y-2">
                  {formLogs.length > 0 ? (
                    formLogs.map((log, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={idx}
                        className={`leading-relaxed ${idx === formLogs.length - 1 ? 'text-red-500 font-bold animate-pulse' : 'text-zinc-550 text-zinc-400'}`}
                      >
                        &gt; {log}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-zinc-550 leading-relaxed text-zinc-500">
                      &gt; SYSTEM IDLE. WAITING FOR MESSAGE PAYLOAD TRANSMISSION...
                      <br />
                      &gt; ready state true
                      <br />
                      &gt; taguig_gateway initialized
                    </div>
                  )}
                </div>
              </div>

              {/* Guestbook area showcasing submitted relays locally! */}
              <div className="border-t border-zinc-800/30 pt-4 mt-6 space-y-3">
                <h4 className="text-[10px] text-zinc-500 tracking-wider uppercase font-bold flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-red-500" />
                  GUESTBOOK_LOCAL_RELAYS ({sentRelays.length})
                </h4>

                {sentRelays.length > 0 ? (
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {sentRelays.map((relay, idx) => (
                      <div key={idx} className="bg-[#0c0c0c] p-2 rounded border border-zinc-800/50 space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                          <span className="font-bold text-red-500">{relay.name}</span>
                          <span>{relay.date}</span>
                        </div>
                        <p className="text-[11px] text-zinc-350 font-sans font-normal truncate">{relay.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-zinc-700 italic">No message packets received in this sandboxed session.</p>
                )}
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-zinc-800/40 py-10 px-4 mt-16 select-none font-mono text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-bold tracking-tight text-zinc-300 block">
              JNFB.<span className="text-red-600 font-bold">CRIMSON</span>.COM
            </span>
            <p className="text-[11px] text-zinc-650 font-sans font-normal">
              Designed & developed for Jao Nicholas Benedicto. Optimized with React & Framer Motion.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/crimsonshiii" onClick={() => playBeep(520)} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-4 h-4 text-zinc-500 hover:text-white transition-all shrink-0" />
              github
            </a>
            <a href="https://linkedin.com/in/jao-nicholas-benedicto" onClick={() => playBeep(540)} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Linkedin className="w-4 h-4 text-zinc-500 hover:text-white transition-all shrink-0" />
              linkedin
            </a>
            <a href={`http://ais-dev-vt35qwxdutvr2xwr3xudll-918559125692.asia-southeast1.run.app`} className="hover:text-white transition-colors">
              portal_status: stable
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-zinc-900/30 mt-6 pt-4 text-center text-[10px] text-zinc-700">
          <p>© 2025 Jao Nicholas Benedicto. JNFB.Crimson.com designed and developed by JNFB (Crimsonshiii)</p>
        </div>
      </footer>
    </div>
    </TooltipProvider>
  );
}
