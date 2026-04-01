import React from 'react';
import { useListNotes } from '@/hooks/use-static-data';
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
    <div className="flex flex-col min-h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#00263e] flex items-center gap-2 font-sans">
          <History className="w-5 h-5 text-[#006cf4]" />
          Audit Trail & Notes
        </h3>
        <Button><Plus className="w-4 h-4" /> Add Note</Button>
      </div>

      <div className="flex-1 overflow-auto bg-white border border-[#BBBBBB] rounded-lg">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-[#979797] font-[Mulish]">No notes found for this record.</div>
        ) : (
          <div className="divide-y divide-[#BBBBBB]">
            {notes.map(note => (
              <div key={note.id} className="flex hover:bg-[#eaf5f8]/50 transition-colors">
                <div className="w-10 shrink-0 flex items-center justify-center bg-[#eaf5f8] border-r border-[#BBBBBB]">
                  <span className="text-[10px] font-bold text-[#006cf4] font-sans writing-vertical" style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', letterSpacing: '2px' }}>
                    {note.noteType || 'SYS'}
                  </span>
                </div>
                <div className="flex-1 px-4 py-3 font-[Mulish] text-sm text-[#3d3d3d]">
                  <p className="font-medium">{note.description}</p>
                  {(note.oldValue !== undefined || note.newValue !== undefined) && (
                    <div className="mt-1 text-xs space-y-0.5">
                      <p>
                        <span className="font-bold text-[#979797] uppercase">Old Value</span>
                        <span className="ml-4">: {note.oldValue || '\u2014'}</span>
                      </p>
                      <p>
                        <span className="font-bold text-[#979797] uppercase">New Value</span>
                        <span className="ml-3">: {note.newValue || '\u2014'}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
