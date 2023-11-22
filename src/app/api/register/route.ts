import bcrypt from "bcrypt";

import { db } from "@/db";
import { NextResponse } from "next/server";
import { userSchema } from "@/db/drizzle-zod/schemaValidation";
import { catchApiError } from "@/lib/utils";
import { users } from "@/db/schema";

export async function POST(request: Request) {
 try {
  const body = await request.json();

  const createUsereSchema = userSchema.omit({
   id: true,
   createdAt: true,
  });
  const createUsereSchemaValidate =
   createUsereSchema.safeParse(body);
  if (!createUsereSchemaValidate.success) {
   const errValidate = catchApiError(
    createUsereSchemaValidate.error
   );

   return new NextResponse(errValidate.message, {
    status: errValidate.code,
   });
  }

  const hashedPassword = await bcrypt.hash(
   body.hashedPassword,
   12
  );

  const createUser = await db
   .insert(users)
   .values([
    {
     email: body.email,
     hashedPassword: hashedPassword,
    },
   ])
   .returning();

  return NextResponse.json({ user: createUser[0] });
 } catch (error: any) {
  console.log(error, "REGISTRATION_ERROR");
  return new NextResponse("Internal Server Error", {
   status: 500,
  });
 }
}
