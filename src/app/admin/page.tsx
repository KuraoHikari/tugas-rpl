"use client";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
 LaundryColumn,
 columns,
} from "./adminTable/columns";
import HeaderTable from "./adminTable/headerTable";
import ky from "ky";
import { useQuery } from "@tanstack/react-query";
import { catchError } from "@/lib/utils";

async function getLaundrys() {
 const res = await ky.get("api/laundry");
 const users = (await res.json()) as dataLinkTreeType;
 return users;
}

type dataLinkTreeType = {
 data: LaundryColumn[];
};

export default function AdminPage() {
 const { data, error, isLoading } =
  useQuery<dataLinkTreeType>({
   queryKey: ["laundrys"],
   queryFn: () => getLaundrys(),
  });

 if (isLoading) return "Loading...";

 if (error) {
  catchError(error);
 }

 const formattedLinkTrees = data?.data?.map((item) => ({
  id_kwitansi_laundry: item.id_kwitansi_laundry,
  id: item.id_kwitansi_laundry,
  nama_pelanggan: item.nama_pelanggan,
  nomor_telephone_pelanggan: item.nomor_telephone_pelanggan,
  total_berat: item.total_berat,
  status: item.status,
  harga: item.harga,
  lokasi_penyimpanan: item.lokasi_penyimpanan,
  jumlah_pakaian: item.jumlah_pakaian,
  createdAt: `${new Date(item.createdAt).toLocaleDateString(
   "en-GB"
  )}`,
 }));

 return (
  <div className="flex-1 space-y-4 p-8 pt-6">
   <HeaderTable />
   <Separator />
   <DataTable
    searchKey="id_kwitansi_laundry"
    columns={columns}
    data={formattedLinkTrees ? formattedLinkTrees : []}
   />
  </div>
 );
}
