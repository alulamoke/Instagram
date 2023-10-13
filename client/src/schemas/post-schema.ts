import { z } from "zod";

export const postSchema = z.object({
  type: z.string().min(1, {
    message: "Required.",
  }),
  caption: z.string().min(3, {
    message: "caption must be at least 3 characters.",
  }),
});

export const commentSchema = z.object({
  body: z.string().min(1, {
    message: "Required.",
  }),
});
