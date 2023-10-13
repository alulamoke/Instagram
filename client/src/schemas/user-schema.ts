import { z } from "zod";

export const updateUserInfoSchema = z.object({
  website: z.string().optional(),
  bio: z.string().optional(),
  gender: z.string().optional(),
});
