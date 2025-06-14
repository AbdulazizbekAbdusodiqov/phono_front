import { useQuery } from "@tanstack/react-query";
import {
  getCategory,
  getCategoryById,
  getColors,
  getCurrency,
} from "../endpoints/category";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
};

export const useCategoryById = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });
};

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
};

export const useCurrency = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: getCurrency,
  });
};
