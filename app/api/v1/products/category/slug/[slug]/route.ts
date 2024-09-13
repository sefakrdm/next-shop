import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

type QueryOptions = {
  where: { categoryId: string };
  include: {
    category: boolean;
    ProductImages: boolean;
    prices: {
      orderBy: { sellPrice: 'asc' | 'desc' };
    } | boolean;
  };
  skip: number;
  take: number;
  orderBy?: { createdAt?: 'asc' | 'desc' };
};
// defaults to auto
export async function POST(request: NextRequest) {
  try {
    const { categoryId, categorySlug, filterList, locale, order, page, limit } =
      await request.json();

    const categoryObjectId = ObjectId.createFromHexString(categoryId);

    console.log("====================================");
    console.log("OBJECTID: ", categoryObjectId);
    console.log("DATA: ", {
      categoryId,
      categorySlug,
      filterList,
      locale,
      order,
      page,
      limit,
    });
    console.log("====================================");

    if (!categoryObjectId || !categorySlug) {
      return NextResponse.json({ products: null }, { status: 400 });
    }
    
    let products;

    if(order.type === "createdAt") {
      products = await db.product.findMany({
        where: { categoryId: categoryObjectId.toString() },
        include: {
          category: true,
          ProductImages: true,
          Review: { select: { rate: true } },
          prices: true,
        },
        skip: (page - 1) * limit, // Pagination skip
        take: limit, // Pagination limit
        orderBy: { createdAt: order.direction },
      });
    } else if(order.type === "price") {
      const productsWith = await db.product.findMany({
        where: { categoryId: categoryObjectId.toString() },
        include: {
          category: true,
          ProductImages: true,
          Review: { select: { rate: true } },
          prices: true,
        },
        skip: (page - 1) * limit, // Pagination skip
        take: limit, // Pagination limit
      });

      if(order.direction === "desc") {
        products = productsWith.sort((a, b) => {
          const maxPriceA = Math.max(...a.prices.map(p => p.sellPrice));
          const maxPriceB = Math.max(...b.prices.map(p => p.sellPrice));
          return maxPriceA - maxPriceB; // For descending order
        });
      } else {
        products = productsWith.sort((a, b) => {
          const maxPriceA = Math.max(...a.prices.map(p => p.sellPrice));
          const maxPriceB = Math.max(...b.prices.map(p => p.sellPrice));
          return maxPriceB - maxPriceA; // For descending order
        });
      }
    } else if(order.type === "discount") {
      products = await db.product.findMany({
        where: { categoryId: categoryObjectId.toString() },
        include: {
          category: true,
          ProductImages: true,
          Review: { select: { rate: true } },
          prices: true,
        },
        skip: (page - 1) * limit, // Pagination skip
        take: limit, // Pagination limit
        orderBy: { discountPercentage: order.direction },
      });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ products: null }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching data. ERROR: " + error },
      { status: 500 }
    );
  }
}
