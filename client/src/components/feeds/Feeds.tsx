import { useFeeds } from "@/hooks/usePost";
import { ApiLoading } from "../ApiLoading";
import { ImgUrl } from "@/util/imageUrl";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Send, Tag } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FeedActionModal } from "./FeedActionModal";

type TFeedsProps = {};

export const Feeds: React.FC<TFeedsProps> = ({}) => {
  dayjs.extend(relativeTime);
  const { isLoading, data: posts } = useFeeds();

  if (isLoading) {
    return <ApiLoading />;
  }
  return (
    <div className="flex flex-col gap-8">
      {posts?.length ? (
        posts.map((post: any) => (
          <div key={post._id} className="flex flex-col rounded-sm border">
            <header className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <img
                  src={`${ImgUrl}${post.user.imageurl}`}
                  alt="post images"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <Link
                  to={`/${post.user.username}`}
                  className="text-sm hover:underline"
                >
                  {post.user.username}
                </Link>
                .
                <span className="text-xs">
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </div>
              <FeedActionModal />
            </header>
            {post.type === "reel" ? (
              <video controls src={`${ImgUrl}${post.imageurl[0]}`} />
            ) : (
              <img
                src={`${ImgUrl}${post.imageurl[0]}`}
                alt="post images"
                className="w-full object-cover"
              />
            )}
            <div className="flex flex-col gap-2 px-2 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6" />
                  <MessageCircle className="h-6 w-6" />
                  <Send className="h-6 w-6" />
                </div>
                <Tag className="ml-auto h-6 w-6" />
              </div>
              <p className="text-sm">{post.likes.length} likes</p>
              <div className="flex items-center gap-1">
                <Link
                  to={`/${post.user.username}`}
                  className="text-sm font-semibold hover:underline"
                >
                  {post.user.username}
                </Link>
                <p className="text-sm">{post.caption}</p>
              </div>

              <Link
                to={
                  post.type === "post" ? `/p/${post._id}` : `/reel/${post._id}`
                }
                className="text-sm text-gray-400"
              >
                View All {post.comments.length} comments
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-2xl">
          Follow some user to watch feeds...
        </p>
      )}
    </div>
  );
};
