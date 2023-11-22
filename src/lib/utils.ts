import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export function catchError(err: unknown) {
 if (err instanceof z.ZodError) {
  const errors = err.issues.map((issue) => {
   return issue.message;
  });
  return toast(errors.join("\n"));
 } else if (err instanceof Error) {
  return toast.error(err.message);
 } else {
  return toast(
   "Something went wrong, please try again later."
  );
 }
}

export function catchApiError(err: unknown) {
 if (err instanceof z.ZodError) {
  const errors = err.issues.map((issue) => {
   return `${issue.path.join(",")} : ${issue.message}`;
  });

  return {
   code: 400,
   message: errors.join("\n"),
  };
 } else if (err instanceof Error) {
  return {
   code: 400,
   message: err.message,
  };
 } else {
  return {
   code: 500,
   message: "Something went wrong, please try again later.",
  };
 }
}
