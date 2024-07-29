import { select } from "@/lib/db"

export const dynamic = 'force-dynamic'
export async function GET(request: Request, { params }: { params: { slug: string } }) {

  try {
    const rows: any = await select({
      query: `SELECT * FROM categories WHERE slug = '${params.slug}'`,
    });

    if(rows.length > 0) {
      return Response.json({ status: 200, data: rows[0] });
    } else {
      return Response.json({ status: 200, data: null });
    }

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}