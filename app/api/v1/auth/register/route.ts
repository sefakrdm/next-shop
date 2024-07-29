import UserModel, { IUser } from "@/lib/models/UserModel";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { name, surname, email, phone, password } = await request.json(); // Gelen JSON verisini al

  await dbConnect(); // MongoDB bağlantısını başlat

  const newUser: IUser = new UserModel({
    name,
    surname,
    email,
    phone,
    password: bcrypt.hashSync(password)
  });

  try {
    await newUser.save();

    return Response.json({ message: 'Kullanıcı oluşturuldu' }, { status: 201 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
