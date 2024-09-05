import { db } from "@/lib/db";
import { slugFn } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const {
      title,
      description,
      shortDescription,
      parentCategoryId,
      translations,
      images,
      isActive,
    } = await req.json();

    const slug = slugFn(title);

    const category = await db.category.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        parentCategoryId,
        translations,
        images,
        isActive,
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Kategori oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}