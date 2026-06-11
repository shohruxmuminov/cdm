import React, { useState } from 'react';
import { 
  Shield, Activity, Globe, Zap, AlertCircle, 
  Terminal, BarChart3, Lock, Cpu, Database,
  ArrowUpRight, Target, LayoutDashboard, Settings
} from 'lucide-react';
import { AttackSurfaceVisualizer } from '@/three/AttackSurfaceVisualizer';

export default function EnterpriseDashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const mockAssets = [
    { id: '1', value: 'api.corp.com', status: 'ACTIVE' },
    { id: '2', value: 'internal.corp.com', status: 'VULNERABLE' },
    { id: '3', value: 'cdn-01.corp.com', status: 'ACTIVE' },
    { id: '4', value: 'db-prod.vpc.corp.com', status: 'ACTIVE' },
    { id: '5', value: 'legacy-app.corp.com', status: 'VULNERABLE' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      {/* Sidebar - Pro Design */}
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-72 bg-slate-950 border-r border-white/5 p-6 z-50">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white hidden lg:block uppercase">Cyber<span className="text-cyan-500">Core</span></span>
        </div>

        <nav className="space-y-2">
           <NavItem icon={LayoutDashboard} label="Operations" active />
           <NavItem icon={Target} label="Asset Discovery" />
           <NavItem icon={Activity} label="Risk Analysis" badge="3" />
           <NavItem icon={Terminal} label="Exploit Probes" />
           <NavItem icon={Database} label="Compliance" />
           <div className="py-8">
             <div className="h-px bg-white/5 mb-8" />
             <NavItem icon={Cpu} label="System Config" />
             <NavItem icon={Settings} label="Governance" />
           </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 p-10">
        {/* Top Navigation */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Security Command Center</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Authorized Enterprise Vulnerability Management Platform</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800" />)}
               <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-cyan-600 flex items-center justify-center text-xs font-bold">+5</div>
            </div>
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              + New Target
            </button>
          </div>
        </header>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
           <StatCard label="Attack Surface" value="1,248" sub="Global Assets" trend="+12%" color="cyan" />
           <StatCard label="Critical Threats" value="09" sub="Active Findings" trend="-2" color="red" />
           <StatCard label="Mean Time to Fix" value="3.4" sub="Days (Avg)" trend="-0.5" color="blue" />
           <StatCard label="Infrastructure Score" value="A+" sub="Top 5% Tier" trend="+0.2" color="green" />
        </div>

        {/* 3D Attack Surface Visualizer */}
        <div className="mb-10 group">
           <AttackSurfaceVisualizer assets={mockAssets} />
        </div>

        {/* Real-time Intel Feed & Active Scans */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
           <div className="xl:col-span-2 space-y-8">
              <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 backdrop-blur-3xl overflow-hidden relative">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                       <Zap className="w-6 h-6 text-cyan-500" /> Active Scan Pipeline
                    </h3>
                    <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">
                       4 SCANS RUNNING
                    </span>
                 </div>

                 <div className="space-y-6">
                    <ActiveScanItem 
                      target="app.global-nexus.io" 
                      type="Full Audit" 
                      progress={72} 
                      status="Vulnerability Probing..." 
                    />
                    <ActiveScanItem 
                      target="api.fintech-core.com" 
                      type="API Security" 
                      progress={45} 
                      status="Endpoint Discovery" 
                    />
                 </div>
              </div>

              {/* Vulnerability Matrix */}
              <div className="bg-slate-900/40 border border-white/5 rounded-[40px] overflow-hidden">
                 <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Vulnerability Intelligence</h3>
                    <button className="text-cyan-400 text-sm font-bold flex items-center gap-1 group">
                       View Historical Matrix <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-slate-500 text-xs uppercase tracking-widest bg-white/[0.02]">
                             <th className="px-8 py-4 font-bold">Threat Identifier</th>
                             <th className="px-8 py-4 font-bold">Severity</th>
                             <th className="px-8 py-4 font-bold">Target Vector</th>
                             <th className="px-8 py-4 font-bold">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          <ThreatRow id="VULN-2024-001" title="SQL Injection via Auth Module" severity="CRITICAL" vector="POST /api/v1/auth" status="Open" />
                          <ThreatRow id="VULN-2024-002" title="Exposed Redis Instance" severity="HIGH" vector="64.22.1.84:6379" status="Patching" />
                          <ThreatRow id="VULN-2024-003" title="Broken Access Control" severity="MEDIUM" vector="app.corp.com/admin" status="Awaiting Review" />
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* AI Remediation Insight Panel */}
           <div className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-500/20">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                       <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">AI Remediation Eng.</h3>
                 </div>
                 <p className="text-indigo-100 text-sm leading-relaxed mb-8">
                    Our AI models have identified 3 critical paths to improve your posture by <span className="font-bold underline">18%</span> in the next 24 hours.
                 </p>
                 <div className="space-y-4">
                    <InsightAction label="Patch Nginx v1.18" icon={Lock} />
                    <InsightAction label="Rotate API Keys" icon={Zap} />
                    <InsightAction label="Enable WAF on CDN" icon={Shield} />
                 </div>
              </div>

              <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8">
                 <h3 className="text-lg font-bold text-white mb-6">Threat Distribution</h3>
                 <div className="space-y-4">
                    <ProgressRow label="Web App" value={65} color="bg-cyan-500" />
                    <ProgressRow label="Cloud Config" value={25} color="bg-indigo-500" />
                    <ProgressRow label="Endpoint Sec" value={45} color="bg-pink-500" />
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components
const NavItem = ({ icon: Icon, label, active = false, badge }: any) => (
  <button className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
    <div className="flex items-center gap-4">
      <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'group-hover:text-white'}`} />
      <span className="font-bold text-sm tracking-tight hidden lg:block">{label}</span>
    </div>
    {badge && <span className="bg-red-500/20 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-lg hidden lg:block">{badge}</span>}
  </button>
);

const StatCard = ({ label, value, sub, trend, color }: any) => {
  const colors: any = {
    cyan: 'bg-cyan-500/10 text-cyan-500',
    red: 'bg-red-500/10 text-red-500',
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
  };
  return (
    <div className="p-8 rounded-[40px] bg-slate-900/30 border border-white/5 hover:border-white/10 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{label}</p>
        <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 group-hover:bg-white/10">{trend}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className="text-sm text-slate-600 font-bold">{sub}</span>
      </div>
    </div>
  );
};

const ActiveScanItem = ({ target, type, progress, status }: any) => (
  <div className="p-6 bg-slate-800/20 border border-white/5 rounded-3xl group">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{target}</h4>
        <p className="text-xs text-slate-500 font-medium">{type} • {status}</p>
      </div>
      <div className="text-right">
        <span className="text-xl font-black text-cyan-400">{progress}%</span>
      </div>
    </div>
    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]" style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const ThreatRow = ({ id, title, severity, vector, status }: any) => (
  <tr className="hover:bg-white/[0.01] transition-colors cursor-pointer group">
    <td className="px-8 py-6">
       <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">{id}</span>
       <h5 className="text-sm font-bold text-white mt-1">{title}</h5>
    </td>
    <td className="px-8 py-6">
       <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
          {severity}
       </span>
    </td>
    <td className="px-8 py-6 text-sm text-slate-400 font-mono italic">{vector}</td>
    <td className="px-8 py-6">
       <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs text-slate-500 font-bold">{status}</span>
       </div>
    </td>
  </tr>
);

const InsightAction = ({ label, icon: Icon }: any) => (
  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all cursor-pointer">
     <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-white" />
        <span className="text-sm font-bold">{label}</span>
     </div>
     <ArrowUpRight className="w-4 h-4 text-white/50" />
  </div>
);

const ProgressRow = ({ label, value, color }: any) => (
  <div>
     <div className="flex justify-between text-xs font-bold mb-2">
        <span className="text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-white">{value}%</span>
     </div>
     <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
     </div>
  </div>
);
