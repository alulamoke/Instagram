import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft, PlusSquare, X } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/schemas/post-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "@/services/posts.service";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { DropZone } from "../DropZone";

import { TCustomError } from "@/util/types";
import { Textarea } from "../ui/textarea";

export const CreatePostModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [next, setNext] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start"
        >
          <PlusSquare className="h-6 w-6 shrink-0" />
          <p className="hidden text-lg lg:block">Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="
      h-full max-w-6xl overflow-y-auto xl:h-auto"
      >
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-8">
          {next ? (
            <CreatePostForm files={files} setNext={setNext} />
          ) : (
            <>
              <DropZone setFiles={setFiles} />
              {files.length ? (
                <>
                  <hr />
                  <div className="post-album">
                    {files.map((file) => (
                      <div key={file.name} className="group relative border">
                        {file.type.startsWith("video") ? (
                          <video
                            controls
                            src={URL.createObjectURL(file)}
                            className="aspect-square object-contain"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Uploaded file ${file.name}`}
                            className="aspect-square object-contain"
                          />
                        )}
                        <div className="absolute inset-0 hidden items-center justify-center gap-8 bg-black/50 text-white group-hover:flex">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() =>
                              setFiles(
                                files.filter((f) => f.name !== file.name),
                              )
                            }
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => setNext(true)} className="w-full">
                    Next
                  </Button>
                </>
              ) : null}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type TCreatePostFormProps = {
  files: File[];
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePostForm: React.FC<TCreatePostFormProps> = ({ files, setNext }) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: "",
      type: "",
    },
  });

  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
    },
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    const formData = new FormData();
    files.map((file) => formData.append("file", file));
    formData.append("type", values.type);
    formData.append("caption", values.caption);

    postMutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setNext(false)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>* Caption</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>What's on your mind?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={postMutation.isLoading}
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
