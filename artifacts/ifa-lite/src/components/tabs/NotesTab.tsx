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
    return <div className="h-full flex items-center justify-center text-slate-400">Please select a broker first.</div>;
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Audit Trail & Notes
        </h3>
        <Button><Plus className="w-4 h-4" /> Add Note</Button>
      </div>

      <div className="flex-1 overflow-auto bg-slate-50 border border-border rounded-md p-4 space-y-4 shadow-inner">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-slate-400">No notes found for this record.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    note.noteType === 'SYS' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {note.noteType}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{note.updatedBy}</span>
                </div>
                <span className="text-xs text-slate-400">{note.updatedDate}</span>
              </div>
              
              <p className="text-sm font-medium text-slate-800 mb-3">{note.description}</p>
              
              {(note.oldValue || note.newValue) && (
                <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded p-3 border border-slate-100">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Old Value</span>
                    <span className="text-sm text-rose-600 line-through decoration-rose-300">{note.oldValue || '\u2014'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">New Value</span>
                    <span className="text-sm text-emerald-600 font-medium">{note.newValue || '\u2014'}</span>
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
