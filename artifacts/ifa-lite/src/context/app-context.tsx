import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useListBrokers } from '@workspace/api-client-react';

type TabId = 'lookups' | 'ifa-detail' | 'contacts' | 'retirement' | 'equity' | 'notes';

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activeBrokerId: number | null;
  setActiveBrokerId: (id: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('ifa-detail');
  const [activeBrokerId, setActiveBrokerId] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);

  const { data: brokers } = useListBrokers();

  useEffect(() => {
    if (!initialized && brokers && brokers.length > 0) {
      setActiveBrokerId(brokers[0].id!);
      setInitialized(true);
    }
  }, [brokers, initialized]);

  const handleSetBroker = (id: number | null) => {
    setActiveBrokerId(id);
    if (id !== null && activeTab === 'lookups') {
      setActiveTab('ifa-detail');
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        activeTab, 
        setActiveTab, 
        activeBrokerId, 
        setActiveBrokerId: handleSetBroker 
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
