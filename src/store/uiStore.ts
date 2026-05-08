import { create } from 'zustand';

interface UiStore {
  isGenerating: boolean;
  error: string | null;
  setIsGenerating: (isGenerating: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isGenerating: false,
  error: null,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setError: (error) => set({ error }),
}));
