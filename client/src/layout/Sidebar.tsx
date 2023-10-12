import { useLogout } from "@/hooks/useUser";

import { Logo } from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Compass,
  FileVideo2,
  Heart,
  Home,
  Instagram,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  PlusSquare,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/themeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";
import { CreatePostModal } from "@/components/modals/CreatePostModal";

type TSidebarProps = {};

const sidebaritems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Compass,
  },
  {
    title: "Reels",
    url: "/reel",
    icon: FileVideo2,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Heart,
  },
];

export const Sidebar: React.FC<TSidebarProps> = ({}) => {
  const { theme } = useTheme();
  const logout = useLogout();

  return (
    <div className="flex h-screen flex-col justify-between gap-4 border-r px-4 py-10">
      <div className="flex flex-col gap-8">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <Instagram className="h-6 w-6" />
        </div>
        <ul className="flex flex-col gap-6">
          {sidebaritems.map((item) => (
            <>
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "hidden hover:font-semibold hover:text-inherit lg:block",
                    isActive ? "font-semibold" : "font-normal",
                  )
                }
              >
                <li className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 shrink-0" />
                  <p className="text-lg">{item.title}</p>
                </li>
              </NavLink>
              <NavLink
                to={item.url}
                className="flex items-center justify-center lg:hidden"
              >
                <li className={cn(buttonVariants({ variant: "ghost" }))}>
                  <item.icon className="h-6 w-6" />
                </li>
              </NavLink>
            </>
          ))}
          <CreatePostModal />
        </ul>
      </div>
      <div className="space-y-4">
        {/* <ThemeToggle />
        <Button onClick={() => logout.mutate()} className="w-full">
          Logout
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-4"
            >
              <Menu className="h-6 w-6" />
              <p className="text-lg">More</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Link
                to="/setting"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "flex items-center gap-2",
                  }),
                )}
              >
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ThemeToggle>
                <Button variant="ghost" className="flex items-center gap-2">
                  {theme === "light" ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                  )}
                  <span>Switch apprearance</span>
                </Button>
              </ThemeToggle>
            </DropdownMenuItem>
            <hr />
            <DropdownMenuItem>
              <Button variant="ghost" onClick={() => logout.mutate()}>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
