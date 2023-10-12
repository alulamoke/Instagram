import { Link } from "react-router-dom";

import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

import InstagramWhiteLogo from "@/assets/white-logo.png";
import InstagramDarkLogo from "@/assets/dark-logo.png";

type TLogoProps = {
  className?: string;
};

export const Logo: React.FC<TLogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <Link to="/" className="flex items-center justify-center">
      <img
        src={theme === "light" ? InstagramWhiteLogo : InstagramDarkLogo}
        alt="instagram logo"
        className={cn("h-8 w-auto shrink-0", className)}
      />
    </Link>
  );
};
