import { api } from "../client";

import Cookies from "js-cookie";

export async function create(
  sub_id: string,
) {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      "/payment/create",
      { 
        sub_id: sub_id,
      },
      { headers: { "X-Init-Data": initData } }
    );
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch {
    return false;
  }
}

export async function createStars(
  sub_id: string,
) {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      "/payment/stars/create",
      { 
        sub_id: sub_id,
      },
      { headers: { "X-Init-Data": initData } }
    );
    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch {
    return false;
  }
}

export async function createRSBalance(sub_id: string) {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      "/payment/rsbalance/create",
      { sub_id },
      { headers: { "X-Init-Data": initData } }
    );
    return response.data;
  } catch (e: any) {
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      ok: false,
      error: "unknown error",
    };
  }
}

export function subscribeToPayment(
  paymentId: string,
  onMessage: (data: any) => void,
  onError?: (e: Event) => void
) {
  const url = `${import.meta.env.VITE_APP_API_URL}/payment/${paymentId}/subscribe`;

  const es = new EventSource(url, { withCredentials: true });

  es.onopen = () => {
    console.log("✅ SSE connected");
  };

  es.onmessage = (event) => {
    console.log("📩 raw:", event.data);
    onMessage(JSON.parse(event.data));
  };

  es.onerror = (e) => {
    console.error("❌ SSE error", e);
    onError?.(e);
  };

  return es;
}