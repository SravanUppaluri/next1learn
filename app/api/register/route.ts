import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validateUser = schema.safeParse(body);

  if (!validateUser.success) {
    return NextResponse.json(validateUser.error.errors, {status: 400});
  }

  const email = await prisma.user.findUnique({where: {email: body.email}});

  if (email) {
    return NextResponse.json({error: "email already exists"}, {status: 400});
  }
  const hashedPassword = await bcrypt.hash(body.password, 5);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({email: newUser.email}, {status: 200});
}
