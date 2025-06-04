import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../endpoints";

export const useProducts = (page: number, filters: Record<string, string>) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: () => getProducts(page, filters),
    enabled: !!filters, 
  });
};
