"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ChevronRight, LogOut, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";

const MainNav = ({
 className,
 ...props
}: React.HTMLAttributes<HTMLElement>) => {
 return (
  <>
   <nav
    className={cn(
     "w-full relative flex items-center justify-between",
     className
    )}
    {...props}
   >
    <div className="text-xl text font-bold flex gap-2">
     <Shield className="h-7 w-7" />
     Admin Page
    </div>
    <div className="gap-2 flex">
     <ModeToggle />
     <Button
      onClick={() => signOut()}
      variant="outline"
      size="icon"
     >
      <LogOut className="h-4 w-4" />
     </Button>
    </div>
   </nav>
  </>
 );
};

export default MainNav;
