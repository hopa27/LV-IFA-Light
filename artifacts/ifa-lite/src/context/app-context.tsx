import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabId = 'lookups' | 'ifa-detail' | 'contacts' | 'retirement' | 'equity' | 'notes';

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  activeBrokerId: number | null;
  setActiveBrokerId: (id: number | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('lookups');
  const [activeBrokerId, setActiveBrokerId] = useState<number | null>(null);

  // When a broker is selected, automatically switch to IFA details
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
