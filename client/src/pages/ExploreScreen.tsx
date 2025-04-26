import { useState } from "react";
import { useLocation } from "wouter";
import PhoneStatusBar from "@/components/PhoneStatusBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Globe, 
  Heart, 
  CalendarDays, 
  ArrowRight, 
  Star,
  Users,
  PlaneLanding,
  Palmtree,
  Mountain,
  Building,
  Utensils,
  Camera,
  Leaf
} from "lucide-react";
import { destinations } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { LanguageTranslator } from "@/components/ui/language-translator";

export default function ExploreScreen() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [likedDestinations, setLikedDestinations] = useState<Set<string>>(new Set());
  
  const popularDestinations = destinations.slice(0, 2);
  const beachDestinations = destinations.filter(d => ["Bali"].includes(d.name));
  const cityDestinations = destinations.filter(d => ["New York", "Paris", "Tokyo"].includes(d.name));
  
  const toggleLike = (destId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLikedDestinations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(destId)) {
        newSet.delete(destId);
      } else {
        newSet.add(destId);
      }
      return newSet;
    });
  };

  const categories = [
    { icon: <Palmtree className="h-6 w-6" />, label: "Beaches" },
    { icon: <Mountain className="h-6 w-6" />, label: "Mountains" },
    { icon: <Building className="h-6 w-6" />, label: "Cities" },
    { icon: <Camera className="h-6 w-6" />, label: "Landmarks" },
    { icon: <Utensils className="h-6 w-6" />, label: "Food" },
    { icon: <Leaf className="h-6 w-6" />, label: "Nature" },
  ];

  const handleDestinationClick = (destination: (typeof destinations)[0]) => {
    // In a real app, we would navigate to a detailed view of this destination
    navigate('/dashboard');
  };

  return (
    <div className="h-full px-4 py-6 fade-in dark:bg-gray-900 bg-white">
      <PhoneStatusBar />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white text-black">Explore</h2>
        <Button variant="ghost" size="icon" onClick={() => navigate('/search')}>
          <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:dark:border-primary transition-colors cursor-pointer"
            >
              <CardContent className="p-3 flex flex-col items-center justify-center">
                <div className="text-primary mb-2">
                  {category.icon}
                </div>
                <span className="text-xs font-medium dark:text-white text-gray-800">
                  {category.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="beaches">Beaches</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="mt-4 space-y-4">
          {popularDestinations.map(destination => (
            <Card 
              key={destination.id}
              className="bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative h-40">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "absolute top-2 right-2 h-8 w-8 rounded-full",
                    likedDestinations.has(destination.id) 
                      ? "bg-red-500 text-white hover:bg-red-600" 
                      : "bg-black/20 text-white hover:bg-black/30"
                  )}
                  onClick={(e) => toggleLike(destination.id, e)}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    likedDestinations.has(destination.id) && "fill-white"
                  )} />
                </Button>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(120 reviews)</span>
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    From $699
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{destination.duration} days</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Users className="h-3 w-3 mr-1" />
                    <span>2-4 people</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <PlaneLanding className="h-3 w-3 mr-1" />
                    <span>Direct flights</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-xs h-8"
                >
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="beaches" className="mt-4 space-y-4">
          {beachDestinations.map(destination => (
            <Card 
              key={destination.id}
              className="bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative h-40">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "absolute top-2 right-2 h-8 w-8 rounded-full",
                    likedDestinations.has(destination.id) 
                      ? "bg-red-500 text-white hover:bg-red-600" 
                      : "bg-black/20 text-white hover:bg-black/30"
                  )}
                  onClick={(e) => toggleLike(destination.id, e)}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    likedDestinations.has(destination.id) && "fill-white"
                  )} />
                </Button>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(240 reviews)</span>
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    From $899
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{destination.duration} days</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Users className="h-3 w-3 mr-1" />
                    <span>2-6 people</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <PlaneLanding className="h-3 w-3 mr-1" />
                    <span>1 stop</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-xs h-8"
                >
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="cities" className="mt-4 space-y-4">
          {cityDestinations.map(destination => (
            <Card 
              key={destination.id}
              className="bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative h-40">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "absolute top-2 right-2 h-8 w-8 rounded-full",
                    likedDestinations.has(destination.id) 
                      ? "bg-red-500 text-white hover:bg-red-600" 
                      : "bg-black/20 text-white hover:bg-black/30"
                  )}
                  onClick={(e) => toggleLike(destination.id, e)}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    likedDestinations.has(destination.id) && "fill-white"
                  )} />
                </Button>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.7</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(310 reviews)</span>
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    From $599
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{destination.duration} days</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Users className="h-3 w-3 mr-1" />
                    <span>1-4 people</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <PlaneLanding className="h-3 w-3 mr-1" />
                    <span>Direct flights</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-xs h-8"
                >
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      
      {/* Travel Tips Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium dark:text-white text-gray-800 mb-3">Travel Tips</h3>
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-3">
            <h4 className="text-sm font-semibold dark:text-white text-gray-800 mb-2">Traveler Advice: Japan</h4>
            <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2 list-disc ml-4">
              <li>The best time to visit Japan is during spring (March to May) for cherry blossoms or fall (September to November) for autumn colors.</li>
              <li>Purchase a Japan Rail Pass before arriving if you plan to travel between cities.</li>
              <li>Always carry cash as many smaller establishments don't accept credit cards.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Language Translation */}
      <LanguageTranslator defaultSourceLang="en" defaultTargetLang="ja" />
    </div>
  );
}