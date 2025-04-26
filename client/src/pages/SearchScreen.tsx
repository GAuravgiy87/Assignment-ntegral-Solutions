import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PhoneStatusBar from "@/components/PhoneStatusBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Building2, 
  Map, 
  Calendar, 
  Clock, 
  User, 
  X, 
  Star, 
  TrendingUp,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { destinations, hotels, activities, Activity } from "@/data/mockData";

type SearchResult = {
  id: string;
  name: string;
  type: 'destination' | 'hotel' | 'activity';
  location: string;
  imageUrl: string;
  details?: {
    rating?: number;
    price?: number;
    duration?: string;
    date?: string;
  };
};

export default function SearchScreen() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Tokyo", "Hotels in Paris", "Beach activities"]);
  const [popularSearches] = useState<string[]>(["Japan", "Beach resorts", "Hiking tours", "Family-friendly hotels"]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  // Process search results
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay
    const timer = setTimeout(() => {
      const results: SearchResult[] = [];
      
      // Search through destinations
      const filteredDestinations = destinations.filter(
        dest => dest.name.toLowerCase().includes(query.toLowerCase()) || 
                dest.country.toLowerCase().includes(query.toLowerCase())
      );
      
      filteredDestinations.forEach(dest => {
        results.push({
          id: dest.id,
          name: dest.name,
          type: 'destination',
          location: dest.country,
          imageUrl: dest.imageUrl,
          details: {
            date: dest.dateRange
          }
        });
      });
      
      // Search through hotels
      const filteredHotels = hotels.filter(
        hotel => hotel.name.toLowerCase().includes(query.toLowerCase()) || 
                hotel.location.toLowerCase().includes(query.toLowerCase())
      );
      
      filteredHotels.forEach(hotel => {
        results.push({
          id: hotel.id,
          name: hotel.name,
          type: 'hotel',
          location: hotel.location,
          imageUrl: hotel.imageUrl,
          details: {
            rating: hotel.rating,
            price: hotel.pricePerNight
          }
        });
      });
      
      // Search through activities
      const filteredActivities = activities.filter(
        activity => activity.name.toLowerCase().includes(query.toLowerCase()) || 
                  activity.location.toLowerCase().includes(query.toLowerCase())
      );
      
      filteredActivities.forEach(activity => {
        results.push({
          id: activity.id,
          name: activity.name,
          type: 'activity',
          location: activity.location,
          imageUrl: activity.imageUrl,
          details: {
            duration: activity.duration
          }
        });
      });
      
      // Filter based on active tab
      if (activeTab !== 'all') {
        const filteredResults = results.filter(result => result.type === activeTab);
        setSearchResults(filteredResults);
      } else {
        setSearchResults(results);
      }
      
      // Add to recent searches if not already there
      if (query.trim() && !recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 2)]);
      }
      
      setIsSearching(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [query, activeTab]);
  
  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };
  
  const handleClearSearch = () => {
    setQuery("");
  };
  
  const handleResultClick = (result: SearchResult) => {
    // In a real app, we would navigate to the appropriate details page
    if (result.type === 'destination') {
      navigate('/dashboard');
    } else if (result.type === 'activity') {
      const activity = activities.find(a => a.id === result.id) as Activity;
      // We would typically handle this with context or state management
      navigate('/dashboard');
    } else if (result.type === 'hotel') {
      navigate('/dashboard');
    }
  };
  
  const renderResultIcon = (type: string) => {
    switch (type) {
      case 'destination':
        return <Map className="h-4 w-4 text-blue-500" />;
      case 'hotel':
        return <MapPin className="h-4 w-4 text-green-500" />;
      case 'activity':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full px-4 py-6 fade-in dark:bg-gray-900 bg-white">
      <PhoneStatusBar />
      
      <div className="mb-4">
        <h2 className="text-xl font-bold dark:text-white text-black mb-4">Discover</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search destinations, hotels, activities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2"
          />
          {query && (
            <button 
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={handleClearSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {query ? (
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="destination">Places</TabsTrigger>
              <TabsTrigger value="hotel">Hotels</TabsTrigger>
              <TabsTrigger value="activity">Activities</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {isSearching ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {searchResults.length === 0 ? (
                <div className="text-center py-6">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium dark:text-white text-gray-800 mb-1">No results found</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Try different keywords or browse popular searches below
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <Card
                      key={`${result.type}-${result.id}`}
                      className="bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex">
                        <div className="w-14 h-14 overflow-hidden">
                          <img
                            src={result.imageUrl}
                            alt={result.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-3 flex-1">
                          <div className="flex items-center">
                            {renderResultIcon(result.type)}
                            <h4 className="text-sm font-medium dark:text-white text-gray-800 ml-1">
                              {result.name}
                            </h4>
                          </div>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{result.location}</span>
                          </div>
                          {result.details && (
                            <div className="flex items-center justify-between mt-1">
                              {result.details.rating && (
                                <div className="flex items-center text-xs">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span className="ml-1 text-gray-600 dark:text-gray-300">{result.details.rating}</span>
                                </div>
                              )}
                              {result.details.price && (
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  ${result.details.price}/night
                                </div>
                              )}
                              {result.details.duration && (
                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                  {result.details.duration}
                                </div>
                              )}
                              {result.details.date && (
                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                  {result.details.date}
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium flex items-center dark:text-gray-300 text-gray-600">
                  <History className="h-4 w-4 mr-1" /> Recent Searches
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">Clear All</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <Button
                    key={`recent-${index}`}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => handleSearch(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium flex items-center mb-2 dark:text-gray-300 text-gray-600">
              <TrendingUp className="h-4 w-4 mr-1" /> Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, index) => (
                <Button
                  key={`popular-${index}`}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => handleSearch(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 dark:text-gray-300 text-gray-600">Trending Destinations</h3>
            <div className="grid grid-cols-2 gap-3">
              {destinations.slice(0, 4).map((destination) => (
                <Card 
                  key={destination.id} 
                  className="bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
                  onClick={() => handleSearch(destination.name)}
                >
                  <div className="h-24 relative">
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-2 text-white">
                      <h4 className="text-sm font-bold">{destination.name}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}