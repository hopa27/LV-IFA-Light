import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '@/context/app-context';
import { useListBrokers, useCreateBroker } from '@/hooks/use-static-data';
import { Button } from '@/components/shared/FormElements';
import { Combobox } from '@/components/shared/Combobox';
import { Search, FileText, Users, Briefcase, Home, Database, ChevronFirst, ChevronLeft, ChevronRight, ChevronLast, Save, RefreshCw, FilePlus2, ScanSearch, X, Check } from 'lucide-react';

const TABS = [
  { id: 'ifa-detail', label: 'IFA Detail', icon: FileText },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'lookups', label: 'Lookups', icon: Search },
  { id: 'retirement', label: 'Retirement Income', icon: Briefcase },
  { id: 'equity', label: 'Equity Release', icon: Home },
  { id: 'notes', label: 'Notes', icon: Database },
] as const;

function InsertIfaModal({ onClose, onCreate }: { onClose: () => void; onCreate: (data: Record<string, string>) => void }) {
  const [form, setForm] = useState({
    brokerName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    town: '',
    county: '',
    postcode: '',
    telephone: '',
    fax: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleOk = () => {
    if (!form.brokerName.trim()) {
      alert('Please enter a Broker Name.');
      return;
    }
    onCreate(form);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose} role="dialog" aria-label="Insert IFA">
      <div className="bg-[#f0f0f0] border border-[#BBBBBB] rounded-lg shadow-2xl w-[420px]" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="bg-[#002f5c] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
          <span className="text-sm font-semibold font-sans">Insert IFA</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Broker Name</label>
            <input
              autoFocus
              value={form.brokerName}
              onChange={set('brokerName')}
              className="w-full border border-[#BBBBBB] rounded-lg px-3 py-2 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Address</label>
            <div className="flex flex-col">
              <input value={form.addressLine1} onChange={set('addressLine1')} placeholder="Line 1" className="w-full border border-[#BBBBBB] rounded-t-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 placeholder:text-[#BBBBBB] border-b-0" />
              <input value={form.addressLine2} onChange={set('addressLine2')} placeholder="Line 2" className="w-full border border-[#BBBBBB] px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 placeholder:text-[#BBBBBB] border-b-0" />
              <input value={form.addressLine3 || ''} onChange={set('addressLine3')} placeholder="Line 3" className="w-full border border-[#BBBBBB] rounded-b-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2 placeholder:text-[#BBBBBB]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Town</label>
              <input value={form.town} onChange={set('town')} className="w-full border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">County</label>
              <input value={form.county} onChange={set('county')} className="w-full border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Postcode</label>
              <input value={form.postcode} onChange={set('postcode')} className="w-full border border-[#BBBBBB] rounded-lg px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2" />
            </div>
          </div>

          <div className="flex gap-4 pt-1">
            <div className="flex-1">
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Telephone</label>
              <input value={form.telephone} onChange={set('telephone')} className="w-full border border-[#BBBBBB] rounded px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2" />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-[#3d3d3d] font-sans block mb-1">Fax</label>
              <input value={form.fax} onChange={set('fax')} className="w-full border border-[#BBBBBB] rounded px-3 py-1.5 text-sm font-[Mulish] text-[#3d3d3d] outline-none focus:border-[#178830] focus:border-2" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#BBBBBB]">
            <Button onClick={handleOk}>
              <Check className="w-4 h-4" /> Ok
            </Button>
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" /> Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const { activeTab, setActiveTab, activeBrokerId, setActiveBrokerId, activeIfaRef, isDirty, setIsDirty, isSaving, triggerSave } = useApp();
  const { data: brokers = [] } = useListBrokers();
  const createBrokerMutation = useCreateBroker();
  const [showLocateModal, setShowLocateModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [toolbarAction, setToolbarAction] = useState('Appointment');

  const currentIndex = brokers.findIndex(b => b.id === activeBrokerId);
  const total = brokers.length;
  
  const goFirst = () => { if (brokers[0]) setActiveBrokerId(brokers[0].id!); };
  const goPrev = () => { const b = brokers[Math.max(0, currentIndex - 1)]; if (b) setActiveBrokerId(b.id!); };
  const goNext = () => { const b = brokers[Math.min(total - 1, currentIndex + 1)]; if (b) setActiveBrokerId(b.id!); };
  const goLast = () => { const b = brokers[total - 1]; if (b) setActiveBrokerId(b.id!); };

  const hasBroker = activeBrokerId !== null;

  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const [stickyHeight, setStickyHeight] = useState(0);

  useEffect(() => {
    const el = stickyWrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setStickyHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
    });
    ro.observe(el, { box: 'border-box' });
    return () => ro.disconnect();
  }, [activeTab]);

  const handleInsertIfa = (formData: Record<string, string>) => {
    createBrokerMutation.mutate(
      { data: { ...formData, status: 'Authorised' } },
      {
        onSuccess: (newBroker: any) => {
          setActiveBrokerId(newBroker.id);
          setShowInsertModal(false);
        },
        onError: () => {
          alert('Failed to create new IFA. Please try again.');
        },
      }
    );
  };

  return (
    <div className="bg-[#f0f0f0] flex flex-col overflow-auto" style={{ height: 'calc(100vh / 0.8)' }}>
        <header className="bg-[#00263e] text-white px-[142px] pt-4 pb-6 shrink-0">
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

      <div className="sticky top-0 z-30" ref={stickyWrapperRef}>
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

      {activeTab === 'ifa-detail' && (
        <div className="bg-[#f0f0f0] px-[142px] pt-[12px] pb-[12px]">
        <div className="bg-white border border-[#BBBBBB] rounded-lg px-6 py-3 shadow-sm flex items-center justify-between">
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

          <div className="flex items-center gap-2">
            <button onClick={() => setShowInsertModal(true)} disabled={createBrokerMutation.isPending} className="group relative w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <FilePlus2 className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#002f5c] text-white text-[10px] font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">New IFA</span>
            </button>
            <button onClick={() => setShowLocateModal(true)} className="group relative w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors">
              <ScanSearch className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#002f5c] text-white text-[10px] font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Locate IFA</span>
            </button>
            <button onClick={() => setShowLocateModal(true)} className="group relative w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] transition-colors">
              <Search className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#002f5c] text-white text-[10px] font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Lookup IFA</span>
            </button>

            <div className="h-6 w-px bg-[#BBBBBB]" />

            <button onClick={triggerSave} disabled={!isDirty || isSaving} className="group relative w-[44px] h-[44px] flex items-center justify-center rounded-[30px] bg-[#006cf4] text-white shadow-md hover:bg-[#003578] disabled:bg-[#979797] disabled:cursor-not-allowed transition-colors">
              {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#002f5c] text-white text-[10px] font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">Save Changes</span>
            </button>
          </div>
        </div>
        </div>
      )}
      </div>

      <main className="bg-[#f0f0f0] px-[142px] pb-4" style={{ '--sticky-header-h': `${stickyHeight}px` } as React.CSSProperties}>
        {children}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-4 px-[142px] flex justify-between items-center shrink-0">
        <img src="/lve-logo.png" alt="LV= Logo" className="h-6" />
        <div className="text-right">
          <p className="text-[10px] font-medium text-slate-400 font-[Mulish]">Liverpool Victoria Financial Services Limited</p>
          <p className="text-[10px] font-medium text-slate-400 font-[Mulish]">County Gates, Bournemouth BH1 2NF</p>
        </div>
      </footer>

      {showLocateModal && (
        <LocateIfaModal
          onClose={() => setShowLocateModal(false)}
          onSelect={(id) => setActiveBrokerId(id)}
        />
      )}

      {showInsertModal && (
        <InsertIfaModal
          onClose={() => setShowInsertModal(false)}
          onCreate={handleInsertIfa}
        />
      )}
    </div>
  );
}
