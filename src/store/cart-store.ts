import { CartProduct } from "@/interfaces";
import { create } from "zustand";


interface State{
    cart: CartProduct[]
}

export const useCartStore = create<State>()(
    (set) => ({
        cart: []
    })
)