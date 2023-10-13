import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const accontLinks = [
  {
    title: "Edit profile",
    url: "/account/edit",
  },
  {
    title: "Language preferences",
    url: "/account/language",
  },
  {
    title: "Apps and websites",
    url: "/account/manage_access",
  },
  {
    title: "Email notifications",
    url: "/account/emails",
  },
  {
    title: "What you see",
    url: "/account/what_you_see",
  },
  {
    title: "Who can see your content",
    url: "/account/who_can_see_your_content",
  },
  {
    title: "Help",
    url: "/account/help",
  },
  {
    title: "Subscriptions",
    url: "/account/subscriptions",
  },
  {
    title: "Switch to professional account",
    url: "/account/convert_to_professional_account",
  },
];

type TSettingListProps = {
  className?: string;
};

export const SettingList: React.FC<TSettingListProps> = ({ className }) => {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <header className="text-xl font-semibold">Settings</header>
      <div className="flex flex-col gap-1">
        {accontLinks.map((link) => (
          <NavLink
            key={link.url}
            to={link.url}
            className={({ isActive }) =>
              cn(
                isActive ? "bg-accent" : "",
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start rounded-lg py-6",
                }),
              )
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </section>
  );
};
