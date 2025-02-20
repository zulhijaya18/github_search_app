import { GitHubRepository } from "@/domains/github-repository/github-repository";
import { GitHubUser } from "@/domains/github-user/github-user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user?: GitHubUser;
  items?: GitHubRepository[];
  repository?: GitHubRepository;
  page: number;
  perPage: number;
}

interface Action {
  setUser: (user: GitHubUser) => void;
  setItems: (items: GitHubRepository[]) => void;
  setRepository: (repository: GitHubRepository) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

export const useRepositoriesStore = create<State & Action>()(
  persist(
    (set) => ({
      user: undefined,
      items: undefined,
      repository: undefined,
      page: 1,
      perPage: 10,
      setUser: (user: GitHubUser) => set({ user }),
      setItems: (items: GitHubRepository[]) => set({ items }),
      setRepository: (repository: GitHubRepository) => set({ repository }),
      setPage: (page: number) => set({ page }),
      setPerPage: (perPage: number) => set({ perPage }),
    }),
    {
      name: "repositories-store",
      partialize: (state) => ({
        user: state.user,
        repository: state.repository,
        items: state.items,
      }),
    }
  )
);
