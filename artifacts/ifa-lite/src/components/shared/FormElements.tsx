import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Fieldset({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <fieldset className={cn("border border-border rounded-md p-4 pt-2 mb-4 bg-card shadow-sm", className)}>
      <legend className="text-xs font-bold text-primary px-2 uppercase tracking-wider bg-card">
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
      <label className={cn("text-xs font-semibold text-slate-600 text-right truncate", labelWidth)}>
        {label}
      </label>
      <input 
        className={cn(
          "flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded shadow-sm",
          "focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all",
          "disabled:bg-slate-100 disabled:text-slate-500",
          className
        )} 
        {...props} 
      />
    </div>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  labelWidth?: string;
}

export function FormSelect({ label, options, labelWidth = "w-1/3", className, ...props }: FormSelectProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className={cn("text-xs font-semibold text-slate-600 text-right truncate", labelWidth)}>
        {label}
      </label>
      <select 
        className={cn(
          "flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded shadow-sm bg-white",
          "focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all",
          className
        )} 
        {...props}
      >
        <option value="">-- Select --</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function FormCheckbox({ label, ...props }: Omit<FormInputProps, 'labelWidth'>) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input 
        type="checkbox" 
        className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" 
        {...props} 
      />
      <label className="text-xs font-semibold text-slate-600">
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
      <label className="w-1/3 text-xs font-semibold text-slate-600 text-right truncate">
        {label}
      </label>
      <div className="flex-1 flex gap-4">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-1.5 text-sm">
            <input 
              type="radio" 
              name={name} 
              value={opt.value} 
              checked={value === opt.value}
              onChange={onChange}
              className="text-primary focus:ring-primary" 
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function Button({ children, variant = 'primary', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) {
  const base = "px-4 py-1.5 text-sm font-medium rounded shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
  };
  
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
