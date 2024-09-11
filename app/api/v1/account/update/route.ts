import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req: Request) {
  try {
    const { name, surname, email, phone, birthday, gender } = await req.json();

    const user = await db.user.findUnique({
      where: { email: email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const dateBirthday = birthday ? new Date(birthday) : null;

    await db.user.update({
      where: { id: user.id },
      data: {
        name,
        surname,
        email,
        phone,
        birthday: dateBirthday,
        gender,
      },
    });

    return NextResponse.json({ message: "Hesap bilgileri güncellendi" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Hesap bilgileri güncellenirken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
});