import React from 'react';
import { useGetEquityRelease } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormRadioGroup, FormCheckbox, Button } from '@/components/shared/FormElements';

export default function EquityReleaseTab() {
  const { activeBrokerId } = useApp();

  const { data } = useGetEquityRelease(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const eq: any = data || {};

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-slate-400">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300 overflow-y-auto pr-2 pb-8">
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="space-y-4">
          <Fieldset title="Permissions" className="h-full">
            <FormRadioGroup 
              label="Mortgage Permissions" 
              name="mortgage" 
              options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} 
              value={String(eq.mortgagePermissions)} 
            />
            <FormRadioGroup 
              label="ERLM TOBA" 
              name="erlm" 
              options={[{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]} 
              value={String(eq.erlmToba)} 
            />
          </Fieldset>
        </div>
        
        <Fieldset title="Club Membership" className="h-full">
          <div className="border border-slate-200 rounded overflow-hidden h-24 mb-2">
            <table className="w-full text-xs">
              <thead className="bg-slate-100">
                <tr><th className="px-2 py-1 text-left">Name</th><th className="px-2 py-1 text-left">Ref</th></tr>
              </thead>
              <tbody>
                <tr><td className="px-2 py-1 text-slate-500 italic" colSpan={2}>No memberships</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-xs py-1 h-auto">Add</Button>
            <Button variant="outline" className="text-xs py-1 h-auto">Edit</Button>
            <Button variant="outline" className="text-xs py-1 h-auto">View</Button>
            <Button variant="outline" className="text-xs py-1 h-auto">Remove</Button>
          </div>
        </Fieldset>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Fieldset title="Flexible Commission">
            <FormInput label="Broker Rate" value={eq.flexibleBrokerRate || ''} />
            <FormInput label="Minimum Amount" value={eq.flexibleMinimumAmount || ''} />
            <FormInput label="Network Rate" value={eq.flexibleNetworkRate || ''} />
            <div className="pl-[33%] mt-3">
              <FormCheckbox label="Trail Commission" checked={eq.flexibleTrailCommission} />
            </div>
          </Fieldset>

          <Fieldset title="Flexible Special Deals (Age Bands)">
            <table className="w-full text-[11px] text-center border-collapse">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-1 border-r border-slate-200">Age Band</th>
                  <th className="p-1 border-r border-slate-200">Exclusive %</th>
                  <th className="p-1 border-r border-slate-200">(+/-)</th>
                  <th className="p-1 border-r border-slate-200">Discounted %</th>
                  <th className="p-1">Cash Back</th>
                </tr>
              </thead>
              <tbody>
                {['60-65','66-70','71-75','76-80','81-85','86-90','91+'].map((band, i) => (
                  <tr key={band} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-1 font-medium border-r border-slate-200">{band}</td>
                    <td className="p-1 border-r border-slate-200"><input className="w-12 border rounded px-1 text-center" /></td>
                    <td className="p-1 border-r border-slate-200"><input type="checkbox" /></td>
                    <td className="p-1 border-r border-slate-200"><input className="w-12 border rounded px-1 text-center" /></td>
                    <td className="p-1"><input className="w-12 border rounded px-1 text-center" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fieldset>

          <Fieldset title="Flexible Valuation">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FormCheckbox label="Free Up to:" />
                <input className="w-20 border rounded px-2 py-1 text-sm" placeholder="Amount" />
                <span className="text-xs text-slate-500">or</span>
                <input className="w-24 border rounded px-2 py-1 text-sm" placeholder="Max property" />
              </div>
              <div className="flex items-center gap-2">
                <FormCheckbox label="Fee discount:" />
                <input className="w-20 border rounded px-2 py-1 text-sm" />
              </div>
              <FormCheckbox label="Refund discount/fee amount on completion" />
              <FormCheckbox label="Reduce fees upfront" />
            </div>
          </Fieldset>

          <Fieldset title="Flexible Fees">
            <FormInput label="Packaging Fee" value={eq.packagingFee || ''} />
            <FormInput label="Application Fee" value={eq.applicationFee || ''} />
            <FormInput label="LTV % (+ or -)" value={eq.ltvPercent || ''} />
          </Fieldset>
        </div>

        <div className="space-y-4">
          <Fieldset title="Lump Sum Commission">
            <FormInput label="Broker Rate" value={eq.lumpSumBrokerRate || ''} />
            <FormInput label="Minimum Amount" value={eq.lumpSumMinimumAmount || ''} />
            <FormInput label="Network Rate" value={eq.lumpSumNetworkRate || ''} />
          </Fieldset>

          <Fieldset title="Lump Sum Special Deals (Age Bands)">
            <table className="w-full text-[11px] text-center border-collapse">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-1 border-r border-slate-200">Age Band</th>
                  <th className="p-1 border-r border-slate-200">Exclusive %</th>
                  <th className="p-1 border-r border-slate-200">(+/-)</th>
                  <th className="p-1 border-r border-slate-200">Discounted %</th>
                  <th className="p-1">Cash Back</th>
                </tr>
              </thead>
              <tbody>
                {['60-65','66-70','71-75','76-80','81-85','86-90','91+'].map((band, i) => (
                  <tr key={band} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-1 font-medium border-r border-slate-200">{band}</td>
                    <td className="p-1 border-r border-slate-200"><input className="w-12 border rounded px-1 text-center" /></td>
                    <td className="p-1 border-r border-slate-200"><input type="checkbox" /></td>
                    <td className="p-1 border-r border-slate-200"><input className="w-12 border rounded px-1 text-center" /></td>
                    <td className="p-1"><input className="w-12 border rounded px-1 text-center" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fieldset>

          <Fieldset title="Lump Sum Valuation">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FormCheckbox label="Free Up to:" />
                <input className="w-20 border rounded px-2 py-1 text-sm" placeholder="Amount" />
                <span className="text-xs text-slate-500">or</span>
                <input className="w-24 border rounded px-2 py-1 text-sm" placeholder="Max property" />
              </div>
              <div className="flex items-center gap-2">
                <FormCheckbox label="Fee discount:" />
                <input className="w-20 border rounded px-2 py-1 text-sm" />
              </div>
              <FormCheckbox label="Refund discount/fee amount on completion" />
              <FormCheckbox label="Reduce fees upfront" />
            </div>
          </Fieldset>

          <Fieldset title="Lump Sum Fees">
            <FormInput label="Packaging Fee" value={eq.lumpSumPackagingFee || ''} />
            <FormInput label="Application Fee" value={eq.lumpSumApplicationFee || ''} />
            <FormInput label="LTV % (+ or -)" value={eq.lumpSumLtvPercent || ''} />
          </Fieldset>
        </div>
      </div>
    </div>
  );
}
