import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/auth-provider";
import { updateUserInfoSchema } from "@/schemas/user-schema";
import usersService from "@/services/users.service";
import { ImgUrl } from "@/util/imageUrl";
import { TCustomError } from "@/util/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { z } from "zod";

type TEditProfileProps = {};

const EditProfile: React.FC<TEditProfileProps> = ({}) => {
  const fileRef = useRef<React.ElementRef<"input">>(null);
  const queryClient = useQueryClient();

  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    form.setValue("website", user.website ?? "");
    form.setValue("bio", user.bio ?? "");
    form.setValue("gender", user.gender ?? "");
  }, [user]);

  const form = useForm<z.infer<typeof updateUserInfoSchema>>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      website: "",
      bio: "",
      gender: "",
    },
  });

  const updateUserInfoMutation = useMutation({
    mutationKey: ["updateUserInfo"],
    mutationFn: usersService.editAuthUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      toast.success("User info updated.");
    },
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof updateUserInfoSchema>) =>
    updateUserInfoMutation.mutate(values);

  const changeProfilePhotoMutation = useMutation({
    mutationKey: ["changeProfilePhoto"],
    mutationFn: usersService.editUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile image updated successfully.");
    },
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    changeProfilePhotoMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="text-xl font-semibold">Edit profile</header>
      <div className="flex max-w-lg flex-col gap-8 p-6">
        <div className="flex items-center gap-4">
          <img
            src={`${ImgUrl}${user.imageurl}`}
            alt="profile image"
            className="h-10 w-10 rounded-full border object-cover"
          />
          <div className="flex flex-col">
            <Link
              to={`/${user.username}`}
              className="text-sm font-semibold hover:underline"
            >
              {user.username}
            </Link>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <p
              role="button"
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer text-xs font-medium text-primary"
            >
              Change profile photo
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Website" />
                  </FormControl>
                  <FormDescription>
                    Website Editing your links is only available on mobile.
                    Visit the Instagram app and edit your profile to change the
                    websites in your bio.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} maxLength={200} />
                  </FormControl>
                  <FormDescription>
                    {form.getValues("bio")?.length}/200
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This won't be part of your public profile.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={updateUserInfoMutation.isLoading}
              className="rounded-xl"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
