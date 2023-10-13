import { Feeds } from "@/components/feeds/Feeds";
import { SuggestedUser } from "@/components/suggestions/SuggestedUser";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSuggestions } from "@/hooks/useSuggestions";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { ImgUrl } from "@/util/imageUrl";
import { Link } from "react-router-dom";

type THomeProps = {};

const Home: React.FC<THomeProps> = ({}) => {
  const auth = useAuth();
  const suggestions = useSuggestions();
  const currentUser = auth?.user;

  return (
    <main className="grid grid-cols-1 gap-24 xl:grid-cols-3">
      <div className="col-span-3 flex flex-col gap-8 xl:col-span-2">
        <section className="text-3xl">Stories</section>
        <div className="mx-auto max-w-[30rem]">
          <Feeds />
        </div>
      </div>
      <div className="col-span-1 hidden flex-col gap-4 xl:flex">
        <section className="flex items-center gap-2">
          <img
            src={`${ImgUrl}${currentUser.imageurl}`}
            alt="user image"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <Link
              to={`/${currentUser.username}`}
              className="text-sm hover:underline"
            >
              {currentUser.username}
            </Link>
            <p className="text-sm">{currentUser.name}</p>
          </div>
          <Button variant="ghost" className="ml-auto">
            Switch
          </Button>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-sm">Suggested for you</h1>
            <Link
              to="/explore/people"
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-xs font-medium text-inherit",
                }),
              )}
            >
              See All
            </Link>
          </div>
          {suggestions.isLoading ? (
            <p>Loading...</p>
          ) : suggestions.data.length > 0 ? (
            suggestions.data.map((suggestion: any) => (
              <SuggestedUser key={suggestion._id} {...suggestion} />
            ))
          ) : (
            <p className="text-center">No suggested user</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
