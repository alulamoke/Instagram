import { NavLink } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/themeToggle";

type TNavbarProps = {};

export const Navbar: React.FC<TNavbarProps> = ({}) => {
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm dark:bg-background">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 p-4">
        <Logo />
        <div className="flex items-center gap-2">
          {["login", "signup"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                cn(
                  buttonVariants({
                    variant: isActive ? "default" : "ghost",
                    size: "sm",
                    className: "capitalize",
                  }),
                )
              }
            >
              {item}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
