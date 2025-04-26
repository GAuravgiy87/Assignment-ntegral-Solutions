import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Snowflake, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherWidgetProps {
  city: string;
  compact?: boolean;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  icon: JSX.Element;
}

export function WeatherWidget({ city, compact = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    
    // In a real app, we would fetch weather data from an API
    // For this demo, we'll use mock data based on the city
    setTimeout(() => {
      const mockWeatherData: Record<string, WeatherData> = {
        "Tokyo": {
          temperature: 22,
          condition: "Mostly Sunny",
          humidity: 65,
          wind: 12,
          icon: <Sun className="h-8 w-8 text-yellow-500" />
        },
        "Kyoto": {
          temperature: 20,
          condition: "Partly Cloudy",
          humidity: 70,
          wind: 8,
          icon: <Cloud className="h-8 w-8 text-gray-400" />
        },
        "Paris": {
          temperature: 15,
          condition: "Light Rain",
          humidity: 80,
          wind: 15,
          icon: <CloudRain className="h-8 w-8 text-blue-400" />
        },
        "default": {
          temperature: 18,
          condition: "Clear",
          humidity: 60,
          wind: 10,
          icon: <Sun className="h-8 w-8 text-yellow-500" />
        }
      };
      
      setWeather(mockWeatherData[city] || mockWeatherData.default);
      setLoading(false);
    }, 800);
  }, [city]);

  if (loading) {
    return (
      <Card className={`bg-white dark:bg-gray-800 shadow-sm ${compact ? 'p-2' : 'p-4'}`}>
        <CardContent className="p-0 flex items-center justify-center">
          <div className={`animate-pulse ${compact ? 'h-12' : 'h-16'} w-full bg-gray-200 dark:bg-gray-700 rounded`}></div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  if (compact) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-2 flex items-center space-x-2">
          {weather.icon}
          <div>
            <p className="text-sm font-medium dark:text-white text-gray-800">{weather.temperature}°C</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{city}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium dark:text-white text-gray-800">Weather in {city}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
        </div>
        
        <div className="flex items-center mb-3">
          {weather.icon}
          <div className="ml-3">
            <p className="text-2xl font-bold dark:text-white text-gray-800">{weather.temperature}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{weather.condition}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <Cloud className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400">Wind: {weather.wind} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}