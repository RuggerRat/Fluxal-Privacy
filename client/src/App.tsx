import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Signin from "@/pages/signin";
// import "./lib/reown"; // Initialize Reown AppKit - Disabled due to install issues

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signin" component={Signin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
