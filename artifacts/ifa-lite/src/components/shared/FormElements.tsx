import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Fieldset({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <fieldset className={cn("border border-[#BBBBBB] rounded-lg p-4 pt-2 mb-4 bg-white", className)}>
      <legend className="text-xs font-bold text-[#006cf4] px-2 uppercase tracking-wider font-sans">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelWidth?: string;
}

export function FormInput({ label, labelWidth = "w-1/3", className, ...props }: FormInputProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className={cn("text-xs font-semibold text-[#3d3d3d] text-right truncate font-sans", labelWidth)}>
        {label}
      </label>
      <input 
        className={cn(
          "flex-1 px-3 py-1.5 text-sm border border-[#BBBBBB] rounded-lg bg-white font-[Mulish] text-[#3d3d3d]",
          "placeholder:text-[#BBBBBB] placeholder:font-[Mulish]",
          "focus:border-[#178830] focus:border-2 focus:outline-none focus:px-[10px] focus:py-[5px]",
          "hover:border-[#178830]",
          "disabled:bg-[#CCCCCC] disabled:border-[#ACACAC] disabled:text-[#3d3d3d] disabled:cursor-not-allowed",
          "transition-colors",
          className
        )} 
        {...props} 
      />
    </div>
  );
}

import { Combobox } from './Combobox';

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  labelWidth?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export function FormSelect({ label, options, labelWidth = "w-1/3", className, name, value = '', onChange, disabled }: FormSelectProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className={cn("text-xs font-semibold text-[#3d3d3d] text-right truncate font-sans", labelWidth)}>
        {label}
      </label>
      <div className="flex-1">
        <Combobox
          options={options}
          value={value}
          name={name}
          disabled={disabled}
          onChange={(val) => {
            if (onChange) {
              const syntheticEvent = {
                target: { name: name || '', value: val },
              } as React.ChangeEvent<HTMLSelectElement>;
              onChange(syntheticEvent);
            }
          }}
          className={className}
        />
      </div>
    </div>
  );
}

export function FormCheckbox({ label, ...props }: Omit<FormInputProps, 'labelWidth'>) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input 
        type="checkbox" 
        className="w-4 h-4 rounded border-[#979797] text-[#178830] focus:ring-[#178830] accent-[#178830] cursor-pointer" 
        {...props} 
      />
      <label className="text-xs font-semibold text-[#3d3d3d] font-sans cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export function FormRadioGroup({ label, name, options, value, onChange }: { 
  label: string, 
  name: string, 
  options: {label: string, value: string}[],
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className="w-1/3 text-xs font-semibold text-[#3d3d3d] text-right truncate font-sans">
        {label}
      </label>
      <div className="flex-1 flex gap-4">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-1.5 text-sm font-[Mulish] text-[#3d3d3d] cursor-pointer">
            <input 
              type="radio" 
              name={name} 
              value={opt.value} 
              checked={value === opt.value}
              onChange={onChange}
              className="w-4 h-4 border-[#979797] text-[#006cf4] focus:ring-[#006cf4] accent-[#006cf4]" 
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function Button({ children, variant = 'primary', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) {
  const base = "px-6 py-2 text-sm font-semibold rounded-full shadow-sm transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed font-sans";
  const variants = {
    primary: "bg-[#006cf4] text-white hover:bg-[#003578] disabled:bg-[#979797] disabled:text-white disabled:opacity-100 shadow-md",
    secondary: "bg-white text-[#04589b] border border-[#04589b] hover:bg-[#003578] hover:text-white hover:border-[#003578] font-bold",
    outline: "border border-[#BBBBBB] bg-white text-[#3d3d3d] hover:border-[#006cf4] hover:text-[#006cf4]"
  };
  
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
