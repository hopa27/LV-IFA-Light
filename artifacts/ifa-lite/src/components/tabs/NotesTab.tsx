import React from 'react';
import { useListNotes } from '@/hooks/use-static-data';
import { useApp } from '@/context/app-context';
import { Button } from '@/components/shared/FormElements';
import { Plus } from 'lucide-react';

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
      <div className="flex justify-end items-center mb-4">
        <Button><Plus className="w-4 h-4" /> Add Note</Button>
      </div>

      <div className="flex-1 overflow-auto space-y-0">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-[#979797] font-[Mulish] bg-white border border-[#BBBBBB]">No notes found for this record.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="flex mb-3">
              <div className="w-8 shrink-0 flex items-start pt-3 justify-center">
                <span className="text-xs font-bold text-[#00263e] font-sans leading-tight" style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', letterSpacing: '1px' }}>
                  {note.noteType || 'SYS'}
                </span>
              </div>
              <div className="flex-1 border border-[#BBBBBB] bg-white px-3 py-2 font-[Mulish] text-sm text-[#3d3d3d] min-h-[80px]">
                <p className="font-medium">{note.description}</p>
                {(note.oldValue !== undefined && note.oldValue !== null) && (
                  <div className="mt-1 text-xs font-[Mulish]">
                    <p className="whitespace-pre">
                      <span className="font-bold">OLD VALUE</span>
                      <span className="inline-block w-[60px]"></span>
                      <span>: {note.oldValue}</span>
                    </p>
                    <p className="whitespace-pre">
                      <span className="font-bold">NEW VALUE</span>
                      <span className="inline-block w-[55px]"></span>
                      <span>: {note.newValue}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {Array.from({ length: Math.max(0, 6 - notes.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="flex mb-3">
            <div className="w-8 shrink-0" />
            <div className="flex-1 border border-[#BBBBBB] bg-[#e0e0e0] min-h-[60px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
