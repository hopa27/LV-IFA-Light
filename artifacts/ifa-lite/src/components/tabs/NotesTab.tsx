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

      <div className="flex-1 overflow-auto">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-[#979797] font-[Mulish] bg-white border border-[#BBBBBB] rounded-lg">No notes found for this record.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="flex mb-2 border border-[#BBBBBB] rounded-lg overflow-hidden bg-white">
              <div className="w-10 shrink-0 flex flex-col items-center justify-center bg-[#eaf5f8] border-r border-[#BBBBBB]">
                {(note.noteType || 'SYS').split('').map((ch, i) => (
                  <span key={i} className="text-xs font-bold text-[#00263e] font-sans leading-4">{ch}</span>
                ))}
              </div>
              <div className="flex-1 px-4 py-3 font-[Mulish] text-sm text-[#3d3d3d] min-h-[80px]">
                <p className="font-semibold text-[#00263e]">{note.description}</p>
                {(note.oldValue !== undefined && note.oldValue !== null) && (
                  <div className="mt-2 text-xs font-[Mulish] text-[#3d3d3d]">
                    <p>
                      <span className="font-bold inline-block w-[100px]">OLD VALUE</span>
                      <span>: {note.oldValue}</span>
                    </p>
                    <p>
                      <span className="font-bold inline-block w-[100px]">NEW VALUE</span>
                      <span>: {note.newValue}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {Array.from({ length: Math.max(0, 6 - notes.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="mb-2 border border-[#BBBBBB] rounded-lg bg-[#d8d8d8] min-h-[60px]" />
        ))}
      </div>
    </div>
  );
}
