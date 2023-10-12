import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// React query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/users.service";
import localStore from "@/util/localStore";

export const useUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: userService.getAuthUserInfo,
    retry: 1,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: userService.logout,
    onSuccess: () => {
      toast.success("Logout Success");
      navigate("/login");
      localStore.deauthenticateUser();
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};
