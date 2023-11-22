"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type LaundryColumn = {
 id_kwitansi_laundry: string;
 nama_pelanggan: string;
 nomor_telephone_pelanggan: string;
 total_berat: number;
 status: string;
 harga: number;
 lokasi_penyimpanan: string;
 jumlah_pakaian: number;
 createdAt: string;
};

export const columns: ColumnDef<LaundryColumn>[] = [
 {
  accessorKey: "id_kwitansi_laundry",
  header: "id",
 },
 {
  accessorKey: "nama_pelanggan",
  header: "Nama",
 },
 {
  accessorKey: "nomor_telephone_pelanggan",
  header: "Handphone",
 },
 {
  accessorKey: "total_berat",
  header: "Total Berat",
 },
 {
  accessorKey: "status",
  header: "Status",
 },
 {
  accessorKey: "harga",
  header: "Harga",
 },
 {
  accessorKey: "lokasi_penyimpanan",
  header: "Lokasi Penyimpanan",
 },
 {
  accessorKey: "jumlah_pakaian",
  header: "Jumlah Pakaian",
 },
 {
  accessorKey: "createdAt",
  header: "Date",
 },
 {
  id: "actions",
  cell: ({ row }) => <CellAction data={row.original} />,
 },
];
