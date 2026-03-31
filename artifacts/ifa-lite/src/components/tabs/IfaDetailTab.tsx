import React, { useState, useEffect, useCallback } from 'react';
import { useGetBroker, useUpdateBroker, useListContacts } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormSelect, FormRadioGroup } from '@/components/shared/FormElements';
import { AlertCircle } from 'lucide-react';

export default function IfaDetailTab() {
  const { activeBrokerId, setIsDirty, setIsSaving, registerSaveHandler } = useApp();
  
  const { data: broker, isLoading } = useGetBroker(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const { data: contacts = [] } = useListContacts(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const { mutate: updateBroker, isPending: isUpdating } = useUpdateBroker();

  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});

  useEffect(() => {
    if (broker) {
      setFormData(broker);
      setOriginalData(broker);
      setIsDirty(false);
    }
  }, [broker, setIsDirty]);

  useEffect(() => {
    setIsSaving(isUpdating);
  }, [isUpdating, setIsSaving]);

  const handleSave = useCallback(() => {
    if (activeBrokerId) {
      updateBroker({ id: activeBrokerId, data: formData }, {
        onSuccess: () => {
          setOriginalData(formData);
          setIsDirty(false);
        }
      });
    }
  }, [activeBrokerId, formData, updateBroker, setIsDirty]);

  useEffect(() => {
    registerSaveHandler(handleSave);
    return () => registerSaveHandler(null);
  }, [handleSave, registerSaveHandler]);

  if (!activeBrokerId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#979797] bg-white rounded-lg border-2 border-dashed border-[#BBBBBB]">
        <AlertCircle className="w-12 h-12 mb-4 text-[#BBBBBB]" />
        <h3 className="text-lg font-semibold text-[#3d3d3d] font-sans">No Broker Selected</h3>
        <p className="text-sm font-[Mulish]">Please select a broker from the Lookups tab first.</p>
      </div>
    );
  }

  if (isLoading && !broker) return <div className="p-8 text-center text-[#979797] font-[Mulish]">Loading details...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    const hasChanges = JSON.stringify(newData) !== JSON.stringify(originalData);
    setIsDirty(hasChanges);
  };

  return (
    <div className="flex gap-6 h-full overflow-y-auto">
      <div className="flex-1 flex flex-col min-w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#00263e] flex items-center gap-2 font-sans">
            <span className="w-1 h-6 bg-[#006cf4] rounded-sm"></span>
            Broker Details: <span className="text-[#006cf4]">{formData.ifaRef}</span>
          </h2>
        </div>

        <div className="flex-1 overflow-auto pr-2 pb-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <div className="col-span-2 text-xs font-bold text-[#006cf4] border-b-2 border-[#006cf4]/20 pb-1 mb-3 font-sans uppercase tracking-wider">General Information</div>
            <FormInput label="Broker Name" name="brokerName" value={formData.brokerName || ''} onChange={handleChange} />
            <FormInput label="Trading Name" name="tradingName" value={formData.tradingName || ''} onChange={handleChange} />
            
            <FormInput label="Address Line 1" name="addressLine1" value={formData.addressLine1 || ''} onChange={handleChange} />
            <FormInput label="FCA Reference" name="fcaReference" value={formData.fcaReference || ''} onChange={handleChange} />
            
            <FormInput label="Address Line 2" name="addressLine2" value={formData.addressLine2 || ''} onChange={handleChange} />
            <FormRadioGroup 
              label="Annuity TOBA" 
              name="annuityToba" 
              options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} 
              value={String(formData.annuityToba)}
            />
            
            <FormInput label="Town" name="town" value={formData.town || ''} onChange={handleChange} />
            <FormSelect 
              label="Status" 
              name="status"
              value={formData.status || ''} 
              onChange={handleChange}
              options={[
                {label: 'Active', value: 'Active'},
                {label: 'Cancelled', value: 'Cancelled'},
                {label: 'Authorised', value: 'Authorised'},
                {label: 'Revoked', value: 'Revoked'},
                {label: 'Duplicate Record', value: 'Duplicate Record'}
              ]}
            />
            
            <FormInput label="County" name="county" value={formData.county || ''} onChange={handleChange} />
            <FormInput label="Sent Date" name="sentDate" value={formData.sentDate || ''} onChange={handleChange} />
            
            <FormInput label="Postcode" name="postcode" value={formData.postcode || ''} onChange={handleChange} />
            <FormSelect 
              label="Grade" 
              name="grade"
              value={formData.grade || ''} 
              onChange={handleChange}
              options={[
                {label: 'National Accounts', value: 'National Accounts'},
                {label: 'Regional', value: 'Regional'},
                {label: 'Standard', value: 'Standard'}
              ]}
            />
            
            <FormInput label="Telephone" name="telephone" value={formData.telephone || ''} onChange={handleChange} />
            <FormInput label="Next Diary Date" name="nextDiaryDate" value={formData.nextDiaryDate || ''} onChange={handleChange} />
            
            <FormInput label="Fax" name="fax" value={formData.fax || ''} onChange={handleChange} />
            <FormInput label="IFA Member No" name="ifaMemberNo" value={formData.ifaMemberNo || ''} onChange={handleChange} />
            
            <FormInput label="Email" name="email" value={formData.email || ''} onChange={handleChange} />
            <FormSelect 
              label="Broker Manager" 
              name="brokerManager"
              value={formData.brokerManager || ''} 
              onChange={handleChange}
              options={[
                {label: 'Keith Harvey', value: 'Keith Harvey'},
                {label: 'Sarah Collins', value: 'Sarah Collins'},
                {label: 'David Thompson', value: 'David Thompson'}
              ]}
            />
            
            <FormInput label="Initials" name="initials" value={formData.initials || ''} onChange={handleChange} />
            <FormSelect 
              label="Key Account" 
              name="keyAccount"
              value={formData.keyAccount || ''} 
              onChange={handleChange}
              options={[
                {label: '', value: ''},
                {label: 'Gold', value: 'Gold'},
                {label: 'Silver', value: 'Silver'},
                {label: 'Bronze', value: 'Bronze'}
              ]}
            />
            
            <FormInput label="Date Checked" name="dateChecked" value={formData.dateChecked || ''} onChange={handleChange} />
            <FormInput label="Partner Code" name="partnerCode" value={formData.partnerCode || ''} onChange={handleChange} />
            
            <div className="col-start-2">
              <FormSelect 
                label="Region" 
                name="region"
                value={formData.region || ''} 
                onChange={handleChange}
                options={[
                  {label: '', value: ''},
                  {label: 'London', value: 'London'},
                  {label: 'South', value: 'South'},
                  {label: 'South East', value: 'South East'},
                  {label: 'South West', value: 'South West'},
                  {label: 'East', value: 'East'},
                  {label: 'North', value: 'North'},
                  {label: 'North West', value: 'North West'},
                  {label: 'Scotland', value: 'Scotland'}
                ]}
              />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#BBBBBB] text-xs text-[#979797] flex justify-between bg-[#eaf5f8] p-3 rounded-lg font-[Mulish]">
            <span>Created By: {formData.createdBy} on {formData.createdDate}</span>
            <span>Amended By: {formData.amendedBy || '\u2014'} on {formData.amendedDate || '\u2014'}</span>
          </div>
        </div>
      </div>

      <div className="w-[350px] flex flex-col bg-white border border-[#BBBBBB] shadow-sm rounded-lg overflow-hidden">
        <div className="bg-[#002f5c] border-b border-[#04589b] px-3 py-2.5 font-bold text-xs text-white uppercase tracking-wider font-sans">
          Associated Contacts
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs text-left font-[Mulish]">
            <thead className="bg-[#eaf5f8] sticky top-0">
              <tr>
                <th className="px-2 py-2 border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Ref</th>
                <th className="px-2 py-2 border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Name</th>
                <th className="px-2 py-2 border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Position</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-4 text-[#979797]">No contacts found</td></tr>
              ) : (
                contacts.map((c, i) => (
                  <tr key={c.id} className={`border-b border-[#BBBBBB]/30 hover:bg-[#05579B] hover:text-white group cursor-pointer ${i % 2 === 1 ? 'bg-[#e7ebec]/20' : ''}`}>
                    <td className="px-2 py-2 text-[#005a9c] font-semibold group-hover:text-white">{c.reference}</td>
                    <td className="px-2 py-2 group-hover:text-white">{c.title} {c.initials} {c.surname}</td>
                    <td className="px-2 py-2 truncate max-w-[100px] group-hover:text-white" title={c.position || ''}>{c.position}</td>
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
