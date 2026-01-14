import { api } from "../client";

import Cookies from "js-cookie";

export async function history() {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.get(
      "/users/rsbalance/history",
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