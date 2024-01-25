import {NextRequest, NextResponse} from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: {id: string};
}

export async function GET(request: NextRequest, {params: {id}}: Props) {
  const user = await prisma.user.findUnique({where: {id: parseInt(id)}});
  // Fetch data form DB
  // if not found return 404
  // else return data
  if (!user) return NextResponse.json({error: "User not found"}, {status: 404});
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params: {id}}: Props) {
  // Validate the req body
  // if invalid return 400
  // fetch the user with given id
  // if no id available rreturn 404
  // update the user
  // return the user

  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 404});
  }

  const user = await prisma.user.findUnique({where: {id: parseInt(id)}});

  if (!user) {
    return NextResponse.json(
      {error: "there is no such user to update"},
      {status: 404}
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {name: body.name, email: body.email},
  });

  return NextResponse.json(updatedUser, {status: 201});
}

export async function DELETE(request: NextRequest, {params: {id}}: Props) {
  // fetch the user with given id
  // if no id available return 404
  // delete the user
  // return the user

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    return NextResponse.json({error: "no user exist"}, {status: 404});
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  return NextResponse.json({deletedUser}, {status: 201});
}
