import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    image,
    price,
    status
  } = await request.json();

  try {

    return Response.json({ message: "Kargo seçeneği oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Kargo seçeneği oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}