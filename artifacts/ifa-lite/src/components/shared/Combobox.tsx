import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { ChevronDown } from 'lucide-react';
import { cn } from './FormElements';

interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  name?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = '-- Select --',
  disabled = false,
  error = false,
  className,
  name,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  const filtered = search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    if (!open) {
      setSearch('');
      setHighlightedIndex(-1);
    } else {
      const idx = filtered.findIndex(o => o.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [open]);

  useEffect(() => {
    setHighlightedIndex(filtered.length > 0 ? 0 : -1);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-combobox-item]');
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, open]);

  const handleSelect = useCallback((val: string) => {
    onChange(val);
    setOpen(false);
    setSearch('');
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
          handleSelect(filtered[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const displayText = open ? search : (selectedOption?.label || '');

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        onClick={() => {
          if (!disabled) {
            setOpen(!open);
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-[34px] w-full rounded-[8px] flex items-center justify-between cursor-pointer transition-colors",
          disabled
            ? "bg-[#CCCCCC] border-[2px] border-[#ACACAC] cursor-not-allowed px-[11px] py-[7px]"
            : open
              ? "border-[3px] border-[#178830] border-b-0 rounded-b-none px-[10px] py-[4px] bg-white"
              : error
                ? "border border-[#d72714] px-[12px] py-[8px] bg-white"
                : "border border-[#BBBBBB] px-[12px] py-[6px] bg-white hover:border-[#178830]"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          readOnly={!open}
          value={displayText}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 text-sm leading-[26px] font-[Mulish] bg-transparent outline-none border-none ring-0 pr-7 min-w-0",
            disabled
              ? "text-[#3d3d3d] placeholder:text-[#3d3d3d] cursor-not-allowed"
              : error
                ? "text-[#d72714] placeholder:text-[#d72714]"
                : "text-[#3d3d3d] placeholder:text-[#BBBBBB]"
          )}
        />
        <ChevronDown
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none transition-transform duration-200",
            open ? "rotate-180" : "",
            error ? "text-[#d72714]" : "text-[#006cf4]"
          )}
        />
      </div>

      {open && !disabled && (
        <div className="absolute top-[100%] left-0 z-50 w-full border-[3px] border-[#178830] border-t-0 rounded-b-[8px] bg-white shadow-lg">
          <div ref={listRef} className="max-h-[200px] overflow-y-auto w-full bg-white">
            {filtered.length === 0 ? (
              <div className="py-2 text-center text-sm text-[#3d3d3d] font-[Mulish]">No results found.</div>
            ) : (
              filtered.map((opt, i) => (
                <div
                  key={opt.value}
                  data-combobox-item
                  data-selected={i === highlightedIndex ? 'true' : 'false'}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt.value);
                  }}
                  className={cn(
                    "px-2 py-1.5 text-sm font-[Mulish] rounded-sm cursor-default select-none",
                    i === highlightedIndex
                      ? "bg-[#003578] text-white"
                      : "text-[#3d3d3d]"
                  )}
                >
                  <span className="flex-1 truncate">{opt.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {name && (
        <input type="hidden" name={name} value={value} />
      )}
    </div>
  );
}
