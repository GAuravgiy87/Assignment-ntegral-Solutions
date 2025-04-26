import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useTravelContext } from "@/contexts/TravelContext";

export function NavigationTabs() {
  const [location, navigate] = useLocation();
  const { activeView } = useTravelContext();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-2 flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <button 
        onClick={() => navigate('/')}
        className={cn(
          "tab-button text-sm font-medium px-2 py-1 rounded",
          activeView === "onboarding" 
            ? "text-primary dark:text-primary border-b-2 border-primary" 
            : "text-gray-500 dark:text-gray-400"
        )}
      >
        Onboarding
      </button>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className={cn(
          "tab-button text-sm font-medium px-2 py-1 rounded",
          activeView === "dashboard" 
            ? "text-primary dark:text-primary border-b-2 border-primary" 
            : "text-gray-500 dark:text-gray-400"
        )}
      >
        Dashboard
      </button>
      
      <button 
        className={cn(
          "tab-button text-sm font-medium px-2 py-1 rounded",
          activeView === "details" 
            ? "text-primary dark:text-primary border-b-2 border-primary" 
            : "text-gray-500 dark:text-gray-400 hidden"
        )}
      >
        Details
      </button>
    </div>
  );
}

export default NavigationTabs;
