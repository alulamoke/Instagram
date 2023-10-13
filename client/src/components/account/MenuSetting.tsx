import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SettingList } from "./SettingList";

type TMenuSettingProps = {};

export const MenuSetting: React.FC<TMenuSettingProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="block h-8 w-8 lg:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <SettingList />
      </SheetContent>
    </Sheet>
  );
};
