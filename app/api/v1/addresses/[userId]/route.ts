import { db } from "@/lib/db";

export const dynamic = 'force-dynamic'
export async function GET(request: Request, { params }: { params: { userId: string } }) {

  try {
    
    const addresses = await db.address.findFirst({ where: { userId: params.userId } });

    return Response.json({ addresses }, { status: 200 });

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}