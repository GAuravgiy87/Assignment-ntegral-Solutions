import { ArrowLeft, Clock, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Activity } from "@/data/mockData";

interface DetailsScreenProps {
  item: Activity;
  onBack: () => void;
}

export default function DetailsScreen({ item, onBack }: DetailsScreenProps) {
  return (
    <div className="h-full px-0 py-0 fade-in dark:bg-gray-900 bg-white third-pane active">
      <div className="relative h-64">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/30 rounded-full p-2"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h2 className="text-white text-xl font-bold">{item.name}</h2>
          <p className="text-white/80 text-sm">{item.location}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex space-x-3 mb-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-sm font-semibold mt-1 dark:text-white text-gray-800">{item.duration}</p>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Best Time</p>
            <p className="text-sm font-semibold mt-1 dark:text-white text-gray-800">{item.bestTime || "Morning"}</p>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Entrance Fee</p>
            <p className="text-sm font-semibold mt-1 dark:text-white text-gray-800">{item.entranceFee || "Free"}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-800">About</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-800">Highlights</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            {item.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-800">How to Get There</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {item.directions}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium dark:text-white text-gray-800">Google Maps</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">Tap to open directions</div>
          </div>
        </div>

        <Button className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium">
          Add to My Trip
        </Button>
      </div>
    </div>
  );
}
