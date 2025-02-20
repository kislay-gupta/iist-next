import { create } from "zustand";
import { Product } from "../types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  hydrateCart: () => void;
}

const saveCartToStorage = (
  state: Pick<CartStore, "items" | "totalItems" | "totalPrice">
) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const useCart = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  hydrateCart: () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        set(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  },

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product._id === product._id
      );
      let newState;

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        newState = {
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice,
        };
      } else {
        const newItems = [
          ...state.items,
          { product, quantity: product.min_qty },
        ];
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        newState = {
          items: newItems,
          totalItems: state.totalItems + product.min_qty,
          totalPrice,
        };
      }

      saveCartToStorage(newState);
      return newState;
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const item = state.items.find((item) => item.product._id === productId);
      let newState;

      if (!item || quantity < item.product.min_qty) {
        const updatedItems = state.items.filter(
          (item) => item.product._id !== productId
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        newState = {
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice,
        };
      } else {
        const updatedItems = state.items.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        newState = {
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice,
        };
      }

      saveCartToStorage(newState);
      return newState;
    }),

  removeItem: (productId) =>
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => item.product._id !== productId
      );
      const newState = {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      };

      saveCartToStorage(newState);
      return newState;
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    return set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
