import Product, { IProduct } from "@/lib/models/ProductModel";
import dbConnect from "@/lib/mongodb";
import { slugify } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    shortDescription,
    description,
    price,
    currency,
    otherPrice,
    discountPercentage,
    stock,
    images,
    categoryId,
    variants,
    isFeatured,
    isHomePage,
    isNewProduct,
    isFreeShipping,
    transitions
  } = await request.json(); // Gelen JSON verisini al

  await dbConnect(); // MongoDB bağlantısını başlat

  const slug = slugify(title);

  const newProduct: IProduct = new Product({
    title,
    shortDescription,
    description,
    price,
    currency,
    otherPrice,
    discountPercentage,
    stock,
    slug,
    images,
    categoryId,
    variants,
    isFeatured,
    isHomePage,
    isNewProduct,
    isFreeShipping,
    transitions
  });

  try {
    await newProduct.save();

    return Response.json({ message: "Ürün oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Ürün oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
