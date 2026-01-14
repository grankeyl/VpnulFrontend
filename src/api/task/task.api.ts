import { api } from "../client";

import Cookies from "js-cookie";

export async function task() {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.get(
      "/task",
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

export async function claim(
  id: string,
) {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      `/task/${id}/claim`,
      { },
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

export async function start(
  id: string,
) {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      `/task/${id}/start`,
      { },
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