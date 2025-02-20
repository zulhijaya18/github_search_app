import { GitHubUser } from "@/domains/github-user/github-user";
import { create } from "zustand";

interface State {
  totalCount: number;
  items?: GitHubUser[];
  page: number;
  search: string;
}

interface Action {
  setItems: (items?: GitHubUser[]) => void;
  setTotalCount: (totalCount: number) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

export const useUsersStore = create<State & Action>((set) => ({
  totalCount: 0,
  items: undefined,
  page: 1,
  search: "",
  setItems: (items?: GitHubUser[]) => set({ items }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
  setPage: (page: number) => set({ page }),
  setSearch: (search: string) => set({ search }),
  reset: () =>
    set({
      totalCount: 0,
      items: undefined,
      page: 1,
    }),
}));
