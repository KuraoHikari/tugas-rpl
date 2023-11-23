import { db } from "@/db";
import { NextResponse } from "next/server";
import { laundrySchema } from "@/db/drizzle-zod/schemaValidation";
import { catchApiError } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { laundrys } from "@/db/schema";
import { eq } from "drizzle-orm";

//update laundry
export async function PATCH(
 req: Request,
 { params }: { params: { id: string } }
) {
 try {
  if (!params.id) {
   return new NextResponse("id is required", {
    status: 400,
   });
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const updateLaundrySchema = laundrySchema.omit({
   id_kwitansi_laundry: true,
   userId: true,
   createdAt: true,
  });

  const body = await req.json();
  console.log("🚀 ~ file: route.ts:37 ~ body:", body);

  const updateLaundryValidate =
   updateLaundrySchema.safeParse(body);
  if (!updateLaundryValidate.success) {
   const errValidate = catchApiError(
    updateLaundryValidate.error
   );

   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const findLaundry = await db.query.laundrys.findFirst({
   where: (laundry, { eq }) =>
    eq(laundry.id_kwitansi_laundry, params.id),
  });

  if (!findLaundry) {
   return new NextResponse("linkTree Not Found", {
    status: 404,
   });
  }

  if (findLaundry.userId !== session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  await db
   .update(laundrys)
   .set({
    nama_pelanggan: body.nama_pelanggan,
    nomor_telephone_pelanggan:
     body.nomor_telephone_pelanggan,
    total_berat: body.total_berat,
    status: body.status,
    harga: body.harga,
    lokasi_penyimpanan: body.lokasi_penyimpanan,
    jumlah_pakaian: body.jumlah_pakaian,
    userId: session.user.id,
   })
   .where(eq(laundrys.id_kwitansi_laundry, params.id));

  return NextResponse.json({
   data: {
    ...findLaundry,
    nama_pelanggan: body.nama_pelanggan,
    nomor_telephone_pelanggan:
     body.nomor_telephone_pelanggan,
    total_berat: body.total_berat,
    status: body.staus,
    harga: body.harga,
    lokasi_penyimpanan: body.lokasi_penyimpanan,
    jumlah_pakaian: body.jumlah_pakaian,
    userId: session.user.id,
   },
  });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}

//get one laundry
export async function GET(
 req: Request,
 { params }: { params: { id: string } }
) {
 try {
  if (!params.id) {
   return new NextResponse("id is required", {
    status: 400,
   });
  }

  const laundry = await db.query.laundrys.findFirst({
   where: (laundry, { eq }) =>
    eq(laundry.id_kwitansi_laundry, params.id),
  });

  if (!laundry) {
   return new NextResponse("kwitansi Not Found", {
    status: 404,
   });
  }

  return NextResponse.json({ data: laundry });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
