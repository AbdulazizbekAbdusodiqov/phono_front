import { useQuery } from "@tanstack/react-query";
import { getColors } from "../api/colors";
import { getRegions } from "../api/region";

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
};
