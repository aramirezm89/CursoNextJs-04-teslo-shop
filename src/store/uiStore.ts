import { create } from "zustand";

interface InitialState {
  openClose : boolean;
  toogleSidebar: () => void;
 
}

export const useUiStore = create<InitialState>((set) => ({
  openClose: false,
 toogleSidebar: () =>
  set((state : InitialState) =>({openClose: !state.openClose})),
 
 
}));