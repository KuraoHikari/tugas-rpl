"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import {
 Command,
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
} from "@/components/ui/command";
import { laundrySchema } from "@/db/drizzle-zod/schemaValidation";
import { useModal } from "@/hooks/useModalStore";
import ky from "ky";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
 Check,
 ChevronsUpDown,
 Loader2,
} from "lucide-react";
import { useEffect } from "react";

const formSchema = laundrySchema.omit({
 id_kwitansi_laundry: true,
 userId: true,
 createdAt: true,
});

const status = [
 { label: "pending", value: "pending" },
 { label: "proses", value: "proses" },
 { label: "selesai", value: "selesai" },
 { label: "dibayar", value: "dibayar" },
] as const;

export const EditStatusLaundryModal = () => {
 const { isOpen, onClose, type, data } = useModal();
 const queryClient = useQueryClient();

 const isModalOpen = isOpen && type === "editStatusLaundry";

 const { laundry } = data;

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
   nama_pelanggan: "",
   nomor_telephone_pelanggan: "",
   total_berat: 0,
   status: "pending",
   harga: 0,
   lokasi_penyimpanan: "",
   jumlah_pakaian: 0,
  },
 });
 useEffect(() => {
  if (laundry) {
   form.setValue("nama_pelanggan", laundry.nama_pelanggan);
   form.setValue(
    "nomor_telephone_pelanggan",
    laundry.nomor_telephone_pelanggan
   );
   form.setValue("total_berat", laundry.total_berat);
   form.setValue("status", laundry.status);
   form.setValue("harga", laundry.harga);
   form.setValue(
    "lokasi_penyimpanan",
    laundry.lokasi_penyimpanan
   );
   form.setValue("jumlah_pakaian", laundry.jumlah_pakaian);
  }
 }, [laundry, form]);

 const isLoading = form.formState.isSubmitting;

 const onSubmit = async (
  values: z.infer<typeof formSchema>
 ) => {
  try {
   await ky
    .patch(`/api/laundry/${laundry?.id_kwitansi_laundry}`, {
     json: values,
    })
    .json();
   await queryClient.invalidateQueries({
    queryKey: ["laundrys"],
    refetchType: "active",
   });

   toast.success("Laundry Create Successfully");
   form.reset();
   onClose();
  } catch (error: any) {
   return toast.error(error.message);
  }
 };

 const handleClose = () => {
  form.reset();
  onClose();
 };

 return (
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
   <DialogContent className="overflow-hidden">
    <DialogHeader>
     <DialogTitle className="text-2xl font-bold">
      Edit Status Kwitansi
     </DialogTitle>
    </DialogHeader>
    <Form {...form}>
     <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
     >
      <div className="space-y-4">
       <FormField
        control={form.control}
        name="nama_pelanggan"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Name</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter Name"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="nomor_telephone_pelanggan"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter Phone Number"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="total_berat"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Total Berat</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            type="number"
            placeholder="Enter Total Berat"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
         <FormItem className="flex flex-col">
          <FormLabel>Status</FormLabel>
          <Popover>
           <PopoverTrigger asChild>
            <FormControl>
             <Button
              variant="outline"
              role="combobox"
              className={cn(
               "justify-between",
               !field.value && "text-muted-foreground"
              )}
             >
              {field.value
               ? status.find(
                  (stat) => stat.value === field.value
                 )?.label
               : "Select stat"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
             </Button>
            </FormControl>
           </PopoverTrigger>
           <PopoverContent className="p-0">
            <Command>
             <CommandInput placeholder="Search language..." />
             <CommandEmpty>No language found.</CommandEmpty>
             <CommandGroup>
              {status.map((stat) => (
               <CommandItem
                value={stat.label}
                key={stat.value}
                onSelect={() => {
                 form.setValue("status", stat.value);
                }}
               >
                <Check
                 className={cn(
                  "mr-2 h-4 w-4",
                  stat.value === field.value
                   ? "opacity-100"
                   : "opacity-0"
                 )}
                />
                {stat.label}
               </CommandItem>
              ))}
             </CommandGroup>
            </Command>
           </PopoverContent>
          </Popover>

          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="harga"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Harga</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            type="number"
            placeholder="Enter Harga"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="lokasi_penyimpanan"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Lokasi Penyimpanan</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            placeholder="Enter Lokasi Penyimpanan"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="jumlah_pakaian"
        render={({ field }) => (
         <FormItem className="hidden">
          <FormLabel>Jumlah Pakaian</FormLabel>
          <FormControl>
           <Input
            disabled={isLoading}
            type="number"
            placeholder="Enter Jumlah Pakaian"
            {...field}
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>
      <DialogFooter>
       <Button
        type="submit"
        className="w-full gap-2"
        disabled={isLoading}
       >
        Save
        {isLoading && (
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 );
};
