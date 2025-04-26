import { useState } from "react";
import { useLocation } from "wouter";
import PhoneStatusBar from "@/components/PhoneStatusBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, User, Users, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTravelContext } from "@/contexts/TravelContext";

export default function OnboardingScreen() {
  const [, navigate] = useLocation();
  const { updateTravelInfo } = useTravelContext();
  
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [travelingWith, setTravelingWith] = useState("");

  const handleContinue = () => {
    if (destination && duration && travelingWith) {
      updateTravelInfo({
        destination,
        duration,
        travelingWith,
      });
      navigate("/dashboard");
    }
  };

  const travelOptions = [
    { id: "solo", label: "Solo", icon: <User className="h-5 w-5" /> },
    { id: "couple", label: "Couple", icon: <Users className="h-5 w-5" /> },
    { id: "family", label: "Family", icon: <UsersRound className="h-5 w-5" /> },
    { id: "friends", label: "Friends", icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <div className="h-full px-4 py-6 fade-in dark:bg-gray-900 bg-white">
      <PhoneStatusBar />

      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold dark:text-white text-black">Plan Your Journey, Your Way!</h1>
          <p className="text-gray-600 dark:text-gray-300">Let's create your personalised travel experience</p>
        </div>
        
        {/* Destination */}
        <div className="space-y-2">
          <label className="block text-lg font-medium dark:text-white text-black">Where would you like to go?</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter Destination"
              className="w-full pl-10 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-lg font-medium dark:text-white text-black">How long will you stay?</label>
          <div className="relative">
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full pl-10">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                <SelectItem value="short">Short trip (4-7 days)</SelectItem>
                <SelectItem value="medium">Medium trip (8-14 days)</SelectItem>
                <SelectItem value="long">Long trip (15+ days)</SelectItem>
              </SelectContent>
            </Select>
            <div className="absolute left-3 top-3.5 text-gray-400 z-10 pointer-events-none">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        {/* Traveling With */}
        <div className="space-y-3">
          <label className="block text-lg font-medium dark:text-white text-black">Who are you traveling with?</label>
          <div className="grid grid-cols-2 gap-3">
            {travelOptions.map(option => (
              <button
                key={option.id}
                className={cn(
                  "flex items-center justify-center space-x-2 py-4 rounded-lg transition duration-200 border-2",
                  travelingWith === option.id 
                    ? "border-primary bg-primary/10 dark:bg-primary/20" 
                    : "border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                )}
                onClick={() => setTravelingWith(option.id)}
              >
                <div className={cn(
                  "text-gray-700 dark:text-gray-300",
                  travelingWith === option.id && "text-primary dark:text-primary"
                )}>
                  {option.icon}
                </div>
                <span className={cn(
                  "font-medium text-gray-700 dark:text-gray-300",
                  travelingWith === option.id && "text-primary dark:text-primary"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium text-base" 
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
