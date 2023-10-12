import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/users.service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { TCustomError } from "@/util/types";
import localStore from "@/util/localStore";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: userService.login,
    onSuccess: (data) => {
      localStore.authenticateUser(data.token);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful");
      navigate("/");
    },
    onError: (err: TCustomError) => toast.error(err.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) =>
    loginMutation.mutate(values);

  return (
    <div className="mx-auto grid max-w-screen-sm place-items-center">
      <div className="flex h-full w-full flex-col justify-center gap-4 rounded-md border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <header className="my-8 text-xl font-medium">
              Welcome back, <br />
              Login
            </header>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
