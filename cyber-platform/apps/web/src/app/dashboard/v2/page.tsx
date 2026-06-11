import React, { useState, useEffect } from 'react';
import { 
  Shield, Globe, Activity, AlertTriangle, 
  Terminal, Search, Cpu, Database, 
  ChevronRight, ExternalLink, RefreshCw,
  Lock, Eye, Code, FileText, Bug
} from 'lucide-react';

export default function DetailedDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulation of hacking logs
  useEffect(() => {
    if (isScanning) {
      const messages = [
        "[INFO] Initializing Aegis Scanner Engine v4.2...",
        "[RECON] Resolving DNS for target.com...",
        "[RECON] Found 14 subdomains via brute-force.",
        "[PORT] Scanning 65,535 ports on 104.22.3.15...",
        "[SERVICE] Detected Nginx 1.18.0 (Ubuntu)",
        "[VULN] Testing SQL Injection on /api/v1/user?id=...",
        "[VULN] Testing XSS on search parameter...",
        "[!] ALERT: Potential SQL Injection found on api.target.com",
        "[INFO] Analyzing SSL/TLS configuration...",
        "[INFO] Scan 78% complete. 2 Critical findings."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < messages.length) {
          setLogs(prev => [...prev, messages[i]].slice(-8));
          i++;
        } else {
          clearInterval(interval);
          setIsScanning(false);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* HUD - Glassmorphism UI */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-24 bg-slate-950/80 border-r border-white/5 flex flex-col items-center py-8 gap-10 backdrop-blur-2xl z-50">
          <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <nav className="flex flex-col gap-6">
            <NavIcon icon={Globe} active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavIcon icon={Search} active={activeTab === 'recon'} onClick={() => setActiveTab('recon')} />
            <NavIcon icon={Bug} active={activeTab === 'vulns'} onClick={() => setActiveTab('vulns')} />
            <NavIcon icon={Activity} active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
            <NavIcon icon={FileText} active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
          </nav>
          <div className="mt-auto">
            <NavIcon icon={Database} />
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Background Grid Decoration */}
          <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
          
          {/* Top Bar */}
          <header className="h-20 border-b border-white/5 bg-slate-950/20 backdrop-blur-md flex items-center justify-between px-10 shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black tracking-widest text-white">SYSTEM_STATUS: <span className="text-cyan-400">OPERATIONAL</span></h2>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono">ENCRYPTION_ACTIVE: AES-256</span>
              </div>
              <button 
                onClick={() => { setIsScanning(true); setLogs([]); }}
                disabled={isScanning}
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${isScanning ? 'bg-slate-800 text-slate-500' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}
              >
                {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                {isScanning ? 'INITIALIZING_AUDIT...' : 'START_SYSTEM_AUDIT'}
              </button>
            </div>
          </header>

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            
            {/* Mission Critical Stats */}
            <div className="grid grid-cols-4 gap-6">
              <GlassCard label="Threat Exposure" value="High" sub="Risk Level" color="text-red-500" />
              <GlassCard label="Security Score" value="64%" sub="Compliance" color="text-yellow-500" />
              <GlassCard label="Assets Found" value="1,402" sub="Detected Nodes" color="text-cyan-400" />
              <GlassCard label="Vulnerabilities" value="28" sub="Unresolved" color="text-orange-400" />
            </div>

            <div className="grid grid-cols-3 gap-10">
              {/* Left Column: Live Terminal */}
              <div className="col-span-2 space-y-10">
                {/* Terminal Window */}
                <div className="bg-slate-950/90 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />
                  <div className="p-4 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">Aegis_Live_Kernel_Feed</span>
                    <Terminal className="w-4 h-4 text-cyan-500/50" />
                  </div>
                  <div className="p-6 h-[400px] font-mono text-sm space-y-2 overflow-hidden bg-black/40">
                    {logs.length === 0 && <p className="text-slate-700 italic">Waiting for process initiation...</p>}
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
                        <span className="text-cyan-500/50">[{new Date().toLocaleTimeString()}]</span>
                        <span className={log.includes('[!]') ? 'text-red-400 font-bold' : log.includes('[RECON]') ? 'text-blue-400' : 'text-slate-300'}>
                          {log}
                        </span>
                      </div>
                    ))}
                    {isScanning && <div className="w-2 h-4 bg-cyan-500 animate-pulse inline-block ml-2" />}
                  </div>
                </div>

                {/* Findings List */}
                <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-white italic">CRITICAL_VULNERABILITIES</h3>
                    <button className="text-cyan-400 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                      Download Raw Logs <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <VulnerabilityItem 
                      title="SQL Injection (Blind/Time-based)" 
                      target="https://api.corp-nexus.com/v1/user/search" 
                      severity="Critical" 
                      impact="Full Database Access"
                    />
                    <VulnerabilityItem 
                      title="Broken Access Control (IDOR)" 
                      target="https://app.corp-nexus.com/admin/settings/104" 
                      severity="High" 
                      impact="Privilege Escalation"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: AI Insights & Quick Actions */}
              <div className="space-y-10">
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-400/10 blur-[60px] rounded-full group-hover:bg-cyan-400/20 transition-all" />
                  <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white tracking-tight">AI Remediation Eng.</h3>
                  </div>
                  <div className="space-y-6">
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      Automated analysis suggests <span className="text-white font-bold italic">Critical Patch 04-X</span> for the authentication gateway.
                    </p>
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="w-3 h-3 text-pink-400" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Suggested Fix</span>
                      </div>
                      <code className="text-[11px] text-pink-300 font-mono">
                        use sanitize_input(id);<br/>
                        // Prevent union-based sqli<br/>
                        if(!is_int(id)) return error;
                      </code>
                    </div>
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold tracking-[0.2em] transition-all uppercase">
                      Deploy Virtual Patch
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 backdrop-blur-xl">
                  <h3 className="text-lg font-bold text-white mb-6">Asset Intelligence</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Public APIs</p>
                          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">144 ENDPOINTS</p>
                        </div>
                      </div>
                      <span className="text-cyan-500 text-xs font-mono font-bold">+12%</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                          <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Shadow IT</p>
                          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">8 DETECTED</p>
                        </div>
                      </div>
                      <span className="text-red-500 text-xs font-mono font-bold">CRITICAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-components
const NavIcon = ({ icon: Icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-2xl transition-all duration-300 group relative ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
  >
    <Icon className="w-6 h-6" />
    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-l-full" />}
  </button>
);

const GlassCard = ({ label, value, sub, color }: any) => (
  <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all hover:translate-y-[-2px]">
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-baseline gap-2 mb-1">
      <span className={`text-3xl font-black tracking-tight ${color}`}>{value}</span>
      <span className="text-xs text-slate-600 font-bold tracking-tight">{sub}</span>
    </div>
  </div>
);

const VulnerabilityItem = ({ title, target, severity, impact }: any) => (
  <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-white/[0.04] transition-all cursor-pointer">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{title}</h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> {target}
          </span>
          <span className="w-1 h-1 bg-slate-700 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Impact: {impact}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
        {severity}
      </span>
      <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-all" />
    </div>
  </div>
);
