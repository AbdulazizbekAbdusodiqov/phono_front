// api/index.ts

import instance from "./instance";
import { toast } from "react-toastify";
import { AddressData } from "../types/userData";
import { Address, AddressRes, CreateProductProps } from "../types";

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
    const token = JSON.parse(localStorage.getItem("accessToken") || "")
    for (const key in addressData) {
      const value = addressData[key as keyof AddressData];
      if (value === null ) {
          delete addressData[key as keyof AddressData];        
      } else if (value === "") {
          if (key === 'name' || key === 'address') {
              (addressData as any)[key] = "test";
          }
      }
  }
  
  const address = await instance.post<AddressRes>("/address", addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  data.address_id = address?.data?.data?.id;
  const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    images.forEach((img) => {
      formData.append("images", img);
    });
    try{
    
      const res = await instance.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  }catch(error:any){
    console.log("Errorjon:",error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
    // console.log( "Product created successfully: ",res.data);
    
    // return res.data;
  } catch (error:any) {
    console.log("Errorjon:",error);
    toast.error(error.response?.data?.message || "Something went wrong");
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
    toast.error(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const res = await instance.get(`/product/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(error);
    toast.warning(error.response?.data?.message || "Something went wrong");
    throw error;
  }
};