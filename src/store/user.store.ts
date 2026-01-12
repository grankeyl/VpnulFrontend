import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = Record<string, any>;

type UserState = {
  userData: User | null;
  userDataMeta: Record<string, any> | null;
  subscriptionData: Record<string, any> | null;
  setUserData: (user: User | null) => void;
  setUserDataMeta: (user: User | null) => void;
  setSubscriptionData: (user: Record<string, any> | null) => void;
  clearUserData: () => void;
  clearUserDataMeta: () => void;
  clearSubscriptionData: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      userDataMeta: null,
      subscriptionData: null,
      setUserData: (user) => set({ userData: user }),
      setUserDataMeta: (user) => set({ userDataMeta: user }),
      setSubscriptionData: (user) => set({ subscriptionData: user }),
      clearUserData: () => set({ userData: null }),
      clearUserDataMeta: () => set({ userDataMeta: null }),
      clearSubscriptionData: () => set({ subscriptionData: null }),
    }),
    { name: "user_store_v1" }
  )
);