import { create } from "zustand";

interface CartStore {
  state: boolean;
  toggleState: (state: boolean) => void;
}

export const useRefreshCart = create<CartStore>((set) => ({
  state: false,
  toggleState: (state) => set(() => ({ state: !state })),
}));
