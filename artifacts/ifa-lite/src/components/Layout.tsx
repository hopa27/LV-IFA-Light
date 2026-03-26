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
      <header className="bg-slate-800 text-slate-100 px-4 py-2 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              IFA Lite
            </h1>
          </div>
          
          <div className="flex items-center bg-slate-700/50 rounded-lg p-1 border border-slate-600/50">
            <Button variant="outline" className="bg-transparent border-none text-slate-300 hover:text-white hover:bg-slate-600 px-2 py-1" onClick={goFirst} disabled={!hasBroker || currentIndex <= 0} title="First Record"><ChevronFirst className="w-4 h-4" /></Button>
            <Button variant="outline" className="bg-transparent border-none text-slate-300 hover:text-white hover:bg-slate-600 px-2 py-1" onClick={goPrev} disabled={!hasBroker || currentIndex <= 0} title="Previous Record"><ChevronLeft className="w-4 h-4" /></Button>
            <div className="px-3 text-xs font-medium text-slate-400">
              {hasBroker && currentIndex >= 0 ? `Record ${currentIndex + 1} of ${total}` : 'No Record'}
            </div>
            <Button variant="outline" className="bg-transparent border-none text-slate-300 hover:text-white hover:bg-slate-600 px-2 py-1" onClick={goNext} disabled={!hasBroker || currentIndex >= total - 1} title="Next Record"><ChevronRight className="w-4 h-4" /></Button>
            <Button variant="outline" className="bg-transparent border-none text-slate-300 hover:text-white hover:bg-slate-600 px-2 py-1" onClick={goLast} disabled={!hasBroker || currentIndex >= total - 1} title="Last Record"><ChevronLast className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded border border-slate-600/50">
            <Activity className="w-4 h-4 text-green-400" />
            <select className="bg-transparent text-sm font-medium outline-none cursor-pointer">
              <option className="text-black">Active</option>
              <option className="text-black">Hold</option>
            </select>
          </div>
          <Button variant="outline" className="bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors">
            <LogOut className="w-4 h-4 mr-2" /> Exit
          </Button>
        </div>
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
