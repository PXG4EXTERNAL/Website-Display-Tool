import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Layout } from '@/components/layout';
import { AdminProvider } from '@/contexts/admin-context';

import Home from '@/pages/home';
import GetKey from '@/pages/get-key';
import Games from '@/pages/games';
import Premium from '@/pages/premium';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/get-key" component={GetKey} />
      <Route path="/games" component={Games} />
      <Route path="/premium" component={Premium} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
        </AdminProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
