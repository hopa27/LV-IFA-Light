import React, { useState } from 'react';
import { useListBrokers } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormCheckbox, Button } from '@/components/shared/FormElements';
import { Search, Building, CheckCircle } from 'lucide-react';

export default function LookupsTab() {
  const { setActiveBrokerId } = useApp();
  const [postcode, setPostcode] = useState('');
  const [ifaReference, setIfaReference] = useState('');
  const [ifaName, setIfaName] = useState('');
  const [authorised, setAuthorised] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const [duplicateRecord, setDuplicateRecord] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});

  const { data: brokers = [], isLoading } = useListBrokers(searchParams);

  const handleSearch = () => {
    const params: Record<string, any> = {};
    if (postcode) params.postcode = postcode;
    if (ifaReference) params.ifaReference = ifaReference;
    if (ifaName) params.ifaName = ifaName;
    if (authorised) params.authorised = true;
    if (cancelled) params.cancelled = true;
    if (duplicateRecord) params.duplicateRecord = true;
    if (revoked) params.revoked = true;
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col h-full">
      <Fieldset title="Search Criteria">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <FormInput 
              label="Postcode" 
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. EC1A"
            />
            <FormInput 
              label="IFA Reference" 
              value={ifaReference}
              onChange={(e) => setIfaReference(e.target.value)}
            />
            <FormInput 
              label="IFA Name" 
              value={ifaName}
              onChange={(e) => setIfaName(e.target.value)}
            />
          </div>
          
          <div className="space-y-3 pt-2 pl-4 border-l border-[#BBBBBB]">
            <FormCheckbox label="Authorised" checked={authorised} onChange={(e) => setAuthorised(e.target.checked)} />
            <FormCheckbox label="Cancelled" checked={cancelled} onChange={(e) => setCancelled(e.target.checked)} />
            <FormCheckbox label="Duplicate Record" checked={duplicateRecord} onChange={(e) => setDuplicateRecord(e.target.checked)} />
            <FormCheckbox label="Revoked" checked={revoked} onChange={(e) => setRevoked(e.target.checked)} />
          </div>
          
          <div className="flex flex-col gap-3 justify-center items-end pr-4">
            <Button className="w-36" onClick={handleSearch}><Search className="w-4 h-4" /> Search</Button>
            <Button variant="secondary" className="w-36"><Building className="w-4 h-4" /> Club</Button>
          </div>
        </div>
      </Fieldset>

      <div className="flex-1 bg-white border border-[#BBBBBB] rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="bg-[#002f5c] border-b-[3px] border-[#04589b] px-4 py-3 font-semibold text-sm text-white uppercase tracking-wider flex justify-between font-sans">
          <span>Search Results ({brokers.length})</span>
          <span className="text-[10px] text-white/60 font-[Mulish] normal-case">Click a row to view details</span>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-[#eaf5f8] sticky top-0">
              <tr>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans">IFA_REF</th>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans">BROKER_NO</th>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans">FIMBRA_NO</th>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans">BROKER_NAME</th>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans">POSTCODE</th>
                <th className="px-4 py-3 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="font-[Mulish]">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8 text-[#979797]">Loading...</td></tr>
              ) : brokers.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-[#979797]">No records found.</td></tr>
              ) : (
                brokers.map((broker, i) => (
                  <tr 
                    key={broker.id} 
                    onClick={() => setActiveBrokerId(broker.id!)}
                    className={`border-b border-[#BBBBBB]/20 hover:bg-[#05579B] hover:text-white cursor-pointer transition-colors group ${i % 2 === 1 ? 'bg-[#e7ebec]/20' : 'bg-white'}`}
                  >
                    <td className="px-4 py-2 font-medium text-[#005a9c] underline group-hover:text-white">{broker.ifaRef}</td>
                    <td className="px-4 py-2 text-[#3d3d3d] group-hover:text-white">{broker.brokerNo}</td>
                    <td className="px-4 py-2 text-[#3d3d3d] group-hover:text-white">{broker.fimbraNo}</td>
                    <td className="px-4 py-2 font-medium text-[#3d3d3d] group-hover:text-white">{broker.brokerName}</td>
                    <td className="px-4 py-2 text-[#3d3d3d] group-hover:text-white">{broker.postcode}</td>
                    <td className="px-4 py-2 text-center">
                      {broker.status === 'Authorised' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#178830]/10 text-[#178830] group-hover:bg-white/20 group-hover:text-white">
                          <CheckCircle className="w-3 h-3" /> Authorised
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#eaf5f8] text-[#0d2c41] group-hover:bg-white/20 group-hover:text-white">
                          {broker.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
