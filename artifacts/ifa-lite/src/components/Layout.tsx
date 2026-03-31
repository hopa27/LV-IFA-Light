import React from 'react';
import { useApp } from '@/context/app-context';
import { useListBrokers } from '@workspace/api-client-react';
import { Button } from '@/components/shared/FormElements';
import { Search, FileText, Users, Briefcase, Home, ShieldCheck, Database, LogOut, ChevronFirst, ChevronLeft, ChevronRight, ChevronLast, Activity } from 'lucide-react';

const TABS = [
  { id: 'ifa-detail', label: 'IFA Detail', icon: FileText },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'lookups', label: 'Lookups', icon: Search },
  { id: 'retirement', label: 'Retirement Income', icon: Briefcase },
  { id: 'equity', label: 'Equity Release', icon: Home },
  { id: 'notes', label: 'Notes', icon: Database },
] as const;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, activeBrokerId, setActiveBrokerId } = useApp();
  const { data: brokers = [] } = useListBrokers();

  const currentIndex = brokers.findIndex(b => b.id === activeBrokerId);
  const total = brokers.length;
  
  const goFirst = () => { if (brokers[0]) setActiveBrokerId(brokers[0].id!); };
  const goPrev = () => { const b = brokers[Math.max(0, currentIndex - 1)]; if (b) setActiveBrokerId(b.id!); };
  const goNext = () => { const b = brokers[Math.min(total - 1, currentIndex + 1)]; if (b) setActiveBrokerId(b.id!); };
  const goLast = () => { const b = brokers[total - 1]; if (b) setActiveBrokerId(b.id!); };

  const hasBroker = activeBrokerId !== null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800 text-slate-100 px-4 py-1.5 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            IFA Lite
          </h1>
        </div>
        <span className="text-xs text-slate-400">Standard User</span>
      </header>

      <div className="bg-white border-b border-border px-4 pt-3 flex gap-1 shadow-sm overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-sm font-semibold transition-all border-t border-x
                ${isActive 
                  ? 'bg-slate-50 text-primary border-slate-200 border-b-slate-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10 relative' 
                  : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200 border-b-border'
                }
              `}
              style={isActive ? { marginBottom: '-1px' } : {}}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-green-500" />
            <select className="border border-slate-300 rounded px-2 py-1 text-sm font-medium bg-white outline-none cursor-pointer">
              <option>Active</option>
              <option>Hold</option>
            </select>
          </div>

          <div className="h-5 w-px bg-slate-300" />

          <div className="flex items-center gap-0.5">
            <button onClick={goFirst} disabled={!hasBroker || currentIndex <= 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" title="First Record"><ChevronFirst className="w-4 h-4 text-slate-600" /></button>
            <button onClick={goPrev} disabled={!hasBroker || currentIndex <= 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" title="Previous Record"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
            <span className="px-2 text-xs font-medium text-slate-500 select-none">
              {hasBroker && currentIndex >= 0 ? `Record ${currentIndex + 1} of ${total}` : 'No Record'}
            </span>
            <button onClick={goNext} disabled={!hasBroker || currentIndex >= total - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" title="Next Record"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
            <button onClick={goLast} disabled={!hasBroker || currentIndex >= total - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed" title="Last Record"><ChevronLast className="w-4 h-4 text-slate-600" /></button>
          </div>
        </div>

        <Button variant="outline" className="text-rose-600 border-rose-300 hover:bg-rose-50 text-xs px-3 py-1">
          <LogOut className="w-3.5 h-3.5 mr-1.5" /> Exit
        </Button>
      </div>

      <main className="flex-1 overflow-hidden bg-slate-50 relative p-4">
        {children}
      </main>
      
      <footer className="bg-slate-200 border-t border-slate-300 text-[10px] text-slate-500 px-4 py-1 flex justify-between">
        <span>SSO Authentication: Active</span>
        <span>Standard User</span>
      </footer>
    </div>
  );
}
