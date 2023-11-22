CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "laundry" (
	"id_kwitansi_laundry" text PRIMARY KEY NOT NULL,
	"nama_pelanggan" text NOT NULL,
	"nomor_telephone_pelanggan" text NOT NULL,
	"total_berat" integer NOT NULL,
	"status" text NOT NULL,
	"harga" integer NOT NULL,
	"lokasi_penyimpanan" text NOT NULL,
	"jumlah_pakaian" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"hashedPassword" text,
	"image" text,
	"username" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "laundry" ADD CONSTRAINT "laundry_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
