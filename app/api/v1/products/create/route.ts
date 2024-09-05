import { db } from "@/lib/db";
import { slugFn } from "@/lib/utils";

export async function POST(req: Request) {

  // const slug = slugify(title);

  // const newProduct: IProduct = new Product({
  //   title,
  //   shortDescription,
  //   description,
  //   price,
  //   currency,
  //   otherPrice,
  //   discountPercentage,
  //   stock,
  //   slug,
  //   images,
  //   categoryId,
  //   variants,
  //   isFeatured,
  //   isHomePage,
  //   isNewProduct,
  //   isFreeShipping,
  //   transitions
  // });

  try {

    const {
      sku,
      title,
      description,
      shortDescription,
      price,
      discountPercentage,
      stock,
      images,
      categoryId,
      variants,
      isActive,
      isFeatured,
      isHomePage,
      isNewProduct,
      isBestSeller,
      isFreeShipping,
      transitions,
      brandId,
      isVariantProduct,
    } = await req.json();

    const slug = slugFn(title);

    const product = await db.product.create({
      data: {
        sku,
        title,
        description,
        shortDescription,
        price,
        discountPercentage,
        stock,
        slug,
        categoryId,
        variants,
        isActive,
        isFeatured,
        isHomePage,
        isNewProduct,
        isBestSeller,
        isFreeShipping,
        transitions,
        brandId,
        isVariantProduct,
      },
      select: { id: true }
    });

    if(product && images && images.length > 0) {
      const productImages = images.map((image: any) => ({
        productId: product.id,
        isMain: image.isMain,
        isVideo: image.isVideo,
        order: image.order,
        fileName: image.fileName,
        url: image.url,
        alt: image.alt,
        caption: image.caption,
      }));

      if (images.length > 0) {
        productImages[0].isMain = true;
      }

      await db.productImage.createMany({
        data: productImages
      });
    }

    return Response.json(product, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Ürün oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
