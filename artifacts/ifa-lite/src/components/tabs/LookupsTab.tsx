import React, { useState } from 'react';
import { useListBrokers } from '@workspace/api-client-react';
import type { Broker, ListBrokersParams } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormCheckbox, Button } from '@/components/shared/FormElements';
import { Search, Building } from 'lucide-react';

const COLUMNS: { key: keyof Broker; header: string }[] = [
  { key: 'ifaRef', header: 'IFA_REF' },
  { key: 'brokerNo', header: 'BROKER_NO' },
  { key: 'fimbraNo', header: 'FIMBRA_NO' },
  { key: 'brokerName', header: 'BROKER_NAME' },
  { key: 'building', header: 'BUILDING' },
  { key: 'noStreet', header: 'NO_STREET' },
  { key: 'district', header: 'DISTRICT' },
  { key: 'city', header: 'CITY' },
  { key: 'county', header: 'COUNTY' },
  { key: 'postcode', header: 'POST_CODE' },
  { key: 'telephone', header: 'TEL' },
  { key: 'fax', header: 'FAX' },
  { key: 'salutation', header: 'SALUTATION' },
  { key: 'classCode', header: 'CLASS_CODE' },
  { key: 'createdDate', header: 'CREATED' },
  { key: 'createdBy', header: 'CREATED_BY' },
  { key: 'amendedDate', header: 'AMENDED' },
  { key: 'amendedBy', header: 'AMENDED_BY' },
  { key: 'repkey', header: 'REPKEY' },
  { key: 'rsmNo', header: 'RSM_NO' },
  { key: 'nextIfaIllRef', header: 'NEXTIFAILLREF' },
  { key: 'sibReference', header: 'SIBREFERENCE' },
  { key: 'sibAuthorisationDate', header: 'SIBAUTHORISATIONDATE' },
  { key: 'sibInitials', header: 'SIBINITIALS' },
  { key: 'brokerPackSent', header: 'BROKERPACKSENT' },
  { key: 'brokerPackSentDate', header: 'BROKERPACKSENTDATE' },
  { key: 'nextDiaryDate', header: 'NEXTDIARYDATE' },
  { key: 'area', header: 'AREA' },
  { key: 'keyAccount', header: 'KEYACCOUNT' },
  { key: 'grade', header: 'GRADE' },
  { key: 'nextContactNo', header: 'NEXTCONTACTNO' },
  { key: 'status', header: 'STATUS' },
  { key: 'consultant', header: 'CONSULTANT' },
  { key: 'peverelBroker', header: 'PEVERELBROKER' },
  { key: 'paidByBacs', header: 'PAIDBYBACS' },
  { key: 'bankSortCode', header: 'BANKSORTCODE' },
  { key: 'bankAccountNo', header: 'BANKACCOUNTNO' },
  { key: 'bankAccountName', header: 'BANKACCOUNTNAME' },
  { key: 'bankRef', header: 'BANKREF' },
  { key: 'networkIfaReference', header: 'NETWORKIFAREFERENCE' },
  { key: 'ifaCommission', header: 'IFACOMMISSION' },
  { key: 'networkCommission', header: 'NETWORKCOMMISSION' },
  { key: 'network', header: 'NETWORK' },
  { key: 'memberNumber', header: 'MEMBERNUMBER' },
  { key: 'plaIfaCommission', header: 'PLAIFACOMMISSION' },
  { key: 'plaNetworkCommission', header: 'PLANETWORKCOMMISSION' },
  { key: 'ifaWhen', header: 'IFA_WHEN' },
  { key: 'ifaPortfolio', header: 'IFAPORTFOLIO' },
  { key: 'brokerNameUpper', header: 'BROKER_NAME_UPPER' },
  { key: 'expense', header: 'EXPENSE' },
  { key: 'coCode', header: 'COCODE' },
  { key: 'ltcCommission', header: 'LTC_COMMISSION' },
  { key: 'acareCommission', header: 'ACARECOMMISSION' },
  { key: 'email', header: 'EMAIL_ADDRESS' },
  { key: 'namId', header: 'NAM_ID' },
  { key: 'ilaCommission', header: 'ILA_COMMISSION' },
  { key: 'ilaExpense', header: 'ILA_EXPENSE' },
  { key: 'ifaIlaCommissionPct', header: 'IFA_ILA_COMMISSION_PCT' },
  { key: 'ifaIlaExpensePct', header: 'IFA_ILA_EXPENSE_PCT' },
  { key: 'networkIlaCommissionPct', header: 'NETWORK_ILA_COMMISSION_PCT' },
  { key: 'icfpCommission', header: 'ICFP_COMMISSION' },
  { key: 'icfpExpense', header: 'ICFP_EXPENSE' },
  { key: 'networkIcfpCommissionPct', header: 'NETWORK_ICFP_COMMISSION_PCT' },
  { key: 'partnerCode', header: 'PARTNER_CODE' },
];

export default function LookupsTab() {
  const { setActiveBrokerId } = useApp();
  const [postcode, setPostcode] = useState('');
  const [ifaReference, setIfaReference] = useState('');
  const [ifaName, setIfaName] = useState('');
  const [authorised, setAuthorised] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const [duplicateRecord, setDuplicateRecord] = useState(false);
  const [revoked, setRevoked] = useState(false);
  const [searchParams, setSearchParams] = useState<ListBrokersParams>({});

  const { data: brokers = [], isLoading } = useListBrokers(searchParams);

  const handleSearch = () => {
    const params: ListBrokersParams = {};
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
    <div className="flex flex-col min-h-full">
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
        <div className="bg-[#002f5c] border-b-[3px] border-[#04589b] px-4 py-3 font-semibold text-sm text-white uppercase tracking-wider flex justify-between font-sans shrink-0">
          <span>Search Results ({brokers.length})</span>
          <span className="text-[10px] text-white/60 font-[Mulish] normal-case">Click a row to view details</span>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="text-xs text-left border-collapse" style={{ minWidth: `${COLUMNS.length * 140}px` }}>
            <thead className="bg-[#eaf5f8] sticky top-0 z-10">
              <tr>
                {COLUMNS.map(col => (
                  <th key={col.key} className="px-3 py-2 border-b-[3px] border-[#04589b] font-semibold text-[#002f5c] font-sans whitespace-nowrap">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-[Mulish]">
              {isLoading ? (
                <tr><td colSpan={COLUMNS.length} className="text-center py-8 text-[#979797]">Loading...</td></tr>
              ) : brokers.length === 0 ? (
                <tr><td colSpan={COLUMNS.length} className="text-center py-8 text-[#979797]">No records found.</td></tr>
              ) : (
                brokers.map((broker, i) => (
                  <tr 
                    key={broker.id} 
                    onClick={() => setActiveBrokerId(broker.id!)}
                    className={`border-b border-[#BBBBBB]/20 hover:bg-[#05579B] hover:text-white cursor-pointer transition-colors group ${i % 2 === 1 ? 'bg-[#e7ebec]/20' : 'bg-white'}`}
                  >
                    {COLUMNS.map(col => (
                      <td 
                        key={col.key} 
                        className={`px-3 py-1.5 whitespace-nowrap group-hover:text-white ${
                          col.key === 'ifaRef' ? 'font-medium text-[#005a9c] underline' : 'text-[#3d3d3d]'
                        }`}
                      >
                        {broker[col.key] != null ? String(broker[col.key]) : ''}
                      </td>
                    ))}
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
