import { apiV1 } from "../apiv1";

export default {
  createPost: async (data: any) => {
    const response = await apiV1().post(`/posts`, data);
    return response.data;
  },

  AddPostPhoto: async (id: string) => {
    const response = await apiV1().patch(`/posts/${id}`);
    return response.data;
  },

  getExplores: async () => {
    const response = await apiV1().get(`/posts/explore`);
    return response.data;
  },

  getUserFollowingPosts: async () => {
    const response = await apiV1().get(`/posts`);
    return response.data;
  },

  getOnePost: async (id: string) => {
    const response = await apiV1().get(`/posts/p/${id}`);
    return response.data;
  },

  likePost: async (id: string) => {
    const response = await apiV1().patch(`/posts/like/${id}`);
    return response.data;
  },

  reportPost: async (id: string) => {
    const response = await apiV1().patch(`/posts/report/${id}`);
    return response.data;
  },

  commentPost: async (id: string, data: any) => {
    const response = await apiV1().patch(`/posts/c/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string) => {
    const response = await apiV1().delete(`/posts/${id}`);
    return response.data;
  },
};
