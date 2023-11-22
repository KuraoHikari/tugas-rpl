"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

const HeaderTable = () => {
 const { onOpen } = useModal();
 return (
  <div className="flex items-center justify-between">
   <div>
    <h2 className="text-3xl font-bold tracking-tight">
     Kwitansi Laundry
    </h2>
   </div>
   <Button onClick={() => onOpen("createLaundry")}>
    <Plus className="mr-2 h-4 w-4" /> Add New
   </Button>
  </div>
 );
};

export default HeaderTable;
