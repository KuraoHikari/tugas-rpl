"use client";

import { catchError, cn } from "@/lib/utils";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ky from "ky";
import * as z from "zod";
import { userSchema } from "@/db/drizzle-zod/schemaValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type CardProps = React.ComponentProps<typeof Card>;

type Variant = "LOGIN" | "REGISTER";

const formSchema = userSchema.omit({
 id: true,
 createdAt: true,
});

const AuthCard = ({ className, ...props }: CardProps) => {
 const session = useSession();
 const [variant, setVariant] = useState<Variant>("LOGIN");
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const router = useRouter();

 const toggleVariant = useCallback(() => {
  if (variant === "LOGIN") {
   setVariant("REGISTER");
  } else {
   setVariant("LOGIN");
  }
 }, [variant]);

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
   hashedPassword: "",
  },
 });

 useEffect(() => {
  if (session?.status === "authenticated") {
   router.push("/admin");
  }
 }, [session?.status, router]);

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  setIsLoading(true);
  try {
   if (variant === "REGISTER") {
    const res: any = await ky
     .post("/api/register", { json: values })
     .json();

    if (res.user) {
     signIn("credentials", {
      ...values,
      redirect: false,
     })
      .then((callback) => {
       if (callback?.error) {
        toast.error("Invalid credentials!");
       }

       if (callback?.ok && !callback?.error) {
        toast.success("Logged in!");
        router.push("/admin");
       }
      })
      .finally(() => setIsLoading(false));
    }
   }
   if (variant === "LOGIN") {
    signIn("credentials", {
     ...values,
     redirect: false,
    })
     .then((callback) => {
      if (callback?.error) {
       toast.error("Invalid credentials!");
      }

      if (callback?.ok && !callback?.error) {
       toast.success("Logged in!");
       router.push("/admin");
      }
     })
     .finally(() => setIsLoading(false));
   }
   form.reset();
  } catch (error: any) {
   return toast.error(error.message);
  }
 };

 return (
  <Card
   className={cn(
    "w-[380px]  bg-opacity-80 px-4 py-8 shadow sm:px-10",
    className
   )}
   {...props}
  >
   <CardHeader>
    <CardTitle>
     {" "}
     {variant === "LOGIN" ? "LOGIN" : "REGISTER"}
    </CardTitle>
    <CardDescription className="text-gray-500">
     Selamat datang di Kwitansi Laundry Kiloan Berbasis Web
    </CardDescription>
   </CardHeader>
   <CardContent className="grid gap-4">
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
     >
      <div className="space-y-4">
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter email"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="hashedPassword"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            type="password"
            placeholder="Enter Password"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

      <Button
       type="submit"
       className="w-full gap-2"
       disabled={isLoading}
      >
       {variant === "LOGIN" ? "LOGIN" : "REGISTER"}

       {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
       )}
      </Button>

      <div
       className="
        gap-2
        text-center
        text-sm
        mt-6
        px-2
        text-gray-500
    "
      >
       <div>
        {variant === "LOGIN"
         ? "Baru di Kwitansi Laundry Kiloan?"
         : "Sudah Punya Akun?"}
       </div>

       <div
        onClick={toggleVariant}
        className="underline cursor-pointer"
       >
        {variant === "LOGIN" ? "Buat Akun Baru" : "Login"}
       </div>
      </div>
     </form>
    </Form>
   </CardContent>
  </Card>
 );
};

export default AuthCard;
