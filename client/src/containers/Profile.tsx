import { Link, useParams } from "react-router-dom";
import { useProfile } from "@/hooks/useUser";
import { ApiLoading } from "@/components/ApiLoading";
import { ImgUrl } from "@/util/imageUrl";
import { buttonVariants } from "@/components/ui/button";
import {
  Camera,
  FileVideo2,
  Grid,
  Heart,
  ImageIcon,
  MessageCircle,
  Tag,
  Video,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { NoContent } from "@/components/NoContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingModal } from "@/components/setting/SettingModal";
import { cn } from "@/lib/utils";

type TProfileProps = {};

const Profile: React.FC<TProfileProps> = ({}) => {
  const params = useParams<{ username?: string }>();
  const auth = useAuth();
  const { isLoading, data: profile } = useProfile(params.username);
  const isAuthUserProfile = auth?.user.username === profile?.user.username;

  const posts = profile?.photos?.filter((photo: any) => photo.type === "post");
  const reels = profile?.photos?.filter((photo: any) => photo.type === "reel");

  if (isLoading) {
    return <ApiLoading />;
  }

  if (!profile) {
    return <NoContent title="No user found." />;
  }

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-wrap items-start justify-evenly gap-8">
        <img
          src={`${ImgUrl}${profile.user.imageurl}`}
          alt="profile image"
          className="h-40 w-40 rounded-full object-cover"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-8">
            <p className="text-xl font-medium">{profile.user.username}</p>
            <Link
              to="/account/edit"
              className={cn(
                buttonVariants({ size: "sm", className: "rounded-xl" }),
              )}
            >
              {isAuthUserProfile ? "Edit profile" : "Follow"}
            </Link>
            {isAuthUserProfile ? <SettingModal /> : null}
          </div>
          <div className="flex items-center justify-between gap-8">
            <span>{profile.photos.length} posts</span>
            <span>{profile.user.followers.length} followers</span>
            <span>{profile.user.following.length} following</span>
          </div>
          <p>{profile.user.name}</p>
          <p>{profile.user.bio}</p>
        </div>
      </div>
      <hr />
      <Tabs defaultValue="posts">
        <TabsList className="flex items-center justify-center gap-8">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid size={15} /> POSTS
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center gap-2">
            <Video size={15} /> REELS
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center gap-2">
            <Tag size={15} /> TAGGED
          </TabsTrigger>
        </TabsList>
        <div className="mt-8 border-t pt-4">
          <TabsContent value="posts">
            {posts.length ? (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post: any) => (
                  <Link
                    to={`/p/${post._id}`}
                    key={post._id}
                    className="group relative border"
                  >
                    <img
                      src={`${ImgUrl}${post.imageurl[0]}`}
                      alt="post images"
                      className="aspect-square object-cover"
                    />
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
                ))}
              </div>
            ) : isAuthUserProfile ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Camera className="h-8 w-8" />
                <h1 className="text-4xl font-black">Share Photos</h1>
                <p>When you share photos, they will appear on your profile.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Camera className="h-8 w-8" />
                <h1 className="text-4xl font-black">No Posts yet</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="reels">
            {reels.length ? (
              <div className="grid grid-cols-4 gap-1">
                {reels.map((reel: any) => (
                  <Link
                    to={`/reel/${reel._id}`}
                    key={reel._id}
                    className="group relative border"
                  >
                    <video
                      src={`${ImgUrl}${reel.imageurl[0]}`}
                      className="aspect-square object-cover"
                    />
                    <div className="absolute inset-0 hidden items-center justify-center gap-8 bg-black/50 text-white group-hover:flex">
                      <div className="flex items-center gap-1">
                        <Heart className="h-6 w-6" />
                        <span>{reel.likes.length}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-6 w-6" />
                        <span>{reel.comments.length}</span>
                      </div>
                    </div>
                    <div className="absolute right-1 top-1 flex items-center justify-center rounded-sm text-white">
                      {reel.type === "reel" ? <FileVideo2 /> : <ImageIcon />}
                    </div>
                  </Link>
                ))}
              </div>
            ) : isAuthUserProfile ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Camera className="h-8 w-8" />
                <h1 className="text-4xl font-black">Share Videos</h1>
                <p>When you share videos, they will appear on your profile.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Camera className="h-8 w-8" />
                <h1 className="text-4xl font-black">No Reels yet</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="tagged">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Camera className="h-8 w-8" />
              <h1 className="text-4xl font-black">Photos of you</h1>
              <p>When people tag you in photos, they'll appear here.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default Profile;
