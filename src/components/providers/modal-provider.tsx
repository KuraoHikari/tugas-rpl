"use client";

import { useEffect, useState } from "react";
import { CreateLaundryModal } from "../modals/createLaundryModal";

export const ModalProvider = () => {
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
 }, []);

 if (!isMounted) {
  return null;
 }

 return (
  <>
   <CreateLaundryModal />
   {/* <CreateLinkTreeModal />
   <CreateButtonTreeModal />
   <DeleteLinkTreeModal />
   <EditLinkTreeModal />
   <DeleteButtonTreeModal />
   <EditButtonTreeModal /> */}
  </>
 );
};
