import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const get = searchParams.get('get');
    const limitParam = searchParams.get('limit');

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let products: any;

    switch (get) {
      case "ALL":
          products = await db.product.findMany({
            take: limit,
            where: { isActive: true },
            include: { category: true, ProductImages: true, Review: true, prices: true },
            orderBy: { createdAt: "desc" },
          });
        break;
      case "FEATURED":
          products = await db.product.findMany({
            take: limit,
            where: { isActive: true, isFeatured: true },
            include: { category: true, ProductImages: true, Review: true, prices: true },
            orderBy: { createdAt: "desc" },
          });
        break;
      case "HOMEPAGE":
          products = await db.product.findMany({
            take: limit,
            where: { isActive: true, isHomePage: true },
            include: { category: true, ProductImages: true, Review: true, prices: true },
            orderBy: { createdAt: "desc" },
          });
        break;
      case "NEWPRODUCT":
          products = await db.product.findMany({
            take: limit,
            where: { isActive: true, isNewProduct: true },
            include: { category: true, ProductImages: true, Review: true, prices: true },
            orderBy: { createdAt: "desc" },
          });
        break;
      case "BESTSELLER":
          products = await db.product.findMany({
            take: limit,
            where: { isActive: true, isBestSeller: true },
            include: { category: true, ProductImages: true, Review: true, prices: true },
            orderBy: { createdAt: "desc" },
          });
        break;
    
      default:
        products = null;
        break;
    }

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while fetching data." }, { status: 500 });
  }

}