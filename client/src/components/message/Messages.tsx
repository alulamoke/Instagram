import { MessageCircle } from "lucide-react";

import { Button } from "../ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type TMessagesProps = {};

export const Messages: React.FC<TMessagesProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start"
        >
          <MessageCircle className="h-6 w-6 shrink-0" />
          <p className="hidden text-lg lg:block">Messages</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-8 flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle className="font-semibold">Messages</SheetTitle>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};
