// React query
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/users.service";

export const useSuggestions = () => {
  return useQuery({
    queryKey: ["suggestions"],
    queryFn: userService.getSuggestedUsers,
  });
};
