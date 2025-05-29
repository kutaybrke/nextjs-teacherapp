// stores/useHomeStore.ts

import { create } from "zustand";
import type { HomeContent } from "@/data/homeContent";

type HomeStore = {
  homeContent: HomeContent;
  setHomeContent: (data: HomeContent) => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  homeContent: {
    welcomeMessage: "",
    bio: "",
    featuredSubjects: [],
    testimonials: [],
  },
  setHomeContent: (data) => set({ homeContent: data }),
}));

export default useHomeStore;
