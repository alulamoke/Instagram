import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";

type TSettingModalProps = {};

export const SettingModal: React.FC<TSettingModalProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-4 hover:font-semibold">
        <Settings className="ml-auto h-7 w-7" />
      </DialogTrigger>
      <DialogContent>
        <Button variant="ghost" className="mt-4">
          Apps and Websites
        </Button>
        <Button variant="ghost">QR Code</Button>
        <Button variant="ghost">Notifications</Button>
        <Button variant="ghost">Setting and privacy</Button>
        <Button variant="ghost">Log Out</Button>
        <Button variant="ghost">Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};
