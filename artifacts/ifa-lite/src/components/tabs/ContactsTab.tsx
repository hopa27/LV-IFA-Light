import React, { useState } from 'react';
import { useListContacts } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormSelect, FormRadioGroup, FormCheckbox, Button } from '@/components/shared/FormElements';
import { ChevronLeft, ChevronRight, Plus, Save, Search } from 'lucide-react';

export default function ContactsTab() {
  const { activeBrokerId } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: contacts = [] } = useListContacts(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-[#979797] font-[Mulish]">Please select a broker first.</div>;
  }

  const currentContact: any = contacts[currentIndex] || {};

  return (
    <div className="flex flex-col min-h-full pb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#BBBBBB]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#3d3d3d] mr-2 font-sans">Contact {contacts.length > 0 ? currentIndex + 1 : 0} of {contacts.length}</span>
          <Button variant="outline" className="px-2 rounded-lg" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="px-2 rounded-lg" onClick={() => setCurrentIndex(Math.min(contacts.length - 1, currentIndex + 1))} disabled={currentIndex >= contacts.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Plus className="w-4 h-4" /> Add New</Button>
          <Button><Save className="w-4 h-4" /> Save Contact</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <Fieldset title="Personal Details">
            <FormInput label="Reference" value={currentContact.reference || ''} readOnly className="bg-[#eaf5f8] font-bold text-[#006cf4]" />
            <div className="flex gap-2 mb-2">
               <FormSelect label="Title" options={[{label: '', value: ''}, {label: 'Mr', value: 'Mr'}, {label: 'Mrs', value: 'Mrs'}, {label: 'Ms', value: 'Ms'}, {label: 'Dr', value: 'Dr'}]} value={currentContact.title || ''} className="w-full" labelWidth="w-1/3" />
               <FormInput label="Initials" value={currentContact.initials || ''} labelWidth="w-16" />
            </div>
            <FormInput label="Forename" value={currentContact.forename || ''} />
            <FormInput label="Surname" value={currentContact.surname || ''} />
            <FormInput label="Salutation" value={currentContact.salutation || ''} />
            <FormInput label="Position" value={currentContact.position || ''} />
          </Fieldset>

          <Fieldset title="Contact Information">
            <FormInput label="Address Line 1" value={currentContact.addressLine1 || ''} />
            <FormInput label="Address Line 2" value={currentContact.addressLine2 || ''} />
            <FormInput label="Address Line 3" value={currentContact.addressLine3 || ''} />
            <FormInput label="Address Line 4" value={currentContact.addressLine4 || ''} />
            <div className="mt-4 border-t border-[#BBBBBB] pt-4">
              <FormInput label="Home Tel" value={currentContact.homeTelephone || ''} />
              <FormInput label="Mobile Tel" value={currentContact.mobileTelephone || ''} />
              <FormInput label="Email" type="email" value={currentContact.emailAddress || ''} />
            </div>
          </Fieldset>
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
            <FormInput label="Bank Account No." value={currentContact.bankAccountNo || ''} />
            <FormInput label="Bank Account Name" value={currentContact.bankAccountName || ''} />
            <FormInput label="Bank Reference" value={currentContact.bankReference || ''} />
          </Fieldset>

          <Fieldset title="Network Related Detail">
            <div className="pl-[33%] mb-3">
              <FormCheckbox label="Use terms from principal agent/network" checked={currentContact.useNetworkTerms} />
            </div>
            <FormSelect label="Default Advice Type" options={[{label: '', value: ''}, {label: 'Independent', value: 'Independent'}, {label: 'Restricted', value: 'Restricted'}]} value={currentContact.defaultAdviceType || ''} />
            <FormSelect label="Remuneration Basis" options={[{label: '', value: ''}, {label: 'Fee', value: 'Fee'}, {label: 'Commission', value: 'Commission'}]} value={currentContact.defaultRemunerationBasis || ''} />
            <FormInput label="Distribution Channel" value={currentContact.defaultDistributionChannel || ''} />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <FormRadioGroup label="Network" name="network" options={[{label: 'Y', value: 'true'}, {label: 'N', value: 'false'}]} value={String(currentContact.network)} />
                <FormRadioGroup label="Tied Agent" name="tiedAgent" options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} value={String(currentContact.tiedAgent)} />
                <FormRadioGroup label="Principal" name="principal" options={[{label: 'Y', value: 'true'}, {label: 'N', value: 'false'}]} value={String(currentContact.isPrincipal)} />
              </div>
              <div className="space-y-2">
                <FormSelect label="Restricted" options={[{label: '', value: ''}]} labelWidth="w-20" />
                <FormSelect label="Simplified" options={[{label: '', value: ''}]} labelWidth="w-20" />
                <FormSelect label="Non Advised" options={[{label: '', value: ''}]} labelWidth="w-20" />
              </div>
            </div>
          </Fieldset>
          
          <Fieldset title="IFA Member Detail">
            <div className="flex gap-2 items-center mb-2">
               <FormInput label="Network IFA" value={currentContact.networkIfa || ''} className="flex-1" />
               <Button variant="outline" className="px-2 py-1 rounded-lg"><Search className="w-3 h-3" /></Button>
            </div>
            <FormInput label="Network Name" value={currentContact.networkName || ''} readOnly className="bg-[#CCCCCC]" />
            <FormInput label="Postcode" value={currentContact.networkPostcode || ''} readOnly className="bg-[#CCCCCC]" />
          </Fieldset>

          <Fieldset title="Network Members">
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

          <Fieldset title="Principal Agent">
            <div className="flex gap-2 items-center">
              <FormInput label="Principal Agent Ref" value={currentContact.principalAgentRef || ''} className="flex-1" />
              <Button variant="outline" className="px-2 py-1 rounded-lg"><Search className="w-3 h-3" /></Button>
              <Button variant="outline" className="px-2 py-1 rounded-lg text-xs">Clr</Button>
            </div>
          </Fieldset>
        </div>
      </div>
    </div>
  );
}
