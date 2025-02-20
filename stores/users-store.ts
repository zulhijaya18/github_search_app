import { GitHubUser } from "@/domains/github-user/github-user";
import { create } from "zustand";

interface State {
  isFetching: boolean;
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
  setIsFetching: (isFetching: boolean) => void;
  reset: () => void;
}

export const useUsersStore = create<State & Action>((set) => ({
  isFetching: false,
  totalCount: 0,
  items: undefined,
  page: 1,
  perPage: 10,
  setIsFetching: (isFetching: boolean) => set({ isFetching }),
  setItems: (items: GitHubUser[]) => set({ items }),
  setTotalCount: (totalCount: number) => set({ totalCount }),
  setPage: (page: number) => set({ page }),
  setPerPage: (perPage: number) => set({ perPage }),
  reset: () =>
    set({
      isFetching: false,
      totalCount: 0,
      items: undefined,
      page: 1,
      perPage: 10,
    }),
}));
