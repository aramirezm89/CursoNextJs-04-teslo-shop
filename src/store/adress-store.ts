import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
 address:{
    name: string,
    lastName: string,
    address: string,
    address2?: string,
    zip: string,
    city: string,
    country: string,
    phone: string,
  
 }
  setAddress: (address: State['address']) => void,
}
export const useAdressStore = create<State>()(
  persist((set,get) => ({
  address:{
    name: "",
    lastName: "",
    address: "",
    address2: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  },

    setAddress: (address) => set({ address }),

  }), {
    
    name: "adress-store",
  })
);
