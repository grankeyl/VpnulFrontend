import { useEffect } from "react";
import { useSubsStore } from "../store/subs.store";

export function useTelegramLifecycle() {
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        useSubsStore.getState().clearSubsData();
        localStorage.removeItem("subs_store_v1");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);
}