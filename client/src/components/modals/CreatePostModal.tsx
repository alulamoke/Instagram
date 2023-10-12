import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusSquare } from "lucide-react";

export const CreatePostModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-4 hover:font-semibold">
        <PlusSquare className="h-6 w-6 shrink-0" />
        <p className="text-lg">Create</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
