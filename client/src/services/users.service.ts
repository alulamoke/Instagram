import { z } from "zod";
import { loginSchema, signupSchema } from "@/schemas/auth-schema";

import { apiV1 } from "../apiv1";

export default {
  signup: async (data: z.infer<typeof signupSchema>) => {
    const response = await apiV1().post(`/users/signup`, data);
    return response.data;
  },

  login: async (data: z.infer<typeof loginSchema>) => {
    const response = await apiV1().post(`/users/login`, data);
    return response.data;
  },

  getAuthUserInfo: async () => {
    const response = await apiV1().get(`/users/me`);
    return response.data;
  },

  editUserPhoto: async (data: any) => {
    const response = await apiV1().patch(`/users/photo`, data);
    return response.data;
  },

  getUserProfileInfo: async (username?: string) => {
    const response = await apiV1().get(`/users/${username}`);
    return response.data;
  },

  getSearchedUsers: async (query: string) => {
    const response = await apiV1().get(`/users`, {
      params: {
        q: query,
      },
    });
    return response.data;
  },

  followUser: async (id: string) => {
    const response = await apiV1().patch(`/users/f/${id}`);
    return response.data;
  },

  getSuggestedUsers: async () => {
    const response = await apiV1().get(`/users/suggested`);
    return response.data;
  },

  editAuthUserInfo: async (data: any) => {
    const response = await apiV1().patch(`/users/me`, data);
    return response.data;
  },

  logout: async () => {
    const response = await apiV1().post(`/users/logoutAll`);
    return response.data;
  },

  logoutInAllDevices: async () => {
    const response = await apiV1().post(`/users/logoutAll`);
    return response.data;
  },
};
