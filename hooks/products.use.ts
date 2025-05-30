import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";

export const useProducts = (page: number, search: string) => {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts(page, search),
  });
};
