import { ApiLoading } from "@/components/ApiLoading";
import { useExplore } from "@/hooks/usePost";
import { ImgUrl } from "@/util/imageUrl";
import { FileVideo2, Heart, ImageIcon, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

type TExploreProps = {};

const Explore: React.FC<TExploreProps> = ({}) => {
  const { isLoading, data: posts } = useExplore();

  if (isLoading) {
    return <ApiLoading />;
  }
  return (
    <div className="post-album">
      {posts.length ? (
        posts.map((post: any) => (
          <Link
            to={post.type === "reel" ? `/reel/${post._id}` : `/p/${post._id}`}
            key={post._id}
            className="group relative border"
          >
            {post.type === "reel" ? (
              <video
                src={`${ImgUrl}${post.imageurl[0]}`}
                className="aspect-square object-cover"
              />
            ) : (
              <img
                src={`${ImgUrl}${post.imageurl[0]}`}
                alt="post image"
                className="aspect-square object-cover"
              />
            )}
            <div className="absolute inset-0 hidden items-center justify-center gap-8 bg-black/50 text-white group-hover:flex">
              <div className="flex items-center gap-1">
                <Heart className="h-6 w-6" />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-6 w-6" />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className="absolute right-1 top-1 flex items-center justify-center rounded-sm text-white">
              {post.type === "reel" ? <FileVideo2 /> : <ImageIcon />}
            </div>
          </Link>
        ))
      ) : (
        <p>No posts to explore.</p>
      )}
    </div>
  );
};

export default Explore;
