import { create } from "zustand";
import type { BlogPost } from "@/data/blogData";

type BlogStore = {
    blogPosts: BlogPost[];
    setBlogPosts: (data: BlogPost[]) => void;
};

export const useBlogStore = create<BlogStore>((set) => ({
    blogPosts: [],
    setBlogPosts: (data: BlogPost[]) => set({ blogPosts: data }),
}));
