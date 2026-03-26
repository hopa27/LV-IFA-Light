import React from 'react';
import { useGetRetirementIncome } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Fieldset, FormInput, Button } from '@/components/shared/FormElements';
import { PlusCircle } from 'lucide-react';

function ProductSection({ title, prefix, data }: { title: string, prefix: string, data: any }) {
  return (
    <Fieldset title={title} className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <FormInput label="Default adviser charges %" value={data[`${prefix}AdviserCharges`] || ''} />
          <FormInput label="Amount" value={data[`${prefix}Amount`] || ''} />
          <FormInput label="Default Commission %" value={data[`${prefix}Commission`] || ''} />
        </div>
        
        <div className="space-y-1">
          <FormInput label="Expense Discount" value={data[`${prefix}ExpenseDiscount`] || ''} />
          <FormInput label="Marketing allowance" value={data[`${prefix}MarketingAllowance`] || ''} />
        </div>
        
        <div className="flex flex-col gap-2 justify-center border-l border-border pl-6">
          <Button variant="outline" className="justify-start"><PlusCircle className="w-4 h-4 text-green-600" /> Advice Type/Distribution Channel pricing</Button>
          <Button variant="outline" className="justify-start"><PlusCircle className="w-4 h-4 text-purple-600" /> Special deals</Button>
        </div>
      </div>
    </Fieldset>
  );
}

export default function RetirementTab() {
  const { activeBrokerId } = useApp();

  const { data } = useGetRetirementIncome(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  const ri: any = data || {};

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-slate-400">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full animate-in fade-in duration-300 overflow-y-auto pb-8 pr-2">
      <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-2 rounded text-sm mb-2 shadow-sm font-medium">
        Retirement Income Commission & Fee Configuration
      </div>
      
      <ProductSection title="Non profit Annuity" prefix="npa" data={ri} />
      <ProductSection title="PIPA" prefix="pipa" data={ri} />
      <ProductSection title="PRP" prefix="prp" data={ri} />
      
      <div className="flex justify-end mt-4">
        <Button className="w-32">Save Configuration</Button>
      </div>
    </div>
  );
}
