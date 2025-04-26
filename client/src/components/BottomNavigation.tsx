import { useLocation } from "wouter";
import { Home, Search, Plus, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const [location, navigate] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around py-2 z-30">
      <button 
        onClick={() => navigate('/dashboard')}
        className={cn(
          "flex flex-col items-center justify-center px-4 py-2",
          isActive('/dashboard') ? "text-primary dark:text-primary" : "text-gray-500 dark:text-gray-400"
        )}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        className="flex flex-col items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400"
      >
        <Search className="h-6 w-6" />
        <span className="text-xs mt-1">Search</span>
      </button>
      
      <button 
        className="flex flex-col items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400"
      >
        <Plus className="h-6 w-6" />
        <span className="text-xs mt-1">Add</span>
      </button>
      
      <button 
        className="flex flex-col items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400"
      >
        <Heart className="h-6 w-6" />
        <span className="text-xs mt-1">Saved</span>
      </button>
      
      <button 
        className="flex flex-col items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400"
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}

export default BottomNavigation;
