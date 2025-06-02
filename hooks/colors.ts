import { useQuery } from "@tanstack/react-query";
import { getColors } from "../api/colors";

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
};
