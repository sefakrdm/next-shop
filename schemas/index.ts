import { Sura } from "next/font/google";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password is required'})
});

export const RegisterSchema = z.object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email({ message: 'Email is required'}),
    password: z.string().min(6, { message: 'Password minimum is 6'}),
});