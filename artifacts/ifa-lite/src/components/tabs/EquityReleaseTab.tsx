import React from 'react';
import { useGetEquityRelease } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, FormRadioGroup, FormCheckbox, Button } from '@/components/shared/FormElements';

const AGE_BANDS = ['60-65', '66-70', '71-75', '76-80', '81-85', '86-90', '91 +'];

function AgeBandTable() {
  return (
    <Fieldset title="Age Band Details">
      <table className="w-full text-[11px] text-center border-collapse font-[Mulish]">
        <thead>
          <tr>
            <th className="p-1.5 text-left text-[#3d3d3d] font-sans font-semibold">Age Band</th>
            <th className="p-1.5 text-[#3d3d3d] font-sans font-semibold">
              <div className="flex items-center justify-center gap-1">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#178830]" />
                <span>Exclusive %</span>
              </div>
            </th>
            <th className="p-1.5 text-[#3d3d3d] font-sans font-semibold">(+ / -)</th>
            <th className="p-1.5 text-[#3d3d3d] font-sans font-semibold">
              <div className="flex items-center justify-center gap-1">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#178830]" />
                <span>Discounted %</span>
              </div>
            </th>
            <th className="p-1.5 text-[#3d3d3d] font-sans font-semibold">Cash Back</th>
          </tr>
        </thead>
        <tbody>
          {AGE_BANDS.map((band) => (
            <tr key={band}>
              <td className="p-1.5 text-left font-medium text-[#3d3d3d]">{band}</td>
              <td className="p-1.5">
                <input className="w-14 border border-[#BBBBBB] rounded px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" />
              </td>
              <td className="p-1.5">
                <input className="w-14 border border-[#BBBBBB] rounded px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" />
              </td>
              <td className="p-1.5">
                <input className="w-14 border border-[#BBBBBB] rounded px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" />
              </td>
              <td className="p-1.5">
                <input className="w-14 border border-[#BBBBBB] rounded px-1 text-center text-sm focus:border-[#178830] focus:border-2 focus:outline-none" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fieldset>
  );
}

function ValuationSection() {
  return (
    <Fieldset title="Valuation">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <FormCheckbox label="Free Up to:" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[#3d3d3d] font-sans">Amount</span>
            <input className="w-20 border border-[#BBBBBB] rounded px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" />
          </div>
          <span className="text-xs text-[#3d3d3d] font-sans">or</span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[#3d3d3d] font-sans">Max property Value</span>
            <input className="w-20 border border-[#BBBBBB] rounded px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FormCheckbox label="Fee discount:" />
          <input className="w-20 border border-[#BBBBBB] rounded px-2 py-1 text-sm font-[Mulish] focus:border-[#178830] focus:border-2 focus:outline-none" />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <FormCheckbox label="Refund discount/fee amount on completion" />
          <FormCheckbox label="Reduce fees upfront" />
        </div>
      </div>
    </Fieldset>
  );
}

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
    <div className="flex flex-col min-h-full pb-8 pt-[12px]">
      {/* Row 1: Mortgage Permissions + ERLM TOBA + Club Membership */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 mb-0">
        <Fieldset title="Mortgage Permissions?">
          <div className="flex gap-6">
            <label className="flex items-center gap-1.5 text-sm font-[Mulish] text-[#3d3d3d] cursor-pointer">
              <input type="radio" name="mortgage" value="true" defaultChecked={eq.mortgagePermissions === true} className="w-4 h-4 accent-[#006cf4]" />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm font-[Mulish] text-[#3d3d3d] cursor-pointer">
              <input type="radio" name="mortgage" value="false" defaultChecked={eq.mortgagePermissions === false} className="w-4 h-4 accent-[#006cf4]" />
              No
            </label>
          </div>
        </Fieldset>

        <Fieldset title="ERLM TOBA?">
          <div className="flex gap-6">
            <label className="flex items-center gap-1.5 text-sm font-[Mulish] text-[#3d3d3d] cursor-pointer">
              <input type="radio" name="erlm" value="true" defaultChecked={eq.erlmToba === true} className="w-4 h-4 accent-[#006cf4]" />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm font-[Mulish] text-[#3d3d3d] cursor-pointer">
              <input type="radio" name="erlm" value="false" defaultChecked={eq.erlmToba === false} className="w-4 h-4 accent-[#006cf4]" />
              No
            </label>
          </div>
        </Fieldset>

        <Fieldset title="Club Membership">
          <div className="border border-[#BBBBBB] rounded overflow-hidden h-16 mb-2">
            <table className="w-full text-xs font-[Mulish]">
              <thead className="bg-[#002f5c]">
                <tr>
                  <th className="px-2 py-1.5 text-left text-white font-sans font-semibold">Name</th>
                  <th className="px-2 py-1.5 text-left text-white font-sans font-semibold">Ref</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-2 py-1 text-[#979797] italic" colSpan={2}>No memberships</td></tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="text-xs py-1 h-auto px-3 rounded-md">Add</Button>
            <Button variant="secondary" className="text-xs py-1 h-auto px-3 rounded-md">Edit</Button>
            <Button variant="secondary" className="text-xs py-1 h-auto px-3 rounded-md">View</Button>
            <Button variant="outline" className="text-xs py-1 h-auto px-3 rounded-md">Remove</Button>
          </div>
        </Fieldset>
      </div>

      {/* Row 2: Flexible Commission + Lump Sum Commission */}
      <div className="grid grid-cols-2 gap-4 mb-0">
        <Fieldset title="Flexible Commission">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <FormInput label="Broker Rate" labelWidth="w-auto" value={eq.flexibleBrokerRate || ''} />
            <FormInput label="Minimum Amount" labelWidth="w-auto" value={eq.flexibleMinimumAmount || ''} />
            <FormInput label="Network Rate" labelWidth="w-auto" value={eq.flexibleNetworkRate || ''} />
            <div className="flex items-center">
              <FormCheckbox label="Trail Commission" checked={eq.flexibleTrailCommission} />
            </div>
          </div>
        </Fieldset>

        <Fieldset title="Lump Sum Commission">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <FormInput label="Broker Rate" labelWidth="w-auto" value={eq.lumpSumBrokerRate || ''} />
            <FormInput label="Minimum Amount" labelWidth="w-auto" value={eq.lumpSumMinimumAmount || ''} />
            <FormInput label="Network Rate" labelWidth="w-auto" value={eq.lumpSumNetworkRate || ''} />
          </div>
        </Fieldset>
      </div>

      {/* Row 3: Special Deals - parent fieldset */}
      <Fieldset title="Special Deals">
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Flexible */}
          <Fieldset title="Flexible" className="mb-0">
            <AgeBandTable />
            <ValuationSection />
          </Fieldset>

          {/* Right: Lump Sum */}
          <Fieldset title="Lump Sum" className="mb-0">
            <AgeBandTable />
            <ValuationSection />
          </Fieldset>
        </div>
      </Fieldset>

      {/* Row 4: Packaging Fee / Application Fee / LTV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <FormInput label="Packaging Fee" labelWidth="w-auto" value={eq.packagingFee || ''} />
          <FormInput label="Application Fee" labelWidth="w-auto" value={eq.applicationFee || ''} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FormInput label="Packaging Fee" labelWidth="w-auto" value={eq.lumpSumPackagingFee || ''} />
          </div>
          <div className="flex items-center gap-2">
            <FormInput label="Application Fee" labelWidth="w-auto" value={eq.lumpSumApplicationFee || ''} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-1">
        <FormInput label="LTV % (+ or -)" labelWidth="w-auto" value={eq.ltvPercent || ''} />
        <FormInput label="LTV % (+ or -)" labelWidth="w-auto" value={eq.lumpSumLtvPercent || ''} />
      </div>
    </div>
  );
}
