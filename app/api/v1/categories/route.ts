import { select } from "@/lib/db"

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {

  try {
    const rows: any = await select({
      query: `SELECT * FROM categories`,
    });

    return Response.json({ status: 200, data: rows });

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}