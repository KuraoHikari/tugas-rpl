import { db } from "@/db";
import { NextResponse } from "next/server";
import {
 laundrySchema,
 userSchema,
} from "@/db/drizzle-zod/schemaValidation";
import { catchApiError } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { laundrys } from "@/db/schema";

//create laundry
export async function POST(request: Request) {
 try {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }
  const body = await request.json();
  console.log(
   "🚀 ~ file: route.ts:23 ~ POST ~ body:",
   body
  );

  const createLaundrySchema = laundrySchema.omit({
   id_kwitansi_laundry: true,
   userId: true,
   createdAt: true,
  });
  const createLaundrySchemaValidate =
   createLaundrySchema.safeParse(body);
  if (!createLaundrySchemaValidate.success) {
   const errValidate = catchApiError(
    createLaundrySchemaValidate.error
   );

   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const createKwitansiLaundry = await db
   .insert(laundrys)
   .values([
    {
     nama_pelanggan: body.nama_pelanggan,
     nomor_telephone_pelanggan:
      body.nomor_telephone_pelanggan,
     total_berat: body.total_berat,
     status: body.status,
     harga: body.harga,
     lokasi_penyimpanan: body.lokasi_penyimpanan,
     jumlah_pakaian: body.jumlah_pakaian,
     userId: session.user.id,
    },
   ])
   .returning();

  return NextResponse.json({
   laundry: createKwitansiLaundry[0],
  });
 } catch (error: any) {
  console.log(error, "REGISTRATION_ERROR");
  return new NextResponse("Internal Server Error", {
   status: 500,
  });
 }
}

//get link-tree
export async function GET(req: Request, res: Response) {
 try {
  //validate login user
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
   return new NextResponse("Unauthorized", {
    status: 401,
   });
  }

  const laundrys = await db.query.laundrys.findMany({
   where: (laundrys, { eq }) =>
    eq(laundrys.userId, session?.user?.id),
  });

  return NextResponse.json({ data: laundrys });
 } catch (error) {
  return new NextResponse("Internal Error", {
   status: 500,
  });
 }
}
