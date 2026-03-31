import React from 'react';
import { useApp } from '@/context/app-context';
import { useListBrokers } from '@workspace/api-client-react';
import { Button } from '@/components/shared/FormElements';
import { Search, FileText, Users, Briefcase, Home, Database, LogOut, ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
      <header className="bg-[#00263e] text-white px-6 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold tracking-tight font-sans">
            IFA Lite
          </h1>
          <span className="text-xs text-white/60 font-[Mulish]">Standard User</span>
        </div>
        <div className="h-px bg-slate-600/50" />
      </header>

      <div className="bg-white px-6 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 min-w-[140px] px-6 py-3 rounded-t-lg text-[15px] font-semibold font-sans transition-all
                ${isActive 
                  ? 'bg-white text-[#4a4a49] shadow-[0_-2px_8px_rgba(0,0,0,0.08)] z-10 relative border-t-2 border-x border-[#BBBBBB] border-t-[#006cf4]' 
                  : 'bg-[#eaf5f8] text-[#0d2c41] hover:bg-[#dceef3]'
                }
              `}
              style={isActive ? { marginBottom: '-1px' } : {}}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#006cf4]' : 'text-[#0d2c41]/60'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white border-b border-t border-[#BBBBBB] px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select className="border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] bg-white outline-none cursor-pointer hover:border-[#178830] focus:border-[#178830] focus:border-2">
            <option>Active</option>
            <option>Hold</option>
          </select>

          <div className="h-6 w-px bg-[#BBBBBB]" />

          <div className="flex items-center gap-1">
            <button onClick={goFirst} disabled={!hasBroker || currentIndex <= 0} className="p-1.5 rounded-lg hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First Record"><ChevronFirst className="w-4 h-4 text-[#006cf4]" /></button>
            <button onClick={goPrev} disabled={!hasBroker || currentIndex <= 0} className="p-1.5 rounded-lg hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous Record"><ChevronLeft className="w-4 h-4 text-[#006cf4]" /></button>
            <span className="px-3 text-xs font-semibold text-[#3d3d3d] select-none font-sans">
              {hasBroker && currentIndex >= 0 ? `Record ${currentIndex + 1} of ${total}` : 'No Record'}
            </span>
            <button onClick={goNext} disabled={!hasBroker || currentIndex >= total - 1} className="p-1.5 rounded-lg hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next Record"><ChevronRight className="w-4 h-4 text-[#006cf4]" /></button>
            <button onClick={goLast} disabled={!hasBroker || currentIndex >= total - 1} className="p-1.5 rounded-lg hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last Record"><ChevronLast className="w-4 h-4 text-[#006cf4]" /></button>
          </div>
        </div>

        <Button variant="secondary" className="text-xs px-4 py-1.5 h-auto">
          <LogOut className="w-3.5 h-3.5" /> Exit
        </Button>
      </div>

      <main className="flex-1 overflow-hidden bg-[#f0f0f0] relative p-4">
        {children}
      </main>
      
      <footer className="bg-white border-t border-[#BBBBBB] py-3 px-6 flex justify-between items-center shrink-0 mt-auto">
        <span className="text-sm font-bold text-[#00263e] font-sans">IFA Lite</span>
        <span className="text-[10px] font-medium text-[#979797] font-[Mulish]">SSO Authentication: Active</span>
      </footer>
    </div>
  );
}
