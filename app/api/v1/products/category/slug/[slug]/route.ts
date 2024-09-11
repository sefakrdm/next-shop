import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
// defaults to auto
export async function POST(request: NextRequest) {

  try {

    const {
      categoryId,
      categorySlug,
      filterList,
      locale,
      order,
      page,
      limit,
    } = await request.json();

    const categoryObjectId = ObjectId.createFromHexString(categoryId);

    console.log('====================================');
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
    console.log('====================================');

    if (!categoryObjectId || !categorySlug) {
      return NextResponse.json({ products: null }, { status: 400 });
    }


    const products = await db.product.findMany({
      where: { categoryId: categoryObjectId.toString() },
      include: { category: true, ProductImages: true },
      orderBy: {
        [order.type]: order.direction, // `order.type` ve `order.direction`'ı dinamik olarak kullanıyoruz
      },
      skip: (page - 1) * limit, // Sayfalama için atlama işlemi
      take: limit, // Sayfada gösterilecek ürün sayısı
    });

    if(!products || products.length === 0) {
      return NextResponse.json({ products: null }, { status: 404 });
    }

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred while fetching data." }, { status: 500 });
  }

}