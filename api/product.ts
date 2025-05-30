import instance from "./instance";

import { CreateProductProps } from "../types";

export const createProduct = async ({ data, images }: { data: CreateProductProps, images: File[] }) => {
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
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
    });

  } catch (error) {
    console.log(error);
  }
}

