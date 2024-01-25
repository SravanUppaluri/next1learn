import {NextRequest, NextResponse} from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

type Props = {
  params: {
    productId: string;
  };
};

export async function GET(request: NextRequest, {params: {productId}}: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product) {
    return NextResponse.json({error: "product not available"}, {status: 404});
  }
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, {params: {productId}}: Props) {
  const body = await request.json();
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });
  const validation = schema.safeParse(body);
  if (!product) {
    return NextResponse.json({error: "No Product"}, {status: 404});
  }
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 404});
  }
  const updatedProduct = await prisma.product.update({
    where: {id: parseInt(productId)},
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(updatedProduct, {status: 201});
}

export async function DELETE(
  request: NextRequest,
  {params: {productId}}: Props
) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });
  if (!product) {
    return NextResponse.json({error: "product id exceeded"}, {status: 404});
  }
  const deletedProduct = await prisma.product.delete({
    where: {id: parseInt(productId)},
  });
  return NextResponse.json(deletedProduct);
}
