import { select } from "@/lib/db"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { slug: string } }) {

  try {
    const rows: any = await select({
      query: `
        SELECT 
            p.id, 
            p.title, 
            p.short_description, 
            p.description, 
            p.price, 
            p.discount_percentage, 
            p.slug, 
            CONCAT(GROUP_CONCAT(DISTINCT JSON_OBJECT('id', c.id, 'title', c.title, 'slug', c.slug))) AS category, 
            CONCAT('[', GROUP_CONCAT('"', pi.image_url, '"'), ']') AS images 
        FROM 
            products p 
        JOIN 
            product_images pi ON p.id = pi.product_id 
        JOIN 
            categories c ON p.category_id = c.id 
        WHERE 
            c.slug = '${params.slug}'
        GROUP BY 
            p.id, p.title, p.description
      `,
    });

    rows.forEach((row: any) => {
      row.category = JSON.parse(row.category);
      row.images = JSON.parse(row.images);
    });

    if(rows.length > 0) {
      return Response.json({ status: 200, data: rows });
    } else {
      return Response.json({ status: 200, data: null });
    }

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}