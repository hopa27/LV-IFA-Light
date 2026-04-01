import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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
    const newBroker: Broker = {
      id: 0,
      ifaRef: '',
      brokerNo: '',
      fimbraNo: '',
      brokerName: '',
      status: 'Authorised',
      ...data,
    };
    setBrokers(prev => {
      const maxId = prev.reduce((max, b) => Math.max(max, b.id), 0);
      newBroker.id = maxId + 1;
      newBroker.ifaRef = newBroker.ifaRef || `NEW-${String(newBroker.id).padStart(3, '0')}`;
      newBroker.brokerNo = newBroker.brokerNo || `BRK${String(newBroker.id).padStart(3, '0')}`;
      newBroker.fimbraNo = newBroker.fimbraNo || `FIM${String(newBroker.id).padStart(3, '0')}`;
      newBroker.createdBy = 'SYSTEM';
      newBroker.createdDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      return [...prev, newBroker];
    });
    return newBroker;
  }, []);

  const addNote = useCallback((brokerId: number, data: Partial<Note>) => {
    const newNote: Note = {
      id: 0,
      brokerId,
      noteType: data.noteType || 'SYS',
      description: data.description || '',
      ...data,
    };
    setNotes(prev => {
      const maxId = prev.reduce((max, n) => Math.max(max, n.id), 0);
      newNote.id = maxId + 1;
      return [newNote, ...prev];
    });
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
