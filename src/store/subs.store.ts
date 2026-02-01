import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SubsState = {
  subsData: any | null;
  neverTookTheWheel: boolean;
  setSubsData: (subsData: any) => void;
  setNeverTookTheWheel: (neverTookTheWheel: boolean) => void;
  clearSubsData: () => void;
};

export const useSubsStore = create<SubsState>()(
  persist(
    (set) => ({
      subsData: null,
      neverTookTheWheel: false,
      setSubsData: (subsData) => set({ subsData }),
      setNeverTookTheWheel: (neverTookTheWheel) => set({ neverTookTheWheel }),
      clearSubsData: () => set({ subsData: null }),
    }),
    {
      name: "subs_store_v1",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);