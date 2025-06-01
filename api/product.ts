// api/index.ts

import instance from "./instance";
import { toast } from "react-toastify";

export const getProducts = async (
  page = 1,
  filters: Record<string, string> = {}
) => {
  try {
    const res = await instance.get(`/product`, {
      params: {
        page,
        ...filters,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.error(`${error.response?.data?.message || "Something went wrong"}`);
  }
};
