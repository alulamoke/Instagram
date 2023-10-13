import { Link, NavLink } from "react-router-dom";
import { useLogout } from "@/hooks/useUser";
import { useAuth } from "@/providers/auth-provider";
import { useTheme } from "@/providers/theme-provider";

import {
  Compass,
  FileVideo2,
  Home,
  Instagram,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import { ThemeToggle } from "@/components/themeToggle";
import { Logo } from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreatePostModal } from "@/components/create/CreatePostModal";
import { Search } from "@/components/search/Search";
import { Messages } from "@/components/message/Messages";
import { Notifications } from "@/components/Notification/Notifications";
import { cn } from "@/lib/utils";
import { ImgUrl } from "@/util/imageUrl";

type TSidebarProps = {};

export const Sidebar: React.FC<TSidebarProps> = ({}) => {
  const auth = useAuth();
  const { theme } = useTheme();
  const logout = useLogout();

  return (
    <div className="flex h-screen flex-col justify-between gap-4 border-r p-4 pt-10">
      <div className="flex flex-col gap-8">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <Link to="/" className="flex items-center justify-center lg:hidden">
          <Instagram className="h-6 w-6" />
        </Link>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                isActive ? "bg-accent" : "",
                buttonVariants({
                  variant: "ghost",
                  className:
                    "flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start",
                }),
              )
            }
          >
            <Home className="h-6 w-6 shrink-0" />
            <p className="hidden text-lg lg:block">Home</p>
          </NavLink>
          <Search />
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              cn(
                isActive ? "bg-accent" : "",
                buttonVariants({
                  variant: "ghost",
                  className:
                    "flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start",
                }),
              )
            }
          >
            <Compass className="h-6 w-6 shrink-0" />
            <p className="hidden text-lg lg:block">Explore</p>
          </NavLink>
          <NavLink
            to="/reels"
            className={({ isActive }) =>
              cn(
                isActive ? "bg-accent" : "",
                buttonVariants({
                  variant: "ghost",
                  className:
                    "flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start",
                }),
              )
            }
          >
            <FileVideo2 className="h-6 w-6 shrink-0" />
            <p className="hidden text-lg lg:block">Reels</p>
          </NavLink>
          <Messages />
          <Notifications />
          <CreatePostModal />
          <NavLink
            to={`/${auth?.user.username}`}
            className={({ isActive }) =>
              cn(
                isActive ? "bg-accent" : "",
                buttonVariants({
                  variant: "ghost",
                  className:
                    "flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start",
                }),
              )
            }
          >
            <img
              src={`${ImgUrl}${auth?.user.imageurl}`}
              alt="profile image"
              className="h-6 w-6 shrink-0 rounded-full"
            />
            <p className="hidden text-lg lg:block">Profile</p>
          </NavLink>
        </div>
      </div>
      <div className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center gap-4 lg:justify-start"
            >
              <Menu className="h-6 w-6" />
              <p className="hidden text-lg lg:block">More</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <Link
                to="/account/edit"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "flex w-full items-center justify-start gap-2",
                  }),
                )}
              >
                <Settings className="h-[1.2rem] w-[1.2rem]" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ThemeToggle>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2"
                >
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
              <Button
                variant="ghost"
                onClick={() => logout.mutate()}
                className="w-full justify-start"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
