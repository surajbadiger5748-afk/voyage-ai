import { create } from 'zustand';
import { TripRequestType } from '@/lib/schemas';

interface TripStore {
  request: Partial<TripRequestType>;
  setRequest: (req: Partial<TripRequestType>) => void;
  updateField: <K extends keyof TripRequestType>(field: K, value: TripRequestType[K]) => void;
  reset: () => void;
}

export const useTripStore = create<TripStore>((set) => ({
  request: {
    budget: 'moderate',
    travelStyle: 'balanced',
    days: 3,
    interests: [],
  },
  setRequest: (req) => set({ request: req }),
  updateField: (field, value) => set((state) => ({ request: { ...state.request, [field]: value } })),
  reset: () => set({ request: { budget: 'moderate', travelStyle: 'balanced', days: 3, interests: [] } }),
}));
