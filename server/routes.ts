import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for travel data
  
  // Get destinations
  app.get('/api/destinations', (req, res) => {
    res.json([
      {
        id: "tokyo",
        name: "Tokyo",
        country: "Japan",
        imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dateRange: "October 10-16, 2025",
        duration: 6
      },
      {
        id: "kyoto",
        name: "Kyoto",
        country: "Japan",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dateRange: "November 5-12, 2025",
        duration: 7
      },
      {
        id: "paris",
        name: "Paris",
        country: "France",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dateRange: "December 15-22, 2025",
        duration: 7
      },
      {
        id: "rome",
        name: "Rome",
        country: "Italy",
        imageUrl: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
        dateRange: "January 10-17, 2026",
        duration: 7
      },
      {
        id: "bali",
        name: "Bali",
        country: "Indonesia",
        imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dateRange: "February 5-15, 2026",
        duration: 10
      },
      {
        id: "new-york",
        name: "New York",
        country: "USA",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dateRange: "March 20-27, 2026",
        duration: 7
      }
    ]);
  });

  // Get hotels
  app.get('/api/hotels', (req, res) => {
    res.json([
      {
        id: "shinjuku-prince",
        name: "Shinjuku Prince Hotel",
        location: "Shinjuku",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 4.3,
        pricePerNight: 120,
        nights: 2,
        amenities: ["WiFi", "Pool", "Restaurant", "Gym"]
      },
      {
        id: "hilton-tokyo",
        name: "Hilton Tokyo Hotel",
        location: "Shinjuku",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        pricePerNight: 180,
        nights: 4,
        amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Spa"]
      },
      {
        id: "imperial-hotel",
        name: "Imperial Hotel Tokyo",
        location: "Hibiya",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        pricePerNight: 220,
        nights: 3,
        amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Spa", "Bar"]
      },
      {
        id: "park-hyatt",
        name: "Park Hyatt Tokyo",
        location: "Shinjuku",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        pricePerNight: 245,
        nights: 2,
        amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Spa", "Bar"]
      },
      {
        id: "aman-tokyo",
        name: "Aman Tokyo",
        location: "Otemachi",
        imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 5.0,
        pricePerNight: 380,
        nights: 1,
        amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Spa", "Bar", "Lounge"]
      },
      {
        id: "cerulean-tower",
        name: "Cerulean Tower Tokyu Hotel",
        location: "Shibuya",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        pricePerNight: 170,
        nights: 3,
        amenities: ["WiFi", "Restaurant", "Gym", "Bar"]
      }
    ]);
  });

  // Get activities
  app.get('/api/activities', (req, res) => {
    res.json([
      {
        id: "sensoji",
        name: "Sensō-ji Temple & Shopping Street",
        location: "Asakusa, Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        duration: "3 hours",
        description: "Sensō-ji is an ancient Buddhist temple located in Asakusa, Tokyo. It is Tokyo's oldest temple, and one of its most significant. The temple is dedicated to the bodhisattva Kannon (Avalokiteśvara). According to legend, a statue of the Kannon was found in the Sumida River in 628 by two fishermen.",
        highlights: [
          "Kaminarimon (Thunder Gate) with its iconic paper lantern",
          "Nakamise Shopping Street with traditional Japanese souvenirs",
          "Hozomon (Treasure House Gate) and five-story pagoda",
          "Main Hall with the sacred Kannon statue (not publicly viewable)"
        ],
        directions: "Take the Tokyo Metro Ginza Line or Asakusa Line to Asakusa Station. The temple is a 5-minute walk from the station.",
        bestTime: "Morning",
        entranceFee: "Free"
      },
      {
        id: "tokyo-skytree",
        name: "Tokyo Sky Tree",
        location: "Sumida, Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        duration: "2 hours",
        description: "Tokyo Skytree is a broadcasting and observation tower in Sumida, Tokyo. It became the tallest structure in Japan in 2010 and reached its full height of 634.0 meters (2,080 ft) in March 2011, making it the tallest tower in the world.",
        highlights: [
          "Two observation decks at heights of 350m and 450m",
          "Spectacular 360-degree views of Tokyo",
          "Skytree Town with shopping and dining",
          "Sumida Aquarium at the base of the tower"
        ],
        directions: "Take the Tobu Skytree Line to Tokyo Skytree Station or the Hanzomon Line to Oshiage Station.",
        bestTime: "Sunset",
        entranceFee: "¥2,100 (main deck), ¥3,100 (both decks)"
      },
      {
        id: "shibuya-crossing",
        name: "Shibuya Crossing",
        location: "Shibuya, Tokyo",
        imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        duration: "1.5 hours",
        description: "Shibuya Crossing is one of the busiest intersections in the world. When the traffic lights turn red, they all turn red at the same time in every direction, allowing pedestrians to flood the entire intersection from all sides.",
        highlights: [
          "Experience the iconic scramble crossing with thousands of people",
          "Visit the Hachiko dog statue, a popular meeting point",
          "Shibuya 109 shopping center for trendy fashion",
          "Starbucks overlooking the crossing for great photos"
        ],
        directions: "Take the JR Yamanote Line, Saikyo Line, or Tokyo Metro to Shibuya Station. Exit through the Hachiko Exit.",
        bestTime: "Evening",
        entranceFee: "Free"
      }
    ]);
  });

  // Save travel preferences
  app.post('/api/travel-preferences', (req, res) => {
    const { destination, duration, travelingWith } = req.body;
    
    // Validate required fields
    if (!destination || !duration || !travelingWith) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // In a real app, we would save this to the database
    // For now, just return success
    res.status(201).json({ 
      message: "Travel preferences saved successfully", 
      data: { destination, duration, travelingWith } 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
