import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { laundrys, users } from "../schema";

export const userSchema = createInsertSchema(users, {
 email: z.string().email(),
 hashedPassword: z.string().min(3).max(255),
});

const phoneRegex = new RegExp(
 /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const laundrySchema = createInsertSchema(laundrys, {
 nama_pelanggan: z.string().min(3).max(255),
 nomor_telephone_pelanggan: z
  .string()
  .regex(phoneRegex, "Invalid Phone Number!"),
 total_berat: z.coerce.number().min(1),
 status: z.string(),
 harga: z.coerce.number().min(0),
 lokasi_penyimpanan: z.string().min(3).max(255),
 jumlah_pakaian: z.coerce.number().min(1),
});
