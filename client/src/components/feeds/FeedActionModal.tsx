import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

type TFeedActionModalProps = {};

export const FeedActionModal: React.FC<TFeedActionModalProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-4 hover:font-semibold">
        <MoreHorizontal className="ml-auto h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <Button variant="ghost" className="mt-4">
          Follow
        </Button>
        <Button variant="ghost">Report</Button>
        <Button variant="ghost">Go to post</Button>
        <Button variant="ghost">Share too...</Button>
        <Button variant="ghost">Copy link</Button>
        <Button variant="ghost">Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};
