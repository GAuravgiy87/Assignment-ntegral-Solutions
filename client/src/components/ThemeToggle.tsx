import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-2 right-2 z-50 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8 p-0"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-gray-300" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

export default ThemeToggle;
