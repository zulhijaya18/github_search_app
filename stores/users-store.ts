import { GitHubUser } from "@/domains/github-user/github-user";
import { create } from "zustand";

interface State {
  totalCount: number;
  items?: GitHubUser[];
  page: number;
  perPage: number;
}

interface Action {
  setItems: (items: GitHubUser[]) => void;
  setTotalCount: (totalCount: number) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

export const useUsersStore = create<State & Action>((set) => ({
  totalCount: 0,
  items: undefined,
  page: 1,
  perPage: 10,
  setItems: (items: GitHubUser[]) => set({ items }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
  setPage: (page: number) => set({ page }),
  setPerPage: (perPage: number) => set({ perPage }),
}));
