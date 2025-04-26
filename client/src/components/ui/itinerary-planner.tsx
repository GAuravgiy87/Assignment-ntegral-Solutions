import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { activities, Activity } from "@/data/mockData";

interface ItineraryPlannerProps {
  days?: number;
  onViewDetails?: (activity: Activity) => void;
}

interface ItineraryItem {
  id: string;
  activityId: string;
  time: string;
  notes?: string;
}

interface DayPlan {
  date: string;
  activities: ItineraryItem[];
}

export function ItineraryPlanner({ days = 3, onViewDetails }: ItineraryPlannerProps) {
  const [itinerary, setItinerary] = useState<DayPlan[]>(() => {
    // Initialize with empty days
    const startDate = new Date();
    const initialItinerary: DayPlan[] = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      initialItinerary.push({
        date: currentDate.toDateString(),
        activities: []
      });
    }
    
    // Pre-populate with one activity per day
    const prePopulated = [...initialItinerary];
    prePopulated[0].activities = [
      { id: "day1-item1", activityId: "sensoji", time: "09:00 AM" }
    ];
    
    prePopulated[1].activities = [
      { id: "day2-item1", activityId: "tokyo-skytree", time: "11:00 AM" }
    ];
    
    if (days > 2) {
      prePopulated[2].activities = [
        { id: "day3-item1", activityId: "shibuya-crossing", time: "04:00 PM" }
      ];
    }
    
    return prePopulated;
  });
  
  const [activeDay, setActiveDay] = useState<string>("0");
  
  const handleAddActivity = (dayIndex: number, activityId: string) => {
    setItinerary(prevItinerary => {
      const updatedItinerary = [...prevItinerary];
      const time = "12:00 PM";
      
      updatedItinerary[dayIndex].activities.push({
        id: `day${dayIndex + 1}-item${updatedItinerary[dayIndex].activities.length + 1}`,
        activityId,
        time
      });
      
      return updatedItinerary;
    });
  };
  
  const handleRemoveActivity = (dayIndex: number, itemId: string) => {
    setItinerary(prevItinerary => {
      const updatedItinerary = [...prevItinerary];
      updatedItinerary[dayIndex].activities = updatedItinerary[dayIndex].activities.filter(
        item => item.id !== itemId
      );
      return updatedItinerary;
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getActivityDetails = (activityId: string): Activity | undefined => {
    return activities.find(activity => activity.id === activityId);
  };

  const tabDays = Array.from({ length: days }, (_, i) => ({
    value: i.toString(),
    label: `Day ${i + 1}`
  }));

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium dark:text-white text-gray-800 mb-3">Trip Itinerary</h3>
        
        <Tabs defaultValue="0" value={activeDay} onValueChange={setActiveDay}>
          <TabsList className="w-full mb-3 grid grid-cols-3 bg-gray-100 dark:bg-gray-700">
            {tabDays.map(day => (
              <TabsTrigger 
                key={day.value} 
                value={day.value}
                className={cn(
                  "text-xs",
                  activeDay === day.value ? "bg-white dark:bg-gray-800" : "hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabDays.map((day, index) => (
            <TabsContent 
              key={day.value} 
              value={day.value}
              className={activeDay === day.value ? "block" : "hidden"}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{formatDate(itinerary[index].date)}</span>
                  </div>
                </div>
                
                {itinerary[index].activities.length === 0 ? (
                  <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                    No activities planned for this day
                  </div>
                ) : (
                  <div className="space-y-2">
                    {itinerary[index].activities.map(item => {
                      const activity = getActivityDetails(item.activityId);
                      if (!activity) return null;
                      
                      return (
                        <div 
                          key={item.id} 
                          className="flex items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700"
                        >
                          <div className="w-10 h-10 rounded overflow-hidden mr-2">
                            <img 
                              src={activity.imageUrl} 
                              alt={activity.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p 
                              className="text-sm font-medium text-gray-800 dark:text-white truncate cursor-pointer"
                              onClick={() => onViewDetails && onViewDetails(activity)}
                            >
                              {activity.name}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{item.time}</span>
                              <MapPin className="h-3 w-3 ml-2 mr-1" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 ml-2"
                            onClick={() => handleRemoveActivity(index, item.id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-2">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Suggestions</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7 px-2"
                    onClick={() => {
                      // Find an activity not already in this day's itinerary
                      const currentActivityIds = new Set(
                        itinerary[index].activities.map(item => item.activityId)
                      );
                      
                      const availableActivities = activities.filter(
                        activity => !currentActivityIds.has(activity.id)
                      );
                      
                      if (availableActivities.length > 0) {
                        const randomActivity = availableActivities[
                          Math.floor(Math.random() * availableActivities.length)
                        ];
                        handleAddActivity(index, randomActivity.id);
                      }
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Activity
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {activities
                    .filter(activity => !itinerary[index].activities.some(
                      item => item.activityId === activity.id
                    ))
                    .slice(0, 4)
                    .map(activity => (
                      <Card 
                        key={activity.id} 
                        className="bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => handleAddActivity(index, activity.id)}
                      >
                        <div className="p-2 flex items-center space-x-2">
                          <div className="w-8 h-8 rounded overflow-hidden">
                            <img 
                              src={activity.imageUrl} 
                              alt={activity.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-800 dark:text-white truncate">
                            {activity.name}
                          </span>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}