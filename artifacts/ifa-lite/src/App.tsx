import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppProvider, useApp } from "@/context/app-context";
import { DataStoreProvider } from "@/data/static-store";
import Layout from "@/components/Layout";

import LookupsTab from "@/components/tabs/LookupsTab";
import IfaDetailTab from "@/components/tabs/IfaDetailTab";
import IfaDetailTabV2 from "@/components/tabs/IfaDetailTabV2";
import ContactsTab from "@/components/tabs/ContactsTab";
import RetirementTab from "@/components/tabs/RetirementTab";
import EquityReleaseTab from "@/components/tabs/EquityReleaseTab";
import NotesTab from "@/components/tabs/NotesTab";

function TabRouter() {
  const { activeTab, layoutVersion } = useApp();
  
  switch (activeTab) {
    case 'lookups': return <LookupsTab />;
    case 'ifa-detail': return layoutVersion === 'v2' ? <IfaDetailTabV2 /> : <IfaDetailTab />;
    case 'contacts': return <ContactsTab />;
    case 'retirement': return <RetirementTab />;
    case 'equity': return <EquityReleaseTab />;
    case 'notes': return <NotesTab />;
    default: return <LookupsTab />;
  }
}

function Application() {
  return (
    <Layout>
      <TabRouter />
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Application} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <DataStoreProvider>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppProvider>
            <Router />
          </AppProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </DataStoreProvider>
  );
}

export default App;
