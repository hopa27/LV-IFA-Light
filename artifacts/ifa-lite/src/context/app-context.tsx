import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useListBrokers } from '@/hooks/use-static-data';

type TabId = 'lookups' | 'ifa-detail' | 'contacts' | 'retirement' | 'equity' | 'notes';

type LayoutVersion = 'v1' | 'v2';

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activeBrokerId: number | null;
  setActiveBrokerId: (id: number | null) => void;
  activeIfaRef: string;
  setActiveIfaRef: (ref: string) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  isSaving: boolean;
  setIsSaving: (saving: boolean) => void;
  registerSaveHandler: (handler: (() => void) | null) => void;
  triggerSave: () => void;
  layoutVersion: LayoutVersion;
  setLayoutVersion: (v: LayoutVersion) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('ifa-detail');
  const [activeBrokerId, setActiveBrokerId] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [activeIfaRef, setActiveIfaRef] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [layoutVersion, setLayoutVersion] = useState<LayoutVersion>('v1');
  const saveHandlerRef = useRef<(() => void) | null>(null);

  const { data: brokers } = useListBrokers();

  useEffect(() => {
    if (!initialized && brokers && brokers.length > 0) {
      setActiveBrokerId(brokers[0].id!);
      setInitialized(true);
    }
  }, [brokers, initialized]);

  const handleSetBroker = (id: number | null) => {
    setActiveBrokerId(id);
    setIsDirty(false);
    if (id !== null && activeTab === 'lookups') {
      setActiveTab('ifa-detail');
    }
  };

  const registerSaveHandler = useCallback((handler: (() => void) | null) => {
    saveHandlerRef.current = handler;
  }, []);

  const triggerSave = useCallback(() => {
    if (saveHandlerRef.current) {
      saveHandlerRef.current();
    }
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        activeTab, 
        setActiveTab, 
        activeBrokerId, 
        setActiveBrokerId: handleSetBroker,
        activeIfaRef,
        setActiveIfaRef,
        isDirty,
        setIsDirty,
        isSaving,
        setIsSaving,
        registerSaveHandler,
        triggerSave,
        layoutVersion,
        setLayoutVersion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
