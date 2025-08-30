import { CartProduct, Size } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  deleteProductToCart: (id: string, size: Size) => void;
  getTotalItems: () => number;
  updateProductQuantity: (id: string, size: Size, quantity: number) => void;
  getOrderSummary: () => {
    subtotal: number;
    tax: number;
    total: number;
    totalItems: number;
  };
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
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
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      deleteProductToCart: (id: string, size: Size) => {
        const { cart } = get();

        const productsInCart = cart.filter(
          (p) => (p.id !== id || p.size !== size)
        );

        set({ cart: productsInCart });
      },

      getTotalItems: () => {
        const { cart } = get();
        const totalItem = cart.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);

        return totalItem;
      },

      updateProductQuantity: (id: string, size: Size, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((p) => {
          if (p.id === id && p.size === size) {
            return{...p, quantity:quantity}
          }
          return p;
        });

        set({
          cart: updatedCart,
        });
      },

      getOrderSummary: () =>{
        const subtotal = get().cart.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);

        const tax = subtotal * 0.15;
        const total = subtotal + tax;

        const totalItems = get().getTotalItems();

        return { subtotal, tax, total, totalItems };
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    { name: "shooping-cart" }
  )
);
