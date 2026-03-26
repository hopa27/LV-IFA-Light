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
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <Fieldset title="Search Criteria" className="bg-slate-50/50">
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
          
          <div className="space-y-3 pt-2 pl-4 border-l border-border">
            <FormCheckbox label="Authorised" checked={authorised} onChange={(e) => setAuthorised(e.target.checked)} />
            <FormCheckbox label="Cancelled" checked={cancelled} onChange={(e) => setCancelled(e.target.checked)} />
            <FormCheckbox label="Duplicate Record" checked={duplicateRecord} onChange={(e) => setDuplicateRecord(e.target.checked)} />
            <FormCheckbox label="Revoked" checked={revoked} onChange={(e) => setRevoked(e.target.checked)} />
          </div>
          
          <div className="flex flex-col gap-3 justify-center items-end pr-4">
            <Button className="w-32 bg-blue-600" onClick={handleSearch}><Search className="w-4 h-4" /> Search</Button>
            <Button variant="outline" className="w-32"><Building className="w-4 h-4" /> Club</Button>
          </div>
        </div>
      </Fieldset>

      <div className="flex-1 bg-white border border-border rounded-md shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-100 border-b border-border px-4 py-2 font-semibold text-xs text-slate-600 uppercase tracking-wider flex justify-between">
          <span>Search Results ({brokers.length})</span>
          <span className="text-[10px] text-slate-400">Click a row to view details</span>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 sticky top-0 shadow-sm">
              <tr>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700">IFA_REF</th>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700">BROKER_NO</th>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700">FIMBRA_NO</th>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700">BROKER_NAME</th>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700">POSTCODE</th>
                <th className="px-4 py-2 border-b border-border font-medium text-slate-700 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">Loading...</td></tr>
              ) : brokers.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No records found.</td></tr>
              ) : (
                brokers.map((broker) => (
                  <tr 
                    key={broker.id} 
                    onClick={() => setActiveBrokerId(broker.id!)}
                    className="border-b border-border hover:bg-blue-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-2 font-medium text-primary group-hover:underline">{broker.ifaRef}</td>
                    <td className="px-4 py-2 text-slate-600">{broker.brokerNo}</td>
                    <td className="px-4 py-2 text-slate-600">{broker.fimbraNo}</td>
                    <td className="px-4 py-2 font-medium">{broker.brokerName}</td>
                    <td className="px-4 py-2 text-slate-600">{broker.postcode}</td>
                    <td className="px-4 py-2 text-center">
                      {broker.status === 'Authorised' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" /> Authorised
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-800">
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
