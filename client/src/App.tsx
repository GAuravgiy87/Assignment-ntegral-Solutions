import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import OnboardingScreen from "@/pages/OnboardingScreen";
import DashboardScreen from "@/pages/DashboardScreen";
import DetailsScreen from "@/pages/DetailsScreen";
import SearchScreen from "@/pages/SearchScreen";
import ProfileScreen from "@/pages/ProfileScreen"; 
import NotFound from "@/pages/not-found";
import ThemeToggle from "@/components/ThemeToggle";
import NavigationTabs from "@/components/NavigationTabs";
import BottomNavigation from "@/components/BottomNavigation";
import { useTravelContext } from "@/contexts/TravelContext";

function Router() {
  const [location] = useLocation();
  const { setActiveView, activeView } = useTravelContext();
  const [detailsItem, setDetailsItem] = useState<any>(null);

  useEffect(() => {
    if (location === "/") {
      setActiveView("onboarding");
    } else if (location === "/dashboard") {
      setActiveView("dashboard");
    }
  }, [location, setActiveView]);

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <NavigationTabs />
      
      <main className="pt-12 pb-16 h-full overflow-y-auto">
        <Switch>
          <Route path="/" component={OnboardingScreen} />
          <Route path="/dashboard">
            <DashboardScreen onActivityClick={(item) => {
              setDetailsItem(item);
              setActiveView("details");
            }} />
          </Route>
          <Route path="/search" component={SearchScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route component={NotFound} />
        </Switch>

        {activeView === "details" && detailsItem && (
          <DetailsScreen 
            item={detailsItem} 
            onBack={() => setActiveView("dashboard")} 
          />
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
