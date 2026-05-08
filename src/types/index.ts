export interface TripRequest {
  destination: string;
  days: number;
  budget: 'budget' | 'moderate' | 'luxury';
  travelStyle: 'relaxed' | 'balanced' | 'action-packed';
  interests: string[];
  constraints?: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface DailyPlan {
  day: number;
  title: string;
  activities: Activity[];
  estimatedCost: number;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
}

export interface PlaceRecommendation {
  name: string;
  description: string;
  type: string;
}

export interface PackingItem {
  item: string;
  category: string;
}

export interface TravelTip {
  category: string;
  tip: string;
}

export interface TripResponse {
  summary: string;
  budgetBreakdown: BudgetBreakdown;
  dailyPlan: DailyPlan[];
  packingChecklist: PackingItem[];
  foodRecommendations: PlaceRecommendation[];
  travelTips: TravelTip[];
  recommendedPlaces: PlaceRecommendation[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}
