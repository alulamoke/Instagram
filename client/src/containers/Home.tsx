import { SuggestedUser } from "@/components/suggestions/SuggestedUser";
import { Button } from "@/components/ui/button";
import { useSuggestions } from "@/hooks/useSuggestions";
import { useAuth } from "@/providers/auth-provider";
import { ImgUrl } from "@/util/imageUrl";
import { Link } from "react-router-dom";

type THomeProps = {};

const Home: React.FC<THomeProps> = ({}) => {
  const auth = useAuth();
  const suggestions = useSuggestions();
  const currentUser = auth?.user;

  return (
    <main className="mx-auto h-full max-w-screen-lg px-4 py-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-8">
          <section className="text-3xl">Stories</section>
          <section>Feeds</section>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
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
              <Button
                variant="link"
                className="text-xs font-medium text-inherit"
              >
                See All
              </Button>
            </div>
            {suggestions.isLoading ? (
              <p>Loading...</p>
            ) : suggestions.data.length > 0 ? (
              suggestions.data.map((suggestion: any) => (
                <SuggestedUser
                  id={suggestion._id}
                  imageUrl={suggestion.imageurl}
                  username={suggestion.username}
                />
              ))
            ) : (
              <p className="text-center">No suggested user</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
