import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductById, getProducts } from "../endpoints";

export const useProducts = (page: number, filters: Record<string, string>) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: () => getProducts(page, filters),
    enabled: !!filters, 
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
};