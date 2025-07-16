import { create } from "zustand";

interface InitialState {
  bears: number;
  spiders: string;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<InitialState>((set) => ({
  bears: 10,
  spiders: "",
  increasePopulation: () =>
    set((state: InitialState) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));