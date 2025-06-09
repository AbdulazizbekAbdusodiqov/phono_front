import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductById, getProducts } from "../endpoints";

export const useProducts = (page: number, filters: Record<string, string> = {}) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: () => getProducts(page, filters),
    enabled: true,          // Har doim chaqiriladi
  });
};

export const useProductById = (id?: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) return Promise.reject("Invalid product id");
      return getProductById(id);
    },
    enabled: !!id, 
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
};