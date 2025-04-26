import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Info, PhoneCall, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'emergency' | 'health' | 'general' | 'scams';
}

interface CountryInfo {
  emergencyNumber: string;
  policeNumber: string;
  ambulanceNumber: string;
  embassyInfo: string;
}

interface SafetyTipsProps {
  destination?: string;
  compact?: boolean;
}

export function SafetyTips({ destination = "Japan", compact = false }: SafetyTipsProps) {
  const [expanded, setExpanded] = useState<boolean>(!compact);
  
  // Country-specific emergency information
  const countryInfo: Record<string, CountryInfo> = {
    "Japan": {
      emergencyNumber: "110",
      policeNumber: "110",
      ambulanceNumber: "119",
      embassyInfo: "U.S. Embassy: +81-3-3224-5000"
    },
    "France": {
      emergencyNumber: "112",
      policeNumber: "17",
      ambulanceNumber: "15",
      embassyInfo: "U.S. Embassy: +33-1-4312-2222"
    },
    "default": {
      emergencyNumber: "112",
      policeNumber: "112",
      ambulanceNumber: "112",
      embassyInfo: "Contact your local embassy"
    }
  };
  
  const info = countryInfo[destination] || countryInfo.default;
  
  // Safety tips
  const safetyTips: SafetyTip[] = [
    {
      id: "tip1",
      title: "Keep copies of important documents",
      description: "Make digital and physical copies of your passport, ID, insurance, and travel documents. Store copies separately from originals.",
      icon: <Shield className="h-4 w-4 text-blue-500" />,
      type: 'general'
    },
    {
      id: "tip2",
      title: "Be aware of local scams",
      description: "Research common scams at your destination. Be wary of strangers offering unsolicited help or deals that seem too good to be true.",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      type: 'scams'
    },
    {
      id: "tip3",
      title: "Register with your embassy",
      description: "For longer trips, register your travel plans with your country's embassy or consulate. This helps them contact you in emergencies.",
      icon: <Info className="h-4 w-4 text-green-500" />,
      type: 'general'
    },
    {
      id: "tip4",
      title: "Get travel insurance",
      description: "Ensure you have adequate travel insurance covering medical emergencies, trip cancellations, and lost belongings.",
      icon: <Shield className="h-4 w-4 text-blue-500" />,
      type: 'health'
    },
    {
      id: "tip5",
      title: "Learn basic local phrases",
      description: "Know how to say 'help', 'police', 'hospital', and other emergency phrases in the local language.",
      icon: <Info className="h-4 w-4 text-green-500" />,
      type: 'emergency'
    }
  ];
  
  if (compact) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-3">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <h3 className="text-sm font-medium dark:text-white text-gray-800">Safety Information</h3>
            </div>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          
          {expanded && (
            <div className="mt-2 space-y-2">
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs">
                <div className="font-medium text-red-800 dark:text-red-300">Emergency Numbers:</div>
                <div className="mt-1 text-red-700 dark:text-red-200">
                  <div className="flex items-center">
                    <PhoneCall className="h-3 w-3 mr-1" /> Emergency: {info.emergencyNumber}
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-3 w-3 mr-1" /> Ambulance: {info.ambulanceNumber}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {safetyTips[0].title}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-sm font-medium dark:text-white text-gray-800">Safety Information for {destination}</h3>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded mb-4">
          <div className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Emergency Contact Information:</div>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-red-700 dark:text-red-200">
            <div className="flex items-center">
              <PhoneCall className="h-4 w-4 mr-1" /> Emergency: {info.emergencyNumber}
            </div>
            <div className="flex items-center">
              <PhoneCall className="h-4 w-4 mr-1" /> Police: {info.policeNumber}
            </div>
            <div className="flex items-center">
              <PhoneCall className="h-4 w-4 mr-1" /> Ambulance: {info.ambulanceNumber}
            </div>
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-1" /> {info.embassyInfo}
            </div>
          </div>
        </div>
        
        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Travel Safety Tips</h4>
        
        <Accordion type="single" collapsible className="w-full">
          {safetyTips.map((tip, index) => (
            <AccordionItem key={tip.id} value={tip.id} className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="text-sm py-2">
                <div className="flex items-center">
                  {tip.icon}
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{tip.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-gray-600 dark:text-gray-400 py-2">
                  {tip.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic text-center">
          Always keep these numbers saved in your phone and written on paper.
        </div>
      </CardContent>
    </Card>
  );
}