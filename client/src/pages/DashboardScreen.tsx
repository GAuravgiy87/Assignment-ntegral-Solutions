import { useState } from "react";
import PhoneStatusBar from "@/components/PhoneStatusBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTravelContext } from "@/contexts/TravelContext";
import { destinations, hotels, activities } from "@/data/mockData";
import { Clock, MapPin, User, Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeatherWidget } from "@/components/ui/weather-widget";
import { CurrencyConverter } from "@/components/ui/currency-converter";
import { ItineraryPlanner } from "@/components/ui/itinerary-planner";
import { PackingChecklist } from "@/components/ui/packing-checklist";
import { SafetyTips } from "@/components/ui/safety-tips";

interface DashboardScreenProps {
  onActivityClick: (activity: any) => void;
}

export default function DashboardScreen({ onActivityClick }: DashboardScreenProps) {
  const { travelInfo } = useTravelContext();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  // Using the mock data from our data file
  const destination = destinations.find(d => d.id === "tokyo") || destinations[0];
  const recommendedHotels = hotels.slice(0, 2);
  const recommendedActivities = activities;

  const activityFilters = [
    { id: "all", label: "All Activities" },
    { id: "day1", label: "Day 1" },
    { id: "day2", label: "Day 2" },
    { id: "day3", label: "Day 3" },
    { id: "day4", label: "Day 4" },
    { id: "day5", label: "Day 5" },
  ];

  return (
    <div className="h-full px-4 py-6 fade-in dark:bg-gray-900 bg-white">
      <PhoneStatusBar />

      {/* User Welcome */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black">Hello Chhavi!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ready for the trip?</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
          CH
        </div>
      </div>
      
      {/* Weather Widget */}
      <div className="mb-4">
        <WeatherWidget city={destination.name} compact={true} />
      </div>

      {/* Trip Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-6">
          {/* Upcoming Trip Card */}
          <div>
            <h3 className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600">Your Upcoming Trip</h3>
            <div className="relative rounded-xl overflow-hidden h-48 group cursor-pointer">
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{destination.name.toUpperCase()}</h3>
                <p className="text-sm opacity-90">{destination.dateRange.toUpperCase()}</p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs">{destination.duration} days</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-xs">{travelInfo.travelingWith || 'Solo'}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-xs">{destination.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium dark:text-gray-300 text-gray-600">Flight Details</h3>
              <a href="#" className="text-xs text-primary font-medium">View All</a>
            </div>
            <div className="bg-blue-600 text-white p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-xs opacity-80">30 OCT, 2025, 10:30 am</span>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-xl font-bold">NRT</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xl font-bold">SFO</span>
                  </div>
                </div>
                <div className="bg-white/20 px-2 py-1 rounded">
                  <span className="text-xs">NH-123</span>
                </div>
              </div>
              <div className="text-xs mt-2">All Nippon Airways • Economy • 10h 30m</div>
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium dark:text-gray-300 text-gray-600">Accommodation</h3>
              <a href="#" className="text-xs text-primary font-medium">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recommendedHotels.map((hotel) => (
                <Card key={hotel.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={hotel.imageUrl} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-2">
                    <h4 className="text-xs font-medium dark:text-white text-gray-800 truncate">{hotel.name}</h4>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs dark:text-gray-300 text-gray-600 ml-1">{hotel.rating} • {hotel.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-medium dark:text-gray-300 text-gray-700">{hotel.nights} nights</div>
                      <div className="text-xs font-medium dark:text-white text-gray-800">${hotel.pricePerNight}/night</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium dark:text-gray-300 text-gray-600">Activities</h3>
              <a href="#" className="text-xs text-primary font-medium">View All</a>
            </div>

            {/* Activity Filters */}
            <div className="mb-3 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 pb-2">
                {activityFilters.map(filter => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "whitespace-nowrap text-xs rounded-full",
                      activeFilter === filter.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    )}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Activity Cards */}
            <div className="space-y-3">
              {recommendedActivities.map((activity) => (
                <Card 
                  key={activity.id}
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => onActivityClick(activity)}
                >
                  <div className="flex">
                    <div className="w-24 h-24">
                      <img 
                        src={activity.imageUrl} 
                        alt={activity.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 flex-1">
                      <h4 className="text-sm font-medium dark:text-white text-gray-800">{activity.name}</h4>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{activity.location}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Duration: {activity.duration}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="itinerary" className="mt-4 space-y-4">
          <ItineraryPlanner 
            days={destination.duration} 
            onViewDetails={onActivityClick}
          />
        </TabsContent>
        
        <TabsContent value="tools" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <CurrencyConverter defaultFrom="USD" defaultTo="JPY" />
            <PackingChecklist destination={destination.name} />
          </div>
        </TabsContent>
        
        <TabsContent value="safety" className="mt-4 space-y-4">
          <SafetyTips destination="Japan" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
