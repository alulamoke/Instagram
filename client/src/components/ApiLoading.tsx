import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type TApiLoadingProps = {
  className?: string;
};

export const ApiLoading: React.FC<TApiLoadingProps> = ({ className }) => {
  return (
    <div className={cn("grid h-screen place-items-center", className)}>
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};
