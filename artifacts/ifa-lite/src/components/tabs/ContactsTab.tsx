import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useListContacts, useListBrokers } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormSelect, FormRadioGroup, FormCheckbox, Button } from '@/components/shared/FormElements';
import { Combobox } from '@/components/shared/Combobox';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Search, X, Check } from 'lucide-react';

function NetworkLookupModal({ onSelect, onClose }: { onSelect: (ifa: string, name: string, postcode: string) => void; onClose: () => void }) {
  const [ifaRef, setIfaRef] = useState('');
  const [postcode, setPostcode] = useState('');
  const [brokerName, setBrokerName] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: allBrokers = [] } = useListBrokers();

  const filtered = useMemo(() => {
    return allBrokers.filter(b => {
      if (ifaRef && !b.ifaRef?.toLowerCase().includes(ifaRef.toLowerCase())) return false;
      if (postcode && !b.postcode?.toLowerCase().includes(postcode.toLowerCase())) return false;
      if (brokerName && !b.brokerName?.toLowerCase().includes(brokerName.toLowerCase())) return false;
      return true;
    });
  }, [allBrokers, ifaRef, postcode, brokerName]);

  const handleOk = () => {
    const broker = allBrokers.find(b => b.id === selectedId);
    if (broker) {
      onSelect(broker.ifaRef || '', broker.brokerName || '', broker.postcode || '');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-[#f0f0f0] rounded-lg shadow-2xl w-[680px] max-h-[80vh] flex flex-col border border-[#BBBBBB]" onClick={e => e.stopPropagation()}>
        <div className="bg-[#002f5c] text-white px-4 py-2.5 flex items-center justify-between rounded-t-lg">
          <span className="text-sm font-semibold font-sans">IFA Network Lookup</span>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-4 py-3 border-b border-[#BBBBBB]">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-[#3d3d3d] font-sans block mb-0.5">IFA Ref.</label>
              <input
                className="w-full px-2 py-1 text-xs border border-[#BBBBBB] rounded bg-white font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none"
                value={ifaRef}
                onChange={e => setIfaRef(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-[#3d3d3d] font-sans block mb-0.5">Postcode</label>
              <input
                className="w-full px-2 py-1 text-xs border border-[#BBBBBB] rounded bg-white font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-semibold text-[#3d3d3d] font-sans block mb-0.5">Broker Name</label>
              <input
                className="w-full px-2 py-1 text-xs border border-[#BBBBBB] rounded bg-white font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none"
                value={brokerName}
                onChange={e => setBrokerName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-4 py-2 border-b border-[#BBBBBB]">
          <Button className="text-xs px-3 py-1" onClick={handleOk} disabled={selectedId === null}>
            <Check className="w-3 h-3" /> OK
          </Button>
          <Button variant="secondary" className="text-xs px-3 py-1" onClick={onClose}>
            <X className="w-3 h-3" /> Cancel
          </Button>
        </div>

        <div className="flex-1 overflow-auto max-h-[350px]">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-[#eaf5f8] sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">IFA_REF</th>
                <th className="px-3 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">POST_CODE</th>
                <th className="px-3 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">BROKER_NAME</th>
              </tr>
            </thead>
            <tbody className="font-[Mulish]">
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-6 text-[#979797] italic">No records found</td></tr>
              ) : (
                filtered.map((b, i) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    onDoubleClick={() => {
                      setSelectedId(b.id);
                      onSelect(b.ifaRef || '', b.brokerName || '', b.postcode || '');
                    }}
                    className={`cursor-pointer border-b border-[#BBBBBB]/20 transition-colors ${
                      selectedId === b.id
                        ? 'bg-[#05579B] text-white'
                        : i % 2 === 1 ? 'bg-[#e7ebec]/20 hover:bg-[#05579B]/20' : 'bg-white hover:bg-[#05579B]/20'
                    }`}
                  >
                    <td className="px-3 py-1.5 whitespace-nowrap">{b.ifaRef}</td>
                    <td className="px-3 py-1.5 whitespace-nowrap">{b.postcode}</td>
                    <td className="px-3 py-1.5 whitespace-nowrap">{b.brokerName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#BBBBBB] bg-[#f0f0f0] rounded-b-lg">
          <div className="text-[10px] text-[#979797] font-[Mulish]">
            {filtered.length} record{filtered.length !== 1 ? 's' : ''} found — click to select, double-click to confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactsTab() {
  const { activeBrokerId } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNetworkLookup, setShowNetworkLookup] = useState(false);
  const [networkOverrides, setNetworkOverrides] = useState<{ networkIfa?: string; networkName?: string; networkPostcode?: string } | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setToolbarHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
    });
    ro.observe(el, { box: 'border-box' });
    return () => ro.disconnect();
  }, []);

  const { data: contacts = [] } = useListContacts(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-[#979797] font-[Mulish]">Please select a broker first.</div>;
  }

  const currentContact: any = contacts[currentIndex] || {};

  const networkIfa = networkOverrides?.networkIfa ?? currentContact.networkIfa ?? '';
  const networkName = networkOverrides?.networkName ?? currentContact.networkName ?? '';
  const networkPostcode = networkOverrides?.networkPostcode ?? currentContact.networkPostcode ?? '';

  const handleNetworkSelect = (ifa: string, name: string, postcode: string) => {
    setNetworkOverrides({ networkIfa: ifa, networkName: name, networkPostcode: postcode });
    setShowNetworkLookup(false);
  };

  const handleContactChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    setNetworkOverrides(null);
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      <div ref={toolbarRef} className="sticky z-20 pt-[12px] pb-[12px] bg-[#f0f0f0]" style={{ top: 'var(--sticky-header-h, 52px)' }}>
      <div className="flex items-center justify-between bg-white border border-[#BBBBBB] rounded-lg px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-[#00263e] font-sans flex items-center gap-2">
            <span className="w-1 h-5 bg-[#006cf4] rounded-sm"></span>
            Reference: <span className="text-[#006cf4]">{currentContact.reference || ''}</span>
          </span>

          <div className="h-6 w-px bg-[#BBBBBB]" />

          <div className="flex items-center gap-2">
            <button onClick={() => handleContactChange(0)} disabled={currentIndex === 0} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="First Contact"><ChevronsLeft className="w-5 h-5" /></button>
            <button onClick={() => handleContactChange(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Previous Contact"><ChevronLeft className="w-5 h-5" /></button>
            <span className="px-2 min-w-[80px] text-center text-sm font-bold text-[#4a4a49] select-none font-['Mulish']">
              {contacts.length > 0 ? `${currentIndex + 1} of ${contacts.length}` : '0 of 0'}
            </span>
            <button onClick={() => handleContactChange(Math.min(contacts.length - 1, currentIndex + 1))} disabled={currentIndex >= contacts.length - 1} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Next Contact"><ChevronRight className="w-5 h-5" /></button>
            <button onClick={() => handleContactChange(contacts.length - 1)} disabled={currentIndex >= contacts.length - 1} className="w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Last Contact"><ChevronsRight className="w-5 h-5" /></button>
          </div>
        </div>

        <Button variant="secondary"><Plus className="w-4 h-4" /> Add New</Button>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <div className="sticky z-10 self-start" style={{ top: `calc(var(--sticky-header-h, 52px) + ${toolbarHeight}px)` }}>
          <div className="mb-4">
            <div className="grid grid-cols-[80px_1fr_80px_1fr] gap-x-2 gap-y-2 items-center">
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Title</label>
              <div>
                <Combobox options={[{label: '', value: ''}, {label: 'Mr', value: 'Mr'}, {label: 'Mrs', value: 'Mrs'}, {label: 'Ms', value: 'Ms'}, {label: 'Dr', value: 'Dr'}]} value={currentContact.title || ''} onChange={() => {}} />
              </div>
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Initials</label>
              <input value={currentContact.initials || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />

              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Forename</label>
              <input value={currentContact.forename || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Surname</label>
              <input value={currentContact.surname || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />

              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Salutation</label>
              <input value={currentContact.salutation || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Position</label>
              <input value={currentContact.position || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
            </div>

            <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-2 items-center mt-2">
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 1</label>
              <input value={currentContact.addressLine1 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 2</label>
              <input value={currentContact.addressLine2 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 3</label>
              <input value={currentContact.addressLine3 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 4</label>
              <input value={currentContact.addressLine4 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 5</label>
              <input value={currentContact.addressLine5 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Address Line 6</label>
              <input value={currentContact.addressLine6 || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
            </div>

            <div className="grid grid-cols-[80px_1fr_80px_1fr] gap-x-2 gap-y-2 items-center mt-2">
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Home Telephone</label>
              <input value={currentContact.homeTelephone || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Mobile Telephone</label>
              <input value={currentContact.mobileTelephone || ''} className="px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />

              <label className="text-xs font-semibold text-[#3d3d3d] text-right font-sans">Email Address</label>
              <input type="email" value={currentContact.emailAddress || ''} className="col-span-3 px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors" readOnly />
            </div>
          </div>
        </div>

        <div>
          <Fieldset title="IFA Bank Detail">
            <FormRadioGroup 
              label="Paid By BACS" 
              name="paidByBacs" 
              options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} 
              value={String(currentContact.paidByBacs)} 
            />
            <FormInput label="Bank Sort Code" value={currentContact.bankSortCode || ''} />
            <FormInput label="Bank Account Number" value={currentContact.bankAccountNo || ''} />
            <FormInput label="Bank Account Name" value={currentContact.bankAccountName || ''} />
            <FormInput label="Bank Reference" value={currentContact.bankReference || ''} />
          </Fieldset>

          <Fieldset title="Network Related Detail">
            <div className="pl-[33%] mb-3">
              <FormCheckbox label="Use terms from principal agent/network" checked={currentContact.useNetworkTerms} />
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <FormSelect label="Default Advice Type" options={[{label: '', value: ''}, {label: 'Independent', value: 'Independent'}, {label: 'Restricted', value: 'Restricted'}]} value={currentContact.defaultAdviceType || ''} />
                <FormSelect label="Default Remuneration Basis" options={[{label: '', value: ''}, {label: 'Fee', value: 'Fee'}, {label: 'Commission', value: 'Commission'}]} value={currentContact.defaultRemunerationBasis || ''} />
              </div>
              <div className="shrink-0">
                <FormRadioGroup label="Network" name="network" options={[{label: 'Y', value: 'true'}, {label: 'N', value: 'false'}]} value={String(currentContact.network)} />
              </div>
            </div>
            <div className="flex gap-4 items-start mt-3">
              <span className="text-xs font-semibold text-[#3d3d3d] font-sans whitespace-nowrap pt-1">Default Distribution Channel</span>
              <div className="flex-1 space-y-2">
                <FormSelect label="Restricted Advice" options={[{label: '', value: ''}]} labelWidth="w-auto" />
                <FormSelect label="Simplified Advice" options={[{label: '', value: ''}]} labelWidth="w-auto" />
                <FormSelect label="Non Advised" options={[{label: '', value: ''}]} labelWidth="w-auto" />
              </div>
            </div>

            <Fieldset title="IFA Member Detail" className="mt-4">
              <div className="flex items-center gap-3 mb-2">
                <label className="w-1/3 text-xs font-semibold text-[#3d3d3d] text-right truncate font-sans">Network IFA</label>
                <div className="flex-1 flex gap-2 items-center">
                  <input
                    value={networkIfa}
                    readOnly
                    className="flex-1 px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none"
                  />
                  <Button variant="outline" className="px-2 py-1 rounded-lg shrink-0" onClick={() => setShowNetworkLookup(true)}><Search className="w-3 h-3" /></Button>
                </div>
              </div>
              <FormInput label="Network Name" value={networkName} readOnly className="bg-[#CCCCCC]" />
              <FormInput label="Postcode" value={networkPostcode} readOnly className="bg-[#CCCCCC]" />
              <div className="flex justify-center mt-3">
                <Fieldset title="Tied Agent" className="mb-0 px-6">
                  <FormRadioGroup label="" name="tiedAgent" options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} value={String(currentContact.tiedAgent)} />
                </Fieldset>
              </div>
            </Fieldset>

            <Fieldset title="Network Members" className="mt-4">
              <div className="border border-[#BBBBBB] rounded-lg overflow-hidden">
                <table className="w-full text-xs font-[Mulish]">
                  <thead className="bg-[#eaf5f8]">
                    <tr>
                      <th className="px-2 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">IFA Ref</th>
                      <th className="px-2 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Broker Name</th>
                      <th className="px-2 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Post Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="px-2 py-3 text-[#979797] italic" colSpan={3}>No network members</td></tr>
                  </tbody>
                </table>
              </div>
            </Fieldset>

            <div className="flex gap-3 items-center mt-4">
              <FormInput label="Principal Agent Ref" value={currentContact.principalAgentRef || ''} className="flex-1" />
              <Button variant="outline" className="px-2 py-1 rounded-lg"><Search className="w-3 h-3" /></Button>
              <Button variant="outline" className="px-2 py-1 rounded-lg text-xs">Clr</Button>
              <div className="shrink-0">
                <FormRadioGroup label="Principal" name="principalNY" options={[{label: 'N', value: 'false'}, {label: 'Y', value: 'true'}]} value={String(currentContact.isPrincipal)} />
              </div>
            </div>
          </Fieldset>

          <Fieldset title="Quote Terms">
            <p className="text-xs text-[#3d3d3d] font-[Mulish] mb-2">Best rate required for all quotes greater than or equal to:</p>
            <div className="flex gap-4">
              <FormInput label="Internal / LV.com" value={currentContact.quoteTermsInternal || '0'} labelWidth="w-auto" />
              <FormInput label="Portals" value={currentContact.quoteTermsPortals || '0'} labelWidth="w-auto" />
            </div>
          </Fieldset>
        </div>
      </div>

      {showNetworkLookup && (
        <NetworkLookupModal
          onSelect={handleNetworkSelect}
          onClose={() => setShowNetworkLookup(false)}
        />
      )}
    </div>
  );
}
