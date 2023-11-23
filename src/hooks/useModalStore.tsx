import { create } from "zustand";

export type ModalType =
 | "createLaundry"
 | "editLaundry"
 | "editStatusLaundry";

interface ModalData {
 laundry?: {
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
}

interface ModalStore {
 type: ModalType | null;
 data: ModalData;
 isOpen: boolean;
 onOpen: (type: ModalType, data?: ModalData) => void;
 onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
 type: null,
 data: {},
 isOpen: false,
 onOpen: (type, data = {}) =>
  set({ isOpen: true, type, data }),
 onClose: () => set({ type: null, isOpen: false }),
}));
