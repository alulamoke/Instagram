import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type TApiLoadingProps = {
  className?: string;
};

export const ApiLoading: React.FC<TApiLoadingProps> = ({ className }) => {
  return (
    <div className="grid h-screen place-items-center">
      <Loader2 className={cn("grid h-12 w-12 animate-spin", className)} />
    </div>
  );
};
