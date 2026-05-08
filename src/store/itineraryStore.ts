import { create } from 'zustand';
import { TripResponse } from '@/types';

interface ItineraryStore {
  itinerary: TripResponse | null;
  setItinerary: (itinerary: TripResponse | null) => void;
  clear: () => void;
}

export const useItineraryStore = create<ItineraryStore>((set) => ({
  itinerary: null,
  setItinerary: (itinerary) => set({ itinerary }),
  clear: () => set({ itinerary: null }),
}));
