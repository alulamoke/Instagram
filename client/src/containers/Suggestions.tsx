import { ApiLoading } from "@/components/ApiLoading";
import { SuggestedUser } from "@/components/suggestions/SuggestedUser";
import { useSuggestions } from "@/hooks/useSuggestions";

type TSuggestionsProps = {};

const Suggestions: React.FC<TSuggestionsProps> = ({}) => {
  const { isLoading, data: users } = useSuggestions();

  console.log(users);

  if (isLoading) {
    return <ApiLoading />;
  }
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <header className="text-2xl font-medium">Suggested</header>
      <div className="flex flex-col gap-2">
        {users.length ? (
          users.map((user: any) => <SuggestedUser key={user._id} {...user} />)
        ) : (
          <p>No suggested user</p>
        )}
      </div>
    </div>
  );
};
export default Suggestions;
