import React from 'react';
import { useListNotes } from '@workspace/api-client-react';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/shared/FormElements';
import { Plus, History } from 'lucide-react';

export default function NotesTab() {
  const { activeBrokerId } = useApp();

  const { data: notes = [] } = useListNotes(activeBrokerId || 0, {
    query: { enabled: !!activeBrokerId }
  });

  if (!activeBrokerId) {
    return <div className="h-full flex items-center justify-center text-[#979797] font-[Mulish]">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#00263e] flex items-center gap-2 font-sans">
          <History className="w-5 h-5 text-[#006cf4]" />
          Audit Trail & Notes
        </h3>
        <Button><Plus className="w-4 h-4" /> Add Note</Button>
      </div>

      <div className="flex-1 overflow-auto bg-[#eaf5f8]/50 border border-[#BBBBBB] rounded-lg p-4 space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-[#979797] font-[Mulish]">No notes found for this record.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white border border-[#BBBBBB]/60 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2 border-b border-[#BBBBBB]/30 pb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-sans ${
                    note.noteType === 'SYS' ? 'bg-[#006cf4]/10 text-[#006cf4]' : 'bg-[#178830]/10 text-[#178830]'
                  }`}>
                    {note.noteType}
                  </span>
                  <span className="text-xs text-[#979797] font-medium font-[Mulish]">{note.updatedBy}</span>
                </div>
                <span className="text-xs text-[#979797] font-[Mulish]">{note.updatedDate}</span>
              </div>
              
              <p className="text-sm font-medium text-[#3d3d3d] mb-3 font-[Mulish]">{note.description}</p>
              
              {(note.oldValue || note.newValue) && (
                <div className="grid grid-cols-2 gap-4 bg-[#eaf5f8] rounded-lg p-3 border border-[#BBBBBB]/30">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#979797] mb-1 font-sans">Old Value</span>
                    <span className="text-sm text-[#d72714] line-through decoration-[#d72714]/30 font-[Mulish]">{note.oldValue || '\u2014'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#979797] mb-1 font-sans">New Value</span>
                    <span className="text-sm text-[#178830] font-medium font-[Mulish]">{note.newValue || '\u2014'}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
