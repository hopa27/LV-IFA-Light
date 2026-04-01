import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import {
  Broker, Contact, Note, RetirementIncome, EquityRelease,
  initialBrokers, initialContacts, initialNotes, initialRetirementIncome, initialEquityRelease,
} from './seed-data';

interface DataStore {
  brokers: Broker[];
  contacts: Contact[];
  notes: Note[];
  retirementIncome: RetirementIncome[];
  equityRelease: EquityRelease[];
  updateBroker: (id: number, data: Partial<Broker>) => Broker;
  createBroker: (data: Partial<Broker>) => Broker;
  addNote: (brokerId: number, data: Partial<Note>) => Note;
}

const DataStoreContext = createContext<DataStore | undefined>(undefined);

export function DataStoreProvider({ children }: { children: ReactNode }) {
  const [brokers, setBrokers] = useState<Broker[]>(() => [...initialBrokers]);
  const [contacts] = useState<Contact[]>(() => [...initialContacts]);
  const [notes, setNotes] = useState<Note[]>(() => [...initialNotes]);
  const [retirementIncome] = useState<RetirementIncome[]>(() => [...initialRetirementIncome]);
  const [equityRelease] = useState<EquityRelease[]>(() => [...initialEquityRelease]);

  const nextBrokerId = useRef(initialBrokers.reduce((max, b) => Math.max(max, b.id), 0) + 1);
  const nextNoteId = useRef(initialNotes.reduce((max, n) => Math.max(max, n.id), 0) + 1);

  const updateBroker = useCallback((id: number, data: Partial<Broker>) => {
    let updated: Broker = {} as Broker;
    setBrokers(prev => prev.map(b => {
      if (b.id === id) {
        updated = { ...b, ...data };
        return updated;
      }
      return b;
    }));
    return updated;
  }, []);

  const createBroker = useCallback((data: Partial<Broker>) => {
    const id = nextBrokerId.current++;
    const now = new Date();
    const newBroker: Broker = {
      id,
      ifaRef: `NEW-${String(id).padStart(3, '0')}`,
      brokerNo: `BRK${String(id).padStart(3, '0')}`,
      fimbraNo: `FIM${String(id).padStart(3, '0')}`,
      brokerName: '',
      status: 'Authorised',
      createdBy: 'SYSTEM',
      createdDate: now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      ...data,
    };
    setBrokers(prev => [...prev, newBroker]);
    return newBroker;
  }, []);

  const addNote = useCallback((brokerId: number, data: Partial<Note>) => {
    const id = nextNoteId.current++;
    const newNote: Note = {
      id,
      brokerId,
      noteType: data.noteType || 'SYS',
      description: data.description || '',
      ...data,
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  return (
    <DataStoreContext.Provider value={{ brokers, contacts, notes, retirementIncome, equityRelease, updateBroker, createBroker, addNote }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export function useDataStore() {
  const context = useContext(DataStoreContext);
  if (!context) throw new Error('useDataStore must be used within DataStoreProvider');
  return context;
}
