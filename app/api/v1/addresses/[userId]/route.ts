import AddressModel from "@/lib/models/AddressModel";

export const dynamic = 'force-dynamic'
export async function GET(request: Request, { params }: { params: { userId: string } }) {

  try {
    
    const addresses = await AddressModel.find({ userId: params.userId }).lean().exec();

    return Response.json({ addresses }, { status: 200 });

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}