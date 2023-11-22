import {
 timestamp,
 pgTable,
 text,
 primaryKey,
 integer,
 uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";

export const users = pgTable("user", {
 id: text("id")
  .$defaultFn(() => nanoid(5))
  .primaryKey(),
 email: text("email").notNull(),
 hashedPassword: text("hashedPassword"),
 creatcreatedAt: timestamp("created_at", {
  mode: "date",
 }).defaultNow(),
});

export const accounts = pgTable(
 "account",
 {
  userId: text("userId")
   .notNull()
   .references(() => users.id, { onDelete: "cascade" }),
  type: text("type")
   .$type<AdapterAccount["type"]>()
   .notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
 },
 (account) => ({
  compoundKey: primaryKey(
   account.provider,
   account.providerAccountId
  ),
 })
);

export const laundrys = pgTable("laundry", {
 id_kwitansi_laundry: text("id_kwitansi_laundry")
  .$defaultFn(() => nanoid(5))
  .primaryKey(),
 nama_pelanggan: text("nama_pelanggan").notNull(),
 nomor_telephone_pelanggan: text(
  "nomor_telephone_pelanggan"
 ).notNull(),
 total_berat: integer("total_berat").notNull(),
 status: text("status").notNull(),
 harga: integer("harga").notNull(),
 lokasi_penyimpanan: text("lokasi_penyimpanan").notNull(),
 jumlah_pakaian: integer("jumlah_pakaian").notNull(),
 userId: text("user_id")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" }),
 createdAt: timestamp("created_at", {
  mode: "date",
 }).defaultNow(),
});

export const laundrysRelations = relations(
 laundrys,
 ({ one }) => ({
  user: one(users, {
   fields: [laundrys.userId],
   references: [users.id],
  }),
 })
);

export const userRelations = relations(
 users,
 ({ many }) => ({
  linkTrees: many(laundrys),
 })
);
