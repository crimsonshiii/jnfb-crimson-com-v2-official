import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Sparkles, 
  Zap, 
  ClipboardList, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Cpu,
  FileCheck,
  FileText,
  Eye,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jnfbCertifications, jnfbAchievements, Certification } from '../data';
import { Badge } from '@/components/ui/badge';

export default function AchievementsAndCertificationsCard() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [modalTab, setModalTab] = useState<'details' | 'pdf'>('details');

  // Sound generator
  const playLocalBeep = (freq = 520, type: OscillatorType = 'sine', duration = 0.06) => {
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
      // Audio context fails safely if blocked
    }
  };

  const handleOpenModal = (cert: Certification) => {
    playLocalBeep(560, 'sine', 0.07);
    setSelectedCert(cert);
    setCopiedId(false);
    setModalTab('details');
  };

  const handleCloseModal = () => {
    playLocalBeep(420, 'sine', 0.06);
    setSelectedCert(null);
    setCopiedId(false);
    setModalTab('details');
  };

  const handleCopyId = (e: React.MouseEvent, idText?: string) => {
    e.stopPropagation();
    if (!idText) return;
    navigator.clipboard.writeText(idText);
    setCopiedId(true);
    playLocalBeep(720, 'triangle', 0.08);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Keyboard shortcut listener for ESC key
  useEffect(() => {
    if (!selectedCert) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  // Lock document scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

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
          <div className="flex items-center justify-between pl-1.5 pr-1">
            <h3 className="font-mono text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              TECHNICAL_CERTIFICATIONS (VERIFIED)
            </h3>
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
              [CLICK ITEM TO EXPAND]
            </span>
          </div>

          <div className="space-y-3">
            {jnfbCertifications.map((cert) => (
              <div 
                key={cert.id} 
                onClick={() => handleOpenModal(cert)}
                className="group relative p-4 bg-[#0c0c0c] border border-zinc-800/40 hover:border-red-600/40 hover:bg-[#111111] rounded-lg transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer select-none shadow-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.12)]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal(cert);
                  }
                }}
              >
                {/* Left hover indicator bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-3/4 bg-red-600 rounded-r transition-all duration-300" />

                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-2.5 bg-red-950/25 text-red-500 rounded-lg border border-red-900/20 group-hover:bg-red-950/40 group-hover:border-red-700/40 group-hover:scale-105 transition-all shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-tight truncate">
                      {cert.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-xs text-zinc-400 font-mono">
                        {cert.issuer} ({cert.year})
                      </p>
                      {cert.skills && (
                        <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-1.5 py-0.2 rounded border border-zinc-800/60">
                          {cert.skills.length} skills
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase hidden sm:inline">
                    {cert.location.split(',')[0]}
                  </span>
                  <div className="p-1 rounded bg-zinc-900/70 border border-zinc-800 text-zinc-400 group-hover:text-red-400 group-hover:border-red-900/40 group-hover:translate-x-0.5 transition-all">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
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

      {/* Modern Sci-Fi Tactical Certification Specification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6 overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
              onClick={handleCloseModal}
            />

            {/* Modal Card Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
              className="relative w-full max-w-2xl bg-[#0b0b0b] border border-[#dc2626]/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.15)] flex flex-col max-h-[82vh] sm:max-h-[84vh] z-10"
            >
              {/* Top ambient color accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-gradient-to-r from-red-800 via-red-600 to-amber-600" />

              {/* Scanning lines effect on background */}
              <div className="scanner-line pointer-events-none opacity-20 z-20" />

              {/* Header section */}
              <div className="p-6 pb-4 border-b border-zinc-800/40 flex items-start justify-between gap-4 bg-[#0d0d0d] relative z-10">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase">
                      CREDENTIAL SPECIFICATION
                    </Badge>
                    <Badge className="bg-emerald-950/30 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedCert.status || "VERIFIED"}
                    </Badge>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedCert.year}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-zinc-100 flex items-center gap-2 font-sans tracking-tight leading-snug">
                    <span className="text-red-500 font-mono text-base md:text-lg shrink-0">[CERT]</span>
                    <span>{selectedCert.title}</span>
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                      <strong className="text-zinc-300">ISSUER:</strong> {selectedCert.issuerFull || selectedCert.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {selectedCert.location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-md border border-zinc-800/60 bg-[#070707] hover:bg-zinc-900 hover:text-red-500 text-zinc-400 transition-all cursor-pointer shadow-sm hover:border-red-900/40 shrink-0"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* View mode toggle tabs (if PDF is available) */}
              {selectedCert.credentialUrl && selectedCert.credentialUrl.toLowerCase().endsWith('.pdf') && (
                <div className="px-6 py-2 bg-[#090909] border-b border-zinc-800/40 flex items-center gap-2 relative z-10">
                  <button
                    onClick={() => {
                      playLocalBeep(520, 'sine', 0.05);
                      setModalTab('details');
                    }}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      modalTab === 'details'
                        ? 'bg-red-950/60 border border-red-800/60 text-red-300 shadow-[0_0_12px_rgba(220,38,38,0.2)]'
                        : 'bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>CURRICULUM SPECIFICATIONS</span>
                  </button>

                  <button
                    onClick={() => {
                      playLocalBeep(640, 'sine', 0.05);
                      setModalTab('pdf');
                    }}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      modalTab === 'pdf'
                        ? 'bg-red-950/60 border border-red-800/60 text-red-300 shadow-[0_0_12px_rgba(220,38,38,0.2)]'
                        : 'bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>PREVIEW CERTIFICATE (PDF)</span>
                  </button>
                </div>
              )}

              {/* Scrollable Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-zinc-300 text-sm">
                
                {modalTab === 'pdf' && selectedCert.credentialUrl ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-red-400 font-bold">
                        <FileCheck className="w-3.5 h-3.5" />
                        INTERACTIVE_DOCUMENT_PREVIEW
                      </span>
                      <span>100% VERIFIED AUTHENTIC</span>
                    </div>

                    <div className="relative w-full rounded-lg overflow-hidden border border-zinc-800/80 bg-[#080808] shadow-inner">
                      <iframe
                        src={encodeURI(selectedCert.credentialUrl)}
                        title={selectedCert.title}
                        className="w-full h-[460px] sm:h-[500px] border-0"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Tactical Certificate Verification Banner Card */}
                    <div className="p-4 bg-zinc-950/80 border border-zinc-800/70 rounded-lg space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-5 pointer-events-none text-red-500">
                        <Award className="w-28 h-28" />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-zinc-800/40 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-red-950/40 border border-red-900/30 text-red-400 rounded-md">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                              AUTHENTICATION NODE
                            </div>
                            <div className="text-xs font-mono font-bold text-zinc-200">
                              {selectedCert.issuer} // ACCREDITED
                            </div>
                          </div>
                        </div>

                        {selectedCert.credentialId && (
                          <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-md">
                            <span className="text-[10px] font-mono text-zinc-400">ID:</span>
                            <code className="text-[11px] font-mono font-bold text-red-400">
                              {selectedCert.credentialId}
                            </code>
                            <button
                              onClick={(e) => handleCopyId(e, selectedCert.credentialId)}
                              className="text-zinc-400 hover:text-zinc-200 transition-colors p-0.5 rounded cursor-pointer"
                              title="Copy Credential ID"
                            >
                              {copiedId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1">
                        <div>
                          <span className="text-[10px] text-zinc-400 block">ISSUE DATE</span>
                          <span className="text-zinc-200 font-semibold">{selectedCert.issueDate || selectedCert.year}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block">SECURITY STATUS</span>
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {selectedCert.status || "VALID"}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-zinc-400 block">AUTHORITY</span>
                          <span className="text-zinc-200 font-semibold truncate block">{selectedCert.issuer}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Detailed Description & Overview */}
                    <div className="space-y-2">
                      <h3 className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className="text-red-500">_&gt;</span>
                        CURRICULUM_AND_COMPETENCY_OVERVIEW
                      </h3>
                      <div className="p-4 bg-[#0e0e0e] border border-zinc-800/40 rounded-lg text-zinc-300 leading-relaxed font-sans text-sm">
                        {selectedCert.description || "Comprehensive technical assessment demonstrating verified domain knowledge and practical application standard."}
                      </div>
                    </div>

                    {/* Section 2: Verified Skills Matrix */}
                    {selectedCert.skills && selectedCert.skills.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-red-500" />
                            VERIFIED_TECHNICAL_SKILLS ({selectedCert.skills.length})
                          </span>
                          <span className="text-[10px] text-zinc-400 font-normal">
                            MASTERED & TESTED
                          </span>
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {selectedCert.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-1.5 rounded-md bg-[#131313] border border-zinc-800/80 text-xs font-mono text-zinc-200 hover:border-red-600/50 hover:text-red-400 hover:bg-[#181818] transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Core Validation Checkpoints / Modules */}
                    {selectedCert.modulesCovered && selectedCert.modulesCovered.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
                          <span className="text-red-500">_&gt;</span>
                          CURRICULUM_VALIDATION_MODULES
                        </h3>

                        <div className="space-y-2 bg-[#0d0d0d] p-3.5 rounded-lg border border-zinc-800/40">
                          {selectedCert.modulesCovered.map((module, mIdx) => (
                            <div key={mIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{module}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

              {/* Action buttons footer */}
              <div className="p-4 border-t border-zinc-800/40 bg-[#0d0d0d] flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  {selectedCert.credentialId && (
                    <button
                      onClick={(e) => handleCopyId(e, selectedCert.credentialId)}
                      className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">ID COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY ID</span>
                        </>
                      )}
                    </button>
                  )}

                  {selectedCert.credentialUrl && (
                    <a
                      href={encodeURI(selectedCert.credentialUrl)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playLocalBeep(600, 'sine', 0.08)}
                      className="px-3 py-2 rounded-md bg-red-950/40 border border-red-900/40 hover:bg-red-900/40 hover:border-red-700/50 text-red-400 hover:text-red-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {selectedCert.credentialUrl.toLowerCase().endsWith('.pdf') ? 'OPEN IN NEW TAB' : 'VERIFY CREDENTIAL'}
                    </a>
                  )}

                  {selectedCert.credentialUrl && selectedCert.credentialUrl.toLowerCase().endsWith('.pdf') && (
                    <a
                      href={encodeURI(selectedCert.credentialUrl)}
                      download
                      onClick={() => playLocalBeep(700, 'sine', 0.08)}
                      className="px-3 py-2 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ml-auto"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

