import { api } from "../client";

import Cookies from "js-cookie";

export async function subs() {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.get(
      "/subs",
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