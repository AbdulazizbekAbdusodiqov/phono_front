// api/index.ts

import instance from "./instance";
import { toast } from "react-toastify";
import { AddressData } from "../types/userData";
import { CreateProductProps } from "../types";

export const createProduct = async ({
  data,
  images,
  addressData
}: {
  data: CreateProductProps;
  images: File[];
  addressData: AddressData;
}) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    await instance.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

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
