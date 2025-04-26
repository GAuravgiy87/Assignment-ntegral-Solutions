import { useState } from "react";
import { useLocation } from "wouter";
import PhoneStatusBar from "@/components/PhoneStatusBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  CreditCard, 
  Bookmark, 
  Star, 
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  Heart
} from "lucide-react";
import { PackingChecklist } from "@/components/ui/packing-checklist";
import { destinations } from "@/data/mockData";

export default function ProfileScreen() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  // Mock user data
  const userData = {
    name: "Chhavi Kumar",
    email: "chhavi.kumar@example.com",
    avatar: "CH",
    joinDate: "January 2024",
    trips: {
      past: 8,
      upcoming: 2,
      saved: 5
    },
    preferences: {
      currency: "USD",
      language: "English",
      notifications: true,
      darkMode: true
    }
  };
  
  // Mock saved trips
  const savedTrips = destinations.slice(0, 3);
  
  return (
    <div className="h-full px-4 py-6 fade-in dark:bg-gray-900 bg-white">
      <PhoneStatusBar />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white text-black">Profile</h2>
        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-xl font-medium mr-4">
          {userData.avatar}
        </div>
        <div>
          <h3 className="text-lg font-semibold dark:text-white text-black">{userData.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>Member since {userData.joinDate}</span>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="trips">My Trips</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-3">
                <div className="text-xl font-semibold dark:text-white text-gray-800">{userData.trips.past}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Past Trips</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-3">
                <div className="text-xl font-semibold dark:text-white text-gray-800">{userData.trips.upcoming}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Upcoming</div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-3">
                <div className="text-xl font-semibold dark:text-white text-gray-800">{userData.trips.saved}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Saved</div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600">Account Information</h3>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-sm dark:text-white text-gray-800">Personal Information</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-sm dark:text-white text-gray-800">Payment Methods</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-sm dark:text-white text-gray-800">Notifications</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <span className="text-sm dark:text-white text-gray-800">Privacy & Security</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <PackingChecklist compact={true} />
          
          <Button variant="destructive" className="w-full">
            <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
        </TabsContent>
        
        <TabsContent value="trips" className="space-y-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium dark:text-gray-300 text-gray-600">Upcoming Trips</h3>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary text-xs"
              onClick={() => navigate('/dashboard')}
            >
              View All
            </Button>
          </div>
          
          <Card className="bg-white dark:bg-gray-800 overflow-hidden">
            <div className="h-32 relative">
              <img 
                src={destinations[0].imageUrl} 
                alt={destinations[0].name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-3 text-white">
                <h4 className="text-lg font-bold">{destinations[0].name}</h4>
                <div className="flex items-center space-x-3 text-xs mt-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{destinations[0].dateRange}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{destinations[0].duration} days</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="text-xs h-7">
                  Manage Trip
                </Button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span>Departing in 14 days</span>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between items-center mb-2 mt-6">
            <h3 className="text-sm font-medium dark:text-gray-300 text-gray-600">Saved Destinations</h3>
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary text-xs"
              onClick={() => navigate('/explore')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {savedTrips.map((trip) => (
              <Card key={trip.id} className="bg-white dark:bg-gray-800 overflow-hidden">
                <div className="h-24 relative">
                  <img 
                    src={trip.imageUrl} 
                    alt={trip.name} 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-6 w-6 bg-black/30 text-white hover:bg-black/50"
                  >
                    <Heart className="h-3 w-3 fill-white" />
                  </Button>
                </div>
                <CardContent className="p-2">
                  <h4 className="text-sm font-medium dark:text-white text-gray-800">{trip.name}</h4>
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{trip.country}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 mt-4">
          <h3 className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600">App Settings</h3>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium dark:text-white text-gray-800 block mb-2">
                  Preferred Currency
                </label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium dark:text-white text-gray-800 block mb-2">
                  Language
                </label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium dark:text-white text-gray-800">
                  Push Notifications
                </label>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-input">
                  <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all data-[state=checked]:left-6 data-[state=checked]:bg-white" data-state="checked"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium dark:text-white text-gray-800">
                  Email Notifications
                </label>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-input">
                  <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all data-[state=checked]:left-6 data-[state=checked]:bg-white" data-state="checked"></span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600 mt-4">Travel Preferences</h3>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Select your travel preferences to get personalized recommendations.
                </p>
                
                <div>
                  <label className="text-sm font-medium dark:text-white text-gray-800 block mb-2">
                    Accommodation Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Hotel</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Hostel</Badge>
                    <Badge variant="secondary" className="cursor-pointer">Apartment</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Resort</Badge>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="text-sm font-medium dark:text-white text-gray-800 block mb-2">
                    Trip Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="cursor-pointer">Adventure</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Beach</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Cultural</Badge>
                    <Badge variant="secondary" className="cursor-pointer">Urban</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Nature</Badge>
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="text-sm font-medium dark:text-white text-gray-800 block mb-2">
                    Budget Level
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="relative w-full">
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="absolute h-2 w-3/5 rounded-full bg-primary"></div>
                      </div>
                      <div className="absolute -top-1 left-[60%] h-4 w-4 rounded-full border-2 border-primary bg-white"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Budget</span>
                    <span>Luxury</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}