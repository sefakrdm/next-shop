import Category, { ICategory } from "@/lib/models/CategoryModel";
import dbConnect from "@/lib/mongodb";
import { slugify } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, parentCategory } = await request.json(); // Gelen JSON verisini al

  await dbConnect(); // MongoDB bağlantısını başlat

  const slug = slugify(title);

  const newCategory: ICategory = new Category({
    title,
    description,
    slug,
    parentCategory,
  });

  try {
    await newCategory.save();

    return Response.json({ message: 'Kategori oluşturuldu' }, { status: 201 });
  } catch (error: any) {
    return Response.json({ message: `Kategori oluşturulurken bir hata oluştu. HATA: ${error.message}` }, { status: 500 });
  }
}
