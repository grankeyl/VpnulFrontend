import { api } from "../client";

import Cookies from "js-cookie";

export async function init(initData: string) {
  try {
    const response = await api.post(
      "/init",
      {},
      { headers: { "X-Init-Data": initData } }
    );

    if (response.status === 200) {
      Cookies.set("init-data", initData);
      return response.data;
    }
    return false;
  } catch {
    return false;
  }
}