import ProductModel from "@/lib/models/ProductModel";
import productService from "@/lib/service/productService";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  try {
    // const products = await productService.getLatest();

    const products = await productService.getLatest(10);

    if (!products) {
      return Response.json({ products: [] });
    }

    return Response.json({ products }, { status: 200 });

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

  // try {
  //   const rows: any = await select({
  //     query: `
  //       SELECT 
  //           p.id, 
  //           p.title, 
  //           p.short_description, 
  //           p.description, 
  //           p.price, 
  //           p.discount_percentage, 
  //           p.slug, 
  //           CONCAT(GROUP_CONCAT(DISTINCT JSON_OBJECT('id', c.id, 'title', c.title, 'slug', c.slug))) AS category, 
  //           CONCAT('[', GROUP_CONCAT('"', pi.image_url, '"'), ']') AS images,
  //           CONCAT(GROUP_CONCAT(DISTINCT JSON_OBJECT('id', br.id, 'title', br.title, 'slug', br.slug))) AS brand
  //       FROM 
  //           products p 
  //       JOIN 
  //           product_images pi ON p.id = pi.product_id 
  //       JOIN 
  //           categories c ON p.category_id = c.id 
  //       JOIN 
  //           product_brands br ON p.brand_id = br.id
  //       GROUP BY 
  //           p.id, p.title, p.short_description, p.description, p.price, p.discount_percentage, p.slug, c.id, c.title, c.slug, br.id, br.title, br.slug
  //     `,
  //   });

  //   rows.forEach((row: any) => {
  //     row.category = JSON.parse(row.category);
  //     row.images = JSON.parse(row.images);
  //   });

  //   return Response.json({ status: 200, data: rows });

  // } catch (error) {
  //   console.log(error);
  //   return Response.json({ error: "An error occurred while fetching data." });
  // }

}