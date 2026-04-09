import React, { useState } from 'react';
import { useGetRetirementIncome } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, Button } from '@/components/shared/FormElements';
import { PlusCircle, X } from 'lucide-react';

const ADVICE_TYPES = ['Restricted', 'Simplified', 'Non advised', 'Independent'] as const;
const DISTRIBUTION_CHANNELS = ['Whole of Market', 'Tied', 'Multi-tied'] as const;
const COLUMNS = ['Expense Discount', 'Marketing Allowance', 'Adviser Charge Amount', 'Adviser Charge %', 'Commission %'] as const;

function AdviceTypePricingModal({ productTitle, onClose }: { productTitle: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose} role="dialog" aria-label="Advice Type/Distribution Channel Pricing">
      <div className="bg-[#f0f0f0] border border-[#BBBBBB] rounded-lg shadow-2xl w-[780px] max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-[#002f5c] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between sticky top-0 z-10 shrink-0">
          <span className="text-sm font-semibold font-sans">Advice Type/Distribution Channel Pricing</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-auto flex-1">
          <div className="sticky top-0 z-10 bg-[#f0f0f0] pb-2">
            <p className="text-sm font-semibold text-[#00263e] font-sans mb-2">Product: {productTitle}</p>
          </div>

          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-[32px] z-10">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b] bg-[#eaf5f8] sticky left-0 z-20" colSpan={2}></th>
                {COLUMNS.map(col => (
                  <th key={col} className="px-2 py-2 text-center font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b] bg-[#eaf5f8] whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADVICE_TYPES.map((adviceType, atIdx) => (
                <React.Fragment key={adviceType}>
                  <tr className={atIdx > 0 ? 'border-t-2 border-[#BBBBBB]' : ''}>
                    <td className="px-2 py-2 font-bold text-[#00263e] font-sans whitespace-nowrap align-top sticky left-0 bg-[#f0f0f0] z-[5]">Advice Type</td>
                    <td className="px-2 py-2 font-semibold text-[#3d3d3d] font-sans whitespace-nowrap sticky left-[100px] bg-[#f0f0f0] z-[5]">{adviceType}</td>
                    {COLUMNS.map(col => (
                      <td key={col} className="px-1 py-1">
                        <input className="w-full border border-[#BBBBBB] rounded px-2 py-1 text-sm font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none bg-white" />
                      </td>
                    ))}
                  </tr>
                  {DISTRIBUTION_CHANNELS.map((channel, chIdx) => (
                    <tr key={`${adviceType}-${channel}`}>
                      {chIdx === 0 ? (
                        <td className="px-2 py-2 font-bold text-[#00263e] font-sans whitespace-nowrap align-top sticky left-0 bg-[#f0f0f0] z-[5]" rowSpan={3}>Distribution<br />Channel</td>
                      ) : null}
                      <td className="px-2 py-2 font-semibold text-[#3d3d3d] font-sans whitespace-nowrap sticky left-[100px] bg-[#f0f0f0] z-[5]">{channel}</td>
                      {COLUMNS.map(col => (
                        <td key={col} className="px-1 py-1">
                          <input className="w-full border border-[#BBBBBB] rounded px-2 py-1 text-sm font-[Mulish] text-[#3d3d3d] focus:border-[#178830] focus:border-2 focus:outline-none bg-white" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="sticky bottom-0 left-0 right-0 z-10 bg-[#f0f0f0] pt-4 mt-4 border-t border-[#BBBBBB]">
            <div className="flex justify-center gap-3 pb-1">
              <Button>Save</Button>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecialDealsModal({ productTitle, onClose }: { productTitle: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose} role="dialog" aria-label="Special Deals">
      <div className="bg-[#f0f0f0] border border-[#BBBBBB] rounded-lg shadow-2xl w-[780px] max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-[#002f5c] text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold font-sans">Special Deals</span>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col flex-1 min-h-0">
          <p className="text-sm font-semibold text-[#00263e] font-sans mb-2">Product: {productTitle}</p>
          <p className="text-sm font-bold text-[#00263e] font-sans text-center mb-3">Adjustments</p>

          <div className="border border-[#BBBBBB] rounded-lg overflow-hidden flex-1 min-h-[250px]">
            <table className="w-full text-xs">
              <thead className="bg-[#eaf5f8] sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">Deal Name</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">Expense Discount</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">Marketing Allowance</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">Start Date (DD/MM/YYYY)</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">End Date (DD/MM/YYYY)</th>
                  <th className="px-3 py-2 text-left font-semibold text-[#002f5c] font-sans border-b-2 border-[#04589b]">Active</th>
                </tr>
              </thead>
              <tbody className="font-[Mulish]">
                <tr><td colSpan={6} className="text-center py-8 text-[#979797] italic">No special deals</td></tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-3 pt-4 mt-4 border-t border-[#BBBBBB]">
            <Button>Add</Button>
            <Button>Save</Button>
            <Button>Edit</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSection({ title, prefix, data }: { title: string, prefix: string, data: any }) {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showSpecialDealsModal, setShowSpecialDealsModal] = useState(false);

  return (
    <>
      <Fieldset title={title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            <FormInput label="Default Adviser Charges %" value="" disabled />
            <FormInput label="Amount" value={data[`${prefix}Amount`] || ''} />
            <FormInput label="Default Commission %" value={data[`${prefix}Commission`] || ''} />
          </div>
          
          <div className="space-y-1">
            <FormInput label="Expense Discount" value={data[`${prefix}ExpenseDiscount`] || ''} />
            <FormInput label="Marketing Allowance" value={data[`${prefix}MarketingAllowance`] || ''} />
          </div>
          
          <div className="flex flex-col gap-2 justify-center border-l border-[#BBBBBB] pl-6">
            <Button variant="secondary" className="justify-start text-xs" onClick={() => setShowPricingModal(true)}><PlusCircle className="w-4 h-4 text-[#178830]" /> Advice Type/Distribution Channel Pricing</Button>
            <Button variant="secondary" className="justify-start text-xs" onClick={() => setShowSpecialDealsModal(true)}><PlusCircle className="w-4 h-4 text-[#006cf4]" /> Special Deals</Button>
          </div>
        </div>
      </Fieldset>

      {showPricingModal && (
        <AdviceTypePricingModal productTitle={title} onClose={() => setShowPricingModal(false)} />
      )}
      {showSpecialDealsModal && (
        <SpecialDealsModal productTitle={title} onClose={() => setShowSpecialDealsModal(false)} />
      )}
    </>
  );
}

export default function RetirementTab() {
  const { activeBrokerId } = useApp();

  const { data } = useGetRetirementIncome(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const ri: any = data || {};

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-[#979797] font-[Mulish]">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col gap-4 min-h-full pb-8 pt-[12px]">
      <ProductSection title="Non Profit Annuity" prefix="npa" data={ri} />
      <ProductSection title="PIPA" prefix="pipa" data={ri} />
      <ProductSection title="PRP" prefix="prp" data={ri} />
    </div>
  );
}
