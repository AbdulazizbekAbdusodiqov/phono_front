import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/category";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
};
