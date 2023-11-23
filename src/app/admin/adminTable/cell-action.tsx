"use client";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LaundryColumn } from "./columns";

import { Button } from "@/components/ui/button";
import {
 Copy,
 Edit,
 FolderOpen,
 FolderOpenIcon,
 MoreHorizontal,
 Send,
 Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import Link from "next/link";

interface CellActionProps {
 data: LaundryColumn;
}

// Fungsi untuk membuat link wa.me
function createWaMeLink(payload: LaundryColumn) {
 // Menggunakan fungsi encodeURI untuk mengubah spasi menjadi %20
 let text = `KWITANSI LAUNDRY
=================

ID                : ${payload.id_kwitansi_laundry}
Nama Pelanggan    : ${payload.nama_pelanggan}
Nomor Telepon     : ${payload.nomor_telephone_pelanggan}
Total Berat       : ${payload.total_berat} kg
Status            : ${payload.status}
Harga             : Rp. ${payload.harga},-
Lokasi Penyimpanan: ${payload.lokasi_penyimpanan}
Jumlah Pakaian    : ${payload.jumlah_pakaian}
Link              : ${
  process.env.NEXT_PUBLIC_LINK + payload.id_kwitansi_laundry
 }

Terima kasih telah menggunakan jasa laundry kami.`;
 let encodedMessage = encodeURI(text);
 // Mengembalikan link wa.me dengan nomor telepon dan pesan yang sudah di-encode
 return (
  "https://wa.me/" +
  payload.nomor_telephone_pelanggan +
  "?text=" +
  encodedMessage
 );
}

export const CellAction: React.FC<CellActionProps> = ({
 data,
}) => {
 const router = useRouter();
 const { onOpen } = useModal();
 const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
  setIsMounted(true);
 }, []);

 if (!isMounted) {
  return null;
 }
 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
     <span className="sr-only">Open menu</span>
     <MoreHorizontal className="h-4 w-4" />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => {}}>
     <Link
      className="flex"
      target="_blank"
      rel="noopener noreferrer"
      href={data.id_kwitansi_laundry}
     >
      <FolderOpenIcon className="mr-2 h-4 w-4" /> View{" "}
      {data.id_kwitansi_laundry}
     </Link>
    </DropdownMenuItem>
    <DropdownMenuItem
     onClick={() =>
      onOpen("editLaundry", {
       laundry: data,
      })
     }
    >
     <Edit className="mr-2 h-4 w-4" /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem
     onClick={() =>
      onOpen("editStatusLaundry", {
       laundry: data,
      })
     }
    >
     <Edit className="mr-2 h-4 w-4" /> Edit Status
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => {}}>
     <Link
      className="flex"
      target="_blank"
      rel="noopener noreferrer"
      href={createWaMeLink(data)}
     >
      <Send className="mr-2 h-4 w-4" /> Send Info
     </Link>
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};
