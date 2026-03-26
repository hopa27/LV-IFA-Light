import React, { useState, useEffect } from 'react';
import { useGetBroker, useUpdateBroker, useListContacts } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormSelect, FormRadioGroup, Button } from '@/components/shared/FormElements';
import { Save, AlertCircle, RefreshCw } from 'lucide-react';

export default function IfaDetailTab() {
  const { activeBrokerId } = useApp();
  
  const { data: broker, isLoading } = useGetBroker(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const { data: contacts = [] } = useListContacts(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const { mutate: updateBroker, isPending: isUpdating } = useUpdateBroker();

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (broker) setFormData(broker);
  }, [broker]);

  if (!activeBrokerId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-lg border-2 border-dashed border-border">
        <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-600">No Broker Selected</h3>
        <p className="text-sm">Please select a broker from the Lookups tab first.</p>
      </div>
    );
  }

  if (isLoading && !broker) return <div className="p-8 text-center text-slate-500">Loading details...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateBroker({ id: activeBrokerId, data: formData });
  };

  return (
    <div className="flex gap-6 h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex-1 flex flex-col min-w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-sm"></span>
            Broker Details: <span className="text-primary">{formData.ifaRef}</span>
          </h2>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>

        <div className="flex-1 overflow-auto pr-2 pb-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <div className="col-span-2 text-xs font-bold text-primary border-b border-border pb-1 mb-3">General Information</div>
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

          <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 flex justify-between bg-slate-50 p-2 rounded">
            <span>Created By: {formData.createdBy} on {formData.createdDate}</span>
            <span>Amended By: {formData.amendedBy || '—'} on {formData.amendedDate || '—'}</span>
          </div>
        </div>
      </div>

      <div className="w-[350px] flex flex-col bg-white border border-border shadow-sm rounded-md overflow-hidden">
        <div className="bg-slate-100 border-b border-border px-3 py-2 font-bold text-xs text-slate-700 uppercase">
          Associated Contacts
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="px-2 py-1.5 border-b border-border text-slate-600">Ref</th>
                <th className="px-2 py-1.5 border-b border-border text-slate-600">Name</th>
                <th className="px-2 py-1.5 border-b border-border text-slate-600">Position</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-4 text-slate-400">No contacts found</td></tr>
              ) : (
                contacts.map(c => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-2 py-2 text-primary font-medium">{c.reference}</td>
                    <td className="px-2 py-2">{c.title} {c.initials} {c.surname}</td>
                    <td className="px-2 py-2 truncate max-w-[100px]" title={c.position || ''}>{c.position}</td>
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
