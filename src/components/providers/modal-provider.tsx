"use client";

import { useEffect, useState } from "react";
import { CreateLaundryModal } from "../modals/createLaundryModal";
import { EditLaundryModal } from "../modals/EditLaundryModal";
import { EditStatusLaundryModal } from "../modals/EditStatusLaundryModal";

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
   <EditLaundryModal />
   <EditStatusLaundryModal />
   {/* <CreateLinkTreeModal />
   <CreateButtonTreeModal />
   <DeleteLinkTreeModal />
   <EditLinkTreeModal />
   <DeleteButtonTreeModal />
   <EditButtonTreeModal /> */}
  </>
 );
};
