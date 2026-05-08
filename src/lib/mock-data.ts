import { TripResponse } from "@/types";

export const getMockItinerary = (destination: string, days: number): TripResponse => ({
  summary: `Get ready for an incredible ${days}-day journey through ${destination}! We've crafted a perfect balance of iconic landmarks, hidden gems, and culinary delights.`,
  budgetBreakdown: {
    accommodation: 150 * days,
    food: 80 * days,
    transport: 40 * days,
    activities: 60 * days,
    miscellaneous: 30 * days,
  },
  dailyPlan: Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    title: `Exploring the Heart of ${destination}`,
    activities: [
      {
        time: "09:00 AM",
        title: "Iconic Sightseeing",
        description: "Start your day by visiting the most famous landmark in the area. Great for morning photos.",
        location: `${destination} City Center`,
      },
      {
        time: "01:00 PM",
        title: "Local Culinary Experience",
        description: "Enjoy a traditional lunch at a highly-rated local spot.",
        location: "Historic District",
      },
      {
        time: "03:00 PM",
        title: "Cultural Immersion",
        description: "Visit a museum or walk through a culturally significant neighborhood.",
        location: "Arts District",
      }
    ],
    estimatedCost: 140,
  })),
  packingChecklist: [
    { item: "Comfortable walking shoes", category: "Clothing" },
    { item: "Universal power adapter", category: "Electronics" },
    { item: "Light jacket", category: "Clothing" },
    { item: "Reusable water bottle", category: "Accessories" },
  ],
  foodRecommendations: [
    { name: "The Local Bistro", description: "Authentic local cuisine with a modern twist.", type: "Casual Dining" },
    { name: "Street Food Market", description: "Best place to try a variety of local snacks.", type: "Street Food" },
  ],
  travelTips: [
    { category: "Transport", tip: "Get a multi-day transit pass for unlimited rides." },
    { category: "Culture", tip: "Learn a few basic phrases in the local language; locals appreciate it!" },
  ],
  recommendedPlaces: [
    { name: "Old Town Square", description: "Beautiful architecture and vibrant atmosphere.", type: "Attraction" },
  ]
});
