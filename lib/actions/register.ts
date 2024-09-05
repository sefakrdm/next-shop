"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: any, callbackUrl: string) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, surname, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({ where: { email: email } });

  if(existingUser){
    return {
        error: "Email already taken!"
    };
  }
  await db.user.create({
    data: {
        name,
        surname,
        email,
        password: hashedPassword,
        phone: null,
        image: null,
        birthday: null,
        gender: null,
        lastLogin: null,
    }
  });
  return {
    success: "User successfully created!"
  };
};