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

export async function settings() {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.get(
      "/subs/settings",
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

export async function trial() {
  try {
    const initData = Cookies.get("init-data") || "";
    const response = await api.post(
      "/subs/trial/activate",
      { },
      { headers: { "X-Init-Data": initData } }
    );
    if (response.status === 200) {
      return response.data;
    }
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