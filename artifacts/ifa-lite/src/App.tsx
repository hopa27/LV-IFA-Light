import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppProvider, useApp } from "@/context/app-context";
import Layout from "@/components/Layout";

// Tabs
import LookupsTab from "@/components/tabs/LookupsTab";
import IfaDetailTab from "@/components/tabs/IfaDetailTab";
import ContactsTab from "@/components/tabs/ContactsTab";
import RetirementTab from "@/components/tabs/RetirementTab";
import EquityReleaseTab from "@/components/tabs/EquityReleaseTab";
import NotesTab from "@/components/tabs/NotesTab";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function TabRouter() {
  const { activeTab } = useApp();
  
  // Render active tab dynamically to maintain state in others if we used hidden, 
  // but for simplicity and standard React unmounting, we just switch components.
  switch (activeTab) {
    case 'lookups': return <LookupsTab />;
    case 'ifa-detail': return <IfaDetailTab />;
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppProvider>
            <Router />
          </AppProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
