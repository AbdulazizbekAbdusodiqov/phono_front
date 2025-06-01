// hooks/products.use.ts

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";

export const useProducts = (page: number, filters: Record<string, string>) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: () => getProducts(page, filters),
    enabled: !!filters, // optional safeguard
  });
};
