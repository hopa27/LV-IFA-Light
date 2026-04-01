import React, { useState } from 'react';
import { useListBrokers } from '@/hooks/use-static-data';
import type { Broker, ListBrokersParams } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, Button } from '@/components/shared/FormElements';
import { Combobox } from '@/components/shared/Combobox';
import ClubModal from '@/components/shared/ClubModal';
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
  const [status, setStatus] = useState('Authorised');
  const [searchParams, setSearchParams] = useState<ListBrokersParams>({});
  const [showClubModal, setShowClubModal] = useState(false);

  const { data: brokers = [], isLoading } = useListBrokers(searchParams);

  const handleSearch = () => {
    const params: ListBrokersParams = {};
    if (postcode) params.postcode = postcode;
    if (ifaReference) params.ifaReference = ifaReference;
    if (ifaName) params.ifaName = ifaName;
    if (status === 'Authorised') params.authorised = true;
    if (status === 'Cancelled') params.cancelled = true;
    if (status === 'Duplicate Record') params.duplicateRecord = true;
    if (status === 'Revoked') params.revoked = true;
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Fieldset title="Search Criteria">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans">Postcode</label>
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. EC1A"
              className="w-[140px] px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] placeholder:text-[#BBBBBB] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans">IFA Reference</label>
            <input
              value={ifaReference}
              onChange={(e) => setIfaReference(e.target.value)}
              className="w-[140px] px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans">IFA Name</label>
            <input
              value={ifaName}
              onChange={(e) => setIfaName(e.target.value)}
              className="w-[180px] px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none hover:border-[#178830] transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#3d3d3d] font-sans">Status</label>
            <div className="w-[170px]">
              <Combobox
                value={status}
                onChange={(val) => setStatus(val)}
                options={[
                  { label: 'Authorised', value: 'Authorised' },
                  { label: 'Cancelled', value: 'Cancelled' },
                  { label: 'Duplicate Record', value: 'Duplicate Record' },
                  { label: 'Revoked', value: 'Revoked' },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-28" onClick={handleSearch}><Search className="w-4 h-4" /> Search</Button>
            <Button variant="secondary" className="w-28" onClick={() => setShowClubModal(true)}><Building className="w-4 h-4" /> Club</Button>
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

      {showClubModal && <ClubModal onClose={() => setShowClubModal(false)} />}
    </div>
  );
}
