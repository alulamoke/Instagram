import { apiV1 } from "../apiv1";

export default {
  createStory: async (data: any) => {
    const response = await apiV1().post(`/stories`, data);
    return response.data;
  },

  getUserFollowedStories: async () => {
    const response = await apiV1().get(`/stories`);
    return response.data;
  },

  getAllStoriesForUser: async (id: string) => {
    const response = await apiV1().get(`/stories/${id}`);
    return response.data;
  },
};
