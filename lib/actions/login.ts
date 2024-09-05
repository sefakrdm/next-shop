"use server";

import { signIn } from "@/lib/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { db } from "../db";

export const login = async (values: any, callbackUrl: string) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Geçersiz alanlar!",
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Geçersiz kimlik bilgileri!",
          };
        default:
          return {
            error: "Bir şeyler ters gitti!",
          };
      }
    }

    throw error;
  }
};