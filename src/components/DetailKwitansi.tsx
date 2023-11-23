"use client";

import { LaundryColumn } from "@/app/admin/adminTable/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const KwitansiLaundry = ({
  id_kwitansi_laundry,
  nama_pelanggan,
  nomor_telephone_pelanggan,
  status,
  total_berat,
  harga,
  lokasi_penyimpanan,
  jumlah_pakaian,
}: LaundryColumn) => {
  return (
    <Card className={"w-[380px] bg-black  px-4 py-8 shadow sm:px-10"}>
      <CardHeader>
        <CardTitle className="text-gray-200">Kwitansi Laundry</CardTitle>
        <CardDescription className="text-gray-500">
          Selamat datang di Kwitansi Laundry Kiloan Berbasis Web
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="max-w-md shadow-md overflow-hidden text-gray-200">
          <div className="">
            <div className="">
              <table className="table-auto border-collapse border border-gray-200">
                <tr>
                  <td className="border border-gray-200 p-2">ID</td>
                  <td className=" p-2">{id_kwitansi_laundry}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Nama Pelanggan</td>
                  <td className="border border-gray-200 p-2">{nama_pelanggan}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Nomor Telepon</td>
                  <td className="border border-gray-200 p-2">{nomor_telephone_pelanggan}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Total Berat</td>
                  <td className="border border-gray-200 p-2">{total_berat} kg</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Status</td>
                  <td className="border border-gray-200 p-2">{status}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Harga</td>
                  <td className="border border-gray-200 p-2">Rp. {harga},-</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Lokasi Penyimpanan</td>
                  <td className="border border-gray-200 p-2">{lokasi_penyimpanan}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">Jumlah Pakaian</td>
                  <td className="border border-gray-200 p-2">{jumlah_pakaian}</td>
                </tr>
              </table>
              <p className="mt-2 text-gray-500">Terima kasih telah menggunakan jasa laundry kami.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KwitansiLaundry;
