"use client";

import ky from "ky";
import { useQuery } from "@tanstack/react-query";
import { catchError } from "@/lib/utils";
import KwitansiLaundry from "@/components/DetailKwitansi";
import { LaundryColumn } from "../admin/adminTable/columns";

async function getLaundry(laundryid: string) {
 const res = await ky.get(`/api/laundry/${laundryid}`);
 const users = (await res.json()) as dataLaundryType;
 return users;
}

type dataLaundryType = {
 data: LaundryColumn;
};

export default function DetailLaundryPage({
 params,
}: {
 params: { laundryid: string };
}) {
 const { data, error, isLoading } =
  useQuery<dataLaundryType>({
   queryKey: ["laundrys"],
   queryFn: () => getLaundry(params.laundryid),
  });

 if (isLoading) return "Loading...";

 if (error) {
  catchError(error);
 }
 //  console.log(data);

 return (
  <div
   className="
   h-[100vh] flex items-center justify-center
     "
   style={{
    backgroundImage: 'url("/laundry.jpg")',
   }}
  >
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    {/* Auth Form */}
    <KwitansiLaundry
     id_kwitansi_laundry={
      data?.data?.id_kwitansi_laundry
       ? data?.data?.id_kwitansi_laundry
       : ""
     }
     nama_pelanggan={
      data?.data.nama_pelanggan
       ? data?.data?.nama_pelanggan
       : ""
     }
     nomor_telephone_pelanggan={
      data?.data.nomor_telephone_pelanggan
       ? data?.data.nomor_telephone_pelanggan
       : ""
     }
     status={data?.data.status ? data?.data.status : ""}
     total_berat={
      data?.data.total_berat ? data?.data.total_berat : 0
     }
     harga={data?.data.harga ? data?.data.harga : 0}
     lokasi_penyimpanan={
      data?.data.lokasi_penyimpanan
       ? data?.data.lokasi_penyimpanan
       : ""
     }
     jumlah_pakaian={
      data?.data.jumlah_pakaian
       ? data?.data.jumlah_pakaian
       : 0
     }
     createdAt={
      data?.data.createdAt ? data?.data.createdAt : ""
     }
    />
   </div>
  </div>
 );
}
