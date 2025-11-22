import { create } from 'zustand';

interface Crop {
  id: string;
  name: string;
  profit: number;
  cost: number;
  yield: number;
  water: number;
  risk: 'Low' | 'Medium' | 'High';
  soilTypes: string[];
  seasonality: string[];
}

interface Farmer {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  landSizeHectares: number;
  soilType: string;
}

interface AppState {
  // Farmer
  farmer: Farmer | null;
  setFarmer: (farmer: Farmer) => void;
  clearFarmer: () => void;

  // Crops
  crops: Crop[];
  setCrops: (crops: Crop[]) => void;
  addCrop: (crop: Crop) => void;

  // UI
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Auth
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;

  // Language
  language: 'en' | 'ka' | 'hi';
  setLanguage: (lang: 'en' | 'ka' | 'hi') => void;
}

export const useAppStore = create<AppState>((set) => ({
  farmer: null,
  setFarmer: (farmer) => set({ farmer }),
  clearFarmer: () => set({ farmer: null }),

  crops: [],
  setCrops: (crops) => set({ crops }),
  addCrop: (crop) => set((state) => ({ crops: [...state.crops, crop] })),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),

  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),

  language: 'en',
  setLanguage: (language) => set({ language }),
}));
