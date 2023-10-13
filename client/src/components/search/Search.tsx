import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, SearchIcon } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/schemas/search-schema";

import { useMutation } from "@tanstack/react-query";
import userService from "@/services/users.service";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TCustomError } from "@/util/types";
import toast from "react-hot-toast";
import { ImgUrl } from "@/util/imageUrl";
import { Link } from "react-router-dom";
import { ApiLoading } from "../ApiLoading";

type TSearchProps = {};

export const Search: React.FC<TSearchProps> = ({}) => {
  const [users, setUsers] = useState([]);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const searchMutation = useMutation({
    mutationKey: ["search"],
    mutationFn: userService.getSearchedUsers,
    onSuccess: (data: any) => setUsers(data),
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) =>
    searchMutation.mutate(values.query);

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-center gap-4 rounded-lg py-6 lg:justify-start"
        >
          <SearchIcon className="h-6 w-6 shrink-0" />
          <p className="hidden text-lg lg:block">Search</p>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-8 flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle className="font-semibold">Search</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="search" placeholder="Search..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex flex-col gap-4">
            {searchMutation.isLoading ? (
              <ApiLoading className="h-fit" />
            ) : users.length ? (
              users.map((user: any) => (
                <div key={user._id} className="flex items-center gap-2">
                  <img
                    src={`${ImgUrl}${user.imageurl}`}
                    alt="user image"
                    className="h-12 w-12 rounded-full border-2 border-rose-600 object-cover"
                  />
                  <div className="flex flex-col">
                    <Link
                      to={`/${user.username}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {user.username}
                    </Link>
                    <p className="text-sm">{user.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No user found.</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
