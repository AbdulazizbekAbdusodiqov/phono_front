import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../api/brand";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
};
