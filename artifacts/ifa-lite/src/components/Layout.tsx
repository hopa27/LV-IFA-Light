import React, { useState } from 'react';
import { useApp } from '@/context/app-context';
import { useListBrokers, useCreateBroker } from '@/hooks/use-static-data';
import { Button } from '@/components/shared/FormElements';
import { Combobox } from '@/components/shared/Combobox';
import { Search, FileText, Users, Briefcase, Home, Database, ChevronFirst, ChevronLeft, ChevronRight, ChevronLast, Save, RefreshCw, FilePlus2, ScanSearch, X } from 'lucide-react';

const TABS = [
  { id: 'ifa-detail', label: 'IFA Detail', icon: FileText },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'lookups', label: 'Lookups', icon: Search },
  { id: 'retirement', label: 'Retirement Income', icon: Briefcase },
  { id: 'equity', label: 'Equity Release', icon: Home },
  { id: 'notes', label: 'Notes', icon: Database },
] as const;

function LocateIfaModal({ onClose, onSelect }: { onClose: () => void; onSelect: (id: number) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState<string | null>(null);
  const { data: brokers = [], isLoading } = useListBrokers(
    submittedTerm ? { ifaReference: submittedTerm } : undefined,
    { query: { enabled: submittedTerm !== null && submittedTerm.length > 0 } }
  );

  const canFind = searchTerm.trim().length > 0;

  const handleFind = () => {
    if (!canFind) return;
    setSubmittedTerm(searchTerm.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleFind();
    if (e.key === 'Escape') onClose();
  };

  const hasSearched = submittedTerm !== null && submittedTerm.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose} role="dialog" aria-label="Locate IFA">
      <div className="bg-[#f0f0f0] border border-[#BBBBBB] rounded-lg shadow-2xl w-[480px]" onClick={e => e.stopPropagation()}>
        <div className="bg-[#00263e] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
          <span className="text-sm font-semibold font-sans">Locate IFA</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter IFA reference..."
              autoFocus
              className="flex-1 border border-[#BBBBBB] rounded-lg px-3 py-2 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2"
            />
          </div>

          {hasSearched && (
            <div className="border border-[#BBBBBB] rounded-lg overflow-hidden mb-4 max-h-[200px] overflow-y-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#eaf5f8] sticky top-0">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-[#002f5c] font-sans border-b border-[#BBBBBB]">IFA Ref</th>
                    <th className="px-3 py-2 font-semibold text-[#002f5c] font-sans border-b border-[#BBBBBB]">Broker Name</th>
                    <th className="px-3 py-2 font-semibold text-[#002f5c] font-sans border-b border-[#BBBBBB]">Postcode</th>
                  </tr>
                </thead>
                <tbody className="font-[Mulish]">
                  {isLoading ? (
                    <tr><td colSpan={3} className="text-center py-4 text-[#979797]">Searching...</td></tr>
                  ) : brokers.length === 0 ? (
                    <tr><td colSpan={3} className="text-center py-4 text-[#979797]">No records found.</td></tr>
                  ) : (
                    brokers.map((broker, i) => (
                      <tr
                        key={broker.id}
                        onClick={() => { onSelect(broker.id!); onClose(); }}
                        className={`cursor-pointer hover:bg-[#05579B] hover:text-white transition-colors group ${i % 2 === 1 ? 'bg-[#e7ebec]/30' : 'bg-white'}`}
                      >
                        <td className="px-3 py-1.5 font-medium text-[#005a9c] group-hover:text-white">{broker.ifaRef}</td>
                        <td className="px-3 py-1.5 text-[#3d3d3d] group-hover:text-white">{broker.brokerName}</td>
                        <td className="px-3 py-1.5 text-[#3d3d3d] group-hover:text-white">{broker.postcode}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button onClick={handleFind} disabled={!canFind}>
              <Search className="w-4 h-4" /> Find
            </Button>
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" /> Quit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, activeBrokerId, setActiveBrokerId, activeIfaRef, isDirty, setIsDirty, isSaving, triggerSave, layoutVersion, setLayoutVersion } = useApp();
  const { data: brokers = [] } = useListBrokers();
  const createBrokerMutation = useCreateBroker();
  const [showLocateModal, setShowLocateModal] = useState(false);
  const [toolbarAction, setToolbarAction] = useState('Appointment');

  const currentIndex = brokers.findIndex(b => b.id === activeBrokerId);
  const total = brokers.length;
  
  const goFirst = () => { if (brokers[0]) setActiveBrokerId(brokers[0].id!); };
  const goPrev = () => { const b = brokers[Math.max(0, currentIndex - 1)]; if (b) setActiveBrokerId(b.id!); };
  const goNext = () => { const b = brokers[Math.min(total - 1, currentIndex + 1)]; if (b) setActiveBrokerId(b.id!); };
  const goLast = () => { const b = brokers[total - 1]; if (b) setActiveBrokerId(b.id!); };

  const hasBroker = activeBrokerId !== null;

  const handleAddNewIfa = () => {
    createBrokerMutation.mutate(
      { data: { brokerName: 'New IFA', status: 'Authorised' } },
      {
        onSuccess: (newBroker: any) => {
          setActiveBrokerId(newBroker.id);
        },
        onError: () => {
          alert('Failed to create new IFA. Please try again.');
        },
      }
    );
  };

  return (
    <div className="bg-[#f0f0f0] overflow-auto" style={{ height: 'calc(100vh / 0.8)' }}>
      <header className="bg-[#00263e] text-white px-[142px] pt-4 pb-6">
        <div className="flex items-center justify-between">
          <img src="/lve-logo.png" alt="LV= Logo" className="h-6" />
          <Button variant="primary" className="h-8 px-5 py-1 text-sm font-normal">
            Logout
          </Button>
        </div>
        <div className="h-px bg-slate-600/50 my-4" />
        <h1 className="text-[30px] font-normal tracking-tight text-white" style={{ fontFamily: "'Livvic', sans-serif" }}>
          IFA Lite
        </h1>
      </header>

      <div className="bg-white px-[142px] pt-4 flex gap-2 overflow-hidden">
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

      <div className="sticky top-0 z-20 bg-white border-b border-t border-[#BBBBBB] px-[142px] py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {activeIfaRef && (
            <span className="text-sm font-bold text-[#00263e] font-sans flex items-center gap-2">
              <span className="w-1 h-5 bg-[#006cf4] rounded-sm"></span>
              Broker: <span className="text-[#006cf4]">{activeIfaRef}</span>
            </span>
          )}

          <div className="h-6 w-px bg-[#BBBBBB]" />

          <div className="w-[200px]">
            <Combobox
              value={toolbarAction}
              onChange={setToolbarAction}
              options={[
                { label: 'Appointment', value: 'Appointment' },
                { label: 'Broker Pack Follow Up', value: 'Broker Pack Follow Up' },
                { label: 'Duplicate', value: 'Duplicate' },
                { label: 'Hold', value: 'Hold' },
              ]}
            />
          </div>

          <div className="h-6 w-px bg-[#BBBBBB]" />

          <div className="flex items-center gap-2">
            <button onClick={goFirst} disabled={!hasBroker || currentIndex <= 0} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First Record"><ChevronFirst className="w-5 h-5" /></button>
            <button onClick={goPrev} disabled={!hasBroker || currentIndex <= 0} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous Record"><ChevronLeft className="w-5 h-5" /></button>
            <span className="px-2 min-w-[80px] text-center text-sm font-bold text-[#4a4a49] select-none font-['Mulish']">
              <span>{hasBroker && currentIndex >= 0 ? `${currentIndex + 1} of ${total}` : '0 of 0'}</span>
            </span>
            <button onClick={goNext} disabled={!hasBroker || currentIndex >= total - 1} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next Record"><ChevronRight className="w-5 h-5" /></button>
            <button onClick={goLast} disabled={!hasBroker || currentIndex >= total - 1} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last Record"><ChevronLast className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleAddNewIfa} disabled={createBrokerMutation.isPending}>
            <FilePlus2 className="w-4 h-4" />
            New IFA
          </Button>
          <Button variant="secondary" onClick={() => setShowLocateModal(true)}>
            <ScanSearch className="w-4 h-4" />
            Locate IFA
          </Button>

          <div className="h-6 w-px bg-[#BBBBBB]" />

          <Button onClick={triggerSave} disabled={!isDirty || isSaving}>
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <main className="bg-[#f0f0f0] px-[142px] py-4">
        {children}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-4 px-[142px] flex justify-between items-center">
        <img src="/lve-logo.png" alt="LV= Logo" className="h-6" />
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-medium text-slate-400 font-[Mulish]">Liverpool Victoria Financial Services Limited</p>
            <p className="text-[10px] font-medium text-slate-400 font-[Mulish]">County Gates, Bournemouth BH1 2NF</p>
          </div>
          <div className="w-[130px]">
            <Combobox
              value={layoutVersion}
              onChange={(val) => {
                if (isDirty) {
                  if (!window.confirm('You have unsaved changes. Switch layout anyway?')) return;
                  setIsDirty(false);
                }
                setLayoutVersion(val as 'v1' | 'v2');
              }}
              options={[
                { label: 'Layout V1', value: 'v1' },
                { label: 'Layout V2', value: 'v2' },
              ]}
            />
          </div>
        </div>
      </footer>

      {showLocateModal && (
        <LocateIfaModal
          onClose={() => setShowLocateModal(false)}
          onSelect={(id) => setActiveBrokerId(id)}
        />
      )}
    </div>
  );
}
