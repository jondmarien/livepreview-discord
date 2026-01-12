import { create } from "zustand";
import { GlobalState } from "../types";

export const useGlobalState = create<GlobalState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));
