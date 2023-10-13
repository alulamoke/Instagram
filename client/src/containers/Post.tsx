import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePost } from "@/hooks/usePost";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiLoading } from "@/components/ApiLoading";
import { FeedActionModal } from "@/components/feeds/FeedActionModal";
import { NoContent } from "@/components/NoContent";
import { ImgUrl } from "@/util/imageUrl";
import { Heart, MessageCircle, Send, Tag } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "@/services/posts.service";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/schemas/post-schema";
import toast from "react-hot-toast";
import { TCustomError } from "@/util/types";

type TPostProps = {};

const Post: React.FC<TPostProps> = ({}) => {
  dayjs.extend(relativeTime);

  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const { isLoading, data: post } = usePost(params.id);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
    },
  });

  const commentMutation = useMutation({
    mutationKey: ["commentPost"],
    mutationFn: postService.commentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", post.currentPost._id],
      });
      toast.success("Commented.");
      form.resetField("body");
    },
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof commentSchema>) =>
    commentMutation.mutate({ id: post?.currentPost?._id, data: values });

  if (isLoading) {
    return <ApiLoading />;
  }

  if (!post) {
    return <NoContent title="Sorry," subtitle="No reel found." />;
  }

  return (
    <Dialog defaultOpen onOpenChange={() => navigate(-1)}>
      <DialogContent className="grid h-full max-w-5xl grid-cols-1 overflow-y-auto lg:h-auto lg:grid-cols-2">
        <img
          src={`${ImgUrl}${post.currentPost.imageurl[0]}`}
          className="h-[35rem] w-full border object-contain lg:h-full"
        />
        <div className="flex flex-col gap-4 border">
          <header className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <img
                src={`${ImgUrl}${post.currentPost.user.imageurl}`}
                alt="user profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <Link
                to={`/${post.currentPost.user.username}`}
                className="text-sm hover:underline"
              >
                {post.currentPost.user.username}
              </Link>
              <Button variant="ghost">Follow</Button>
            </div>
            <FeedActionModal />
          </header>
          <ScrollArea className="max-h-[40rem] flex-1">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex items-center gap-2">
                <img
                  src={`${ImgUrl}${post.currentPost.user.imageurl}`}
                  alt="user profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <Link
                  to={`/${post.currentPost.user.username}`}
                  className="text-sm font-medium hover:underline"
                >
                  {post.currentPost.user.username}
                </Link>
                <p className="text-sm">{post.currentPost.caption}</p>
              </div>
              {post.currentPost.comments.length ? (
                post.currentPost.comments.map((comment: any) => (
                  <div key={comment._id} className="flex gap-2">
                    <img
                      src={`${ImgUrl}${comment.user.imageurl}`}
                      alt="user profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/${comment.user.username}`}
                          className="text-sm font-medium hover:underline"
                        >
                          {comment.user.username}
                        </Link>
                        <p className="text-sm">{comment.body}</p>
                      </div>
                      <p className="text-xs">
                        {dayjs(comment.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No comments yet.</p>
              )}
            </div>
          </ScrollArea>
          <div className="flex flex-col gap-2 border-t px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6" />
                <MessageCircle className="h-6 w-6" />
                <Send className="h-6 w-6" />
              </div>
              <Tag className="ml-auto h-6 w-6" />
            </div>
            <p className="text-sm font-medium">
              {post.currentPost.likes.length} likes
            </p>
            <p className="text-xs">
              {dayjs(post.currentPost.createdAt).fromNow()}
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full items-center justify-between"
            >
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="Add a comment..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                disabled={commentMutation.isLoading}
              >
                Post
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;
