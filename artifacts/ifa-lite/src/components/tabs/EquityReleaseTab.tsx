import React from 'react';
import { useGetEquityRelease } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormRadioGroup, FormCheckbox, Button } from '@/components/shared/FormElements';

export default function EquityReleaseTab() {
  const { activeBrokerId } = useApp();

  const { data } = useGetEquityRelease(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const eq: any = data || {};

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-[#979797] font-[Mulish]">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col min-h-full pb-8">
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
          <div className="border border-[#BBBBBB] rounded-lg overflow-hidden h-24 mb-2">
            <table className="w-full text-xs font-[Mulish]">
              <thead className="bg-[#eaf5f8]">
                <tr>
                  <th className="px-2 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Name</th>
                  <th className="px-2 py-2 text-left border-b-2 border-[#04589b] text-[#002f5c] font-sans font-semibold">Ref</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-2 py-1 text-[#979797] italic" colSpan={2}>No memberships</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="text-xs py-1 h-auto px-4">Add</Button>
            <Button variant="secondary" className="text-xs py-1 h-auto px-4">Edit</Button>
            <Button variant="secondary" className="text-xs py-1 h-auto px-4">View</Button>
            <Button variant="outline" className="text-xs py-1 h-auto px-4">Remove</Button>
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
            <table className="w-full text-[11px] text-center border-collapse font-[Mulish]">
              <thead className="bg-[#eaf5f8] border-b-2 border-[#04589b]">
                <tr>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Age Band</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Exclusive %</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">(+/-)</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Discounted %</th>
                  <th className="p-1.5 text-[#002f5c] font-sans font-semibold">Cash Back</th>
                </tr>
              </thead>
              <tbody>
                {['60-65','66-70','71-75','76-80','81-85','86-90','91+'].map((band, i) => (
                  <tr key={band} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f7f8]'}>
                    <td className="p-1.5 font-medium border-r border-[#BBBBBB]/50 text-[#3d3d3d]">{band}</td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input type="checkbox" className="accent-[#178830]" /></td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                    <td className="p-1.5"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fieldset>

          <Fieldset title="Flexible Valuation">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FormCheckbox label="Free Up to:" />
                <input className="w-20 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" placeholder="Amount" />
                <span className="text-xs text-[#979797]">or</span>
                <input className="w-24 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" placeholder="Max property" />
              </div>
              <div className="flex items-center gap-2">
                <FormCheckbox label="Fee discount:" />
                <input className="w-20 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" />
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
            <table className="w-full text-[11px] text-center border-collapse font-[Mulish]">
              <thead className="bg-[#eaf5f8] border-b-2 border-[#04589b]">
                <tr>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Age Band</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Exclusive %</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">(+/-)</th>
                  <th className="p-1.5 border-r border-[#BBBBBB] text-[#002f5c] font-sans font-semibold">Discounted %</th>
                  <th className="p-1.5 text-[#002f5c] font-sans font-semibold">Cash Back</th>
                </tr>
              </thead>
              <tbody>
                {['60-65','66-70','71-75','76-80','81-85','86-90','91+'].map((band, i) => (
                  <tr key={band} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f7f8]'}>
                    <td className="p-1.5 font-medium border-r border-[#BBBBBB]/50 text-[#3d3d3d]">{band}</td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input type="checkbox" className="accent-[#178830]" /></td>
                    <td className="p-1.5 border-r border-[#BBBBBB]/50"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                    <td className="p-1.5"><input className="w-14 border border-[#BBBBBB] rounded-lg px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fieldset>

          <Fieldset title="Lump Sum Valuation">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FormCheckbox label="Free Up to:" />
                <input className="w-20 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" placeholder="Amount" />
                <span className="text-xs text-[#979797]">or</span>
                <input className="w-24 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" placeholder="Max property" />
              </div>
              <div className="flex items-center gap-2">
                <FormCheckbox label="Fee discount:" />
                <input className="w-20 border border-[#BBBBBB] rounded-lg px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" />
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
