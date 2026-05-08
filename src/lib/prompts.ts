import { TripRequestType } from "./schemas";

export function generateItineraryPrompt(request: TripRequestType): string {
  const { destination, days, budget, travelStyle, interests, constraints } = request;
  
  return `
You are a highly capable AI travel assistant. Generate a structured travel itinerary for ${destination} spanning ${days} days.

CRITICAL INSTRUCTIONS:
1. You MUST respond with ONLY valid, raw JSON. 
2. Do NOT use markdown formatting (no \`\`\`json blocks).
3. Do NOT include any explanations or conversational text before or after the JSON.
4. The output must strictly conform to the expected JSON shape below.

TRIP PARAMETERS:
- Destination: ${destination}
- Duration: ${days} days
- Budget Level: ${budget} (Realistic estimation required)
- Travel Style: ${travelStyle}
- Interests: ${interests.length > 0 ? interests.join(", ") : "General sightseeing and local experiences"}
- Special Constraints: ${constraints || "None"}

EXPECTED JSON SHAPE:
{
  "summary": "Engaging 2-3 sentence overview of the trip emphasizing realistic highlights.",
  "budgetBreakdown": {
    "accommodation": number (Total estimated cost in USD based on budget level),
    "food": number (Total estimated cost in USD),
    "transport": number (Total estimated cost in USD),
    "activities": number (Total estimated cost in USD),
    "miscellaneous": number (Total estimated cost in USD)
  },
  "dailyPlan": [
    {
      "day": number (1 to ${days}),
      "title": "Engaging theme for the day",
      "activities": [
        {
          "time": "e.g., 09:00 AM",
          "title": "Realistic Activity Name",
          "description": "Brief, compelling description.",
          "location": "Specific place or neighborhood"
        }
      ],
      "estimatedCost": number (Daily total cost in USD)
    }
  ],
  "packingChecklist": [
    {
      "item": "Item name",
      "category": "Clothing, Documents, Electronics, or Toiletries"
    }
  ],
  "foodRecommendations": [
    {
      "name": "Restaurant or Food Type",
      "description": "Why they should eat here.",
      "type": "Fine Dining, Street Food, Cafe, or Casual"
    }
  ],
  "travelTips": [
    {
      "category": "Transport, Safety, Culture, or Logistics",
      "tip": "Actionable, realistic advice."
    }
  ],
  "recommendedPlaces": [
    {
      "name": "Specific Attraction/Area",
      "description": "Why it's worth visiting.",
      "type": "Attraction, Viewpoint, Neighborhood, etc."
    }
  ]
}

Ensure the activities are geographically logical (minimize transit time between activities on the same day). Ensure budget estimates are realistic for ${destination} at a '${budget}' level.
`.trim();
}
