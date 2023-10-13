import { ImgUrl } from "@/util/imageUrl";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type TSuggestedUserProps = {
  id: string;
  imageurl: string;
  username: string;
};

export const SuggestedUser: React.FC<TSuggestedUserProps> = ({
  id,
  imageurl,
  username,
}) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`${ImgUrl}${imageurl}`}
        alt="user image"
        className="h-14 w-14 rounded-full object-cover"
      />
      <Link to={`/${username}`} className="text-sm hover:underline">
        {username}
      </Link>
      <Button className="ml-auto rounded-xl" size="sm">
        Follow
      </Button>
    </div>
  );
};
