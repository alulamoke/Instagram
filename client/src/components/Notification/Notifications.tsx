import { Heart } from "lucide-react";

import { Button } from "../ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type TNotificationsProps = {};

export const Notifications: React.FC<TNotificationsProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start"
        >
          <Heart className="h-6 w-6 shrink-0" />
          <p className="hidden text-lg lg:block">Notifications</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-8 flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle className="font-semibold">Notifications</SheetTitle>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};
