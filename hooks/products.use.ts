import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";

export const useProducts = (page: number) => {
  return useQuery({
    queryKey: ["products", page], // include page in queryKey!
    queryFn: () => getProducts(page),
  });
};
