import instance from "./instance";

import { CreateProductProps } from "../types";
import { toast } from "react-toastify";

export const createProduct = async ({
  data,
  images,
}: {
  data: CreateProductProps;
  images: File[];
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

export const getProducts = async (page = 1) => {
  try {
    const res = await instance.get(`/product?page=${page}`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    toast.error(`${error.response.data.message}`);
  }
};
