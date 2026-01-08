import { create } from "zustand";
import { persist } from "zustand/middleware";

type SubsState = {
  subsData: any | null;
  setSubsData: (subsData: any) => void;
  clearSubsData: () => void;
};

export const useSubsStore = create<SubsState>()(
  persist(
    (set) => ({
      subsData: null,
      setSubsData: (subsData) => set({ subsData }),
      clearSubsData: () => set({ subsData: null }),
    }),
    { name: "subs_store_v1" }
  )
);