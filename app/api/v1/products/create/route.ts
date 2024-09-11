import { db } from "@/lib/db";
import { slugFn } from "@/lib/utils";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const {
      sku,
      title,
      description,
      shortDescription,
      prices,
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

    // Kategori ve brand ObjectId olarak dönüştürülüyor
    const categoryObjectId = categoryId ? ObjectId.createFromHexString(categoryId) : null;
    const brandObjectId = brandId ? ObjectId.createFromHexString(brandId) : null;

    const slug = slugFn(title);

    // Ürün verisi oluşturuluyor
    const productData: any = {
      sku,
      title,
      description,
      shortDescription,
      slug,
      stock,
      categoryId: categoryObjectId?.toString() || null,
      brandId: brandObjectId?.toString() || null,
      isActive,
      isFeatured,
      isHomePage,
      isNewProduct,
      isBestSeller,
      isFreeShipping,
      transitions,
      discountPercentage,
      isVariantProduct,

      prices: {
        create: prices.map((price: any) => ({
          buyPrice: price.buyPrice,
          sellPrice: price.sellPrice,
          currency: price.currency,
          currencyCode: price.currencyCode,
          currencySymbol: price.currencySymbol,
          discountPrice: price.discountPrice,
          unitPrice: price.unitPrice,
        })),
      },

      ProductImages: {
        create: images.map((image: any) => ({
          isMain: image.isMain,
          isVideo: image.isVideo,
          order: image.order,
          fileName: image.fileName,
          url: image.url,
          alt: image.alt,
          caption: image.caption,
        })),
      },
    };

    // Varyant ürünse, varyantları ekliyoruz
    if (isVariantProduct && variants && variants.length > 0) {
      productData.ProductVariant = {
        create: variants.map((variant: any) => ({
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          thumbnailImage: variant.thumbnailImage,
          images: variant.images,
          VariantAttribute: {
            create: variant.attributes.map((attr: any) => ({
              attributeId: new ObjectId(attr.attributeId).toString(),
              value: attr.value,
            })),
          },
        })),
      };
    }

    // Ürün oluşturuluyor
    const product = await db.product.create({
      data: productData,
    });

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