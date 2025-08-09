import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],

  //methods
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    //1. check if cart contains a product with the same size selected

    const productInCart = cart.some(
      (item) => item.size === product.size && item.id === product.id
    );

    // insert product if productInCart is false
    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    //2. I know the product exist with size... I have to increment it

    const updatedCartProducts = cart.map((item) => {
      if (item.size === product.size && item.id === product.id) {
        return {
          ...item,
          quantity:  item.quantity + product.quantity,
        };
      }
      return item;
    });

    set({ cart: updatedCartProducts });
  },
}));
