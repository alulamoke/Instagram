// React query
import { useQuery } from "@tanstack/react-query";
import postService from "@/services/posts.service";

export const useFeeds = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postService.getUserFollowingPosts,
  });
};

export const usePost = (id?: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getOnePost(id),
  });
};

export const useExplore = () => {
  return useQuery({
    queryKey: ["explore"],
    queryFn: postService.getExplores,
  });
};
