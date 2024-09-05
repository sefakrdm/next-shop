"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle,
  CircleNotch,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import { login } from "@/lib/actions/login";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const formSubmit: SubmitHandler<Inputs> = async (values) => {
    startTransition(async () => {
      const result = await login(values, callbackUrl);
      if(result && result.error) {
        setError(result!.error!);
      } else {
        window.location.reload();
      };
    });
  };

  return (
    <section className="mt-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-10">Giriş Yap</h1>
        <div className="realative w-[450px] bg-white drop-shadow-md p-10 rounded-xl">
          {error && (
            <Alert className="mb-5" variant="destructive">
              <Warning weight="bold" className="h-4 w-4" />
              <AlertTitle>Giriş Başarısız.</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          {params.get("success") && (
            <Alert className="mb-5 border-green-600 bg-green-600/5 text-green-600">
              <CheckCircle
                size={18}
                weight="duotone"
                color="green"
                className="text-green-600"
              />
              <AlertTitle>Kayıt Başarılı.</AlertTitle>
              <AlertDescription>{params.get("success")}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col space-y-0.5">
              <label htmlFor="email" className="font-semibold">
                E-Posta
              </label>
              <Input
                type="text"
                id="email"
                {...register("email", {
                  required: "E-Posta boş olamaz",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Geçersiz e-posta adresi.",
                  },
                })}
                className={cn(
                  "border rounded-md h-12 p-4",
                  errors.email && "border-red-500"
                )}
                disabled={isSubmitting}
              />
              {errors.email?.message && (
                <div className="text-xs text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-0.5">
              <label htmlFor="password" className="font-semibold">
                Şifre
              </label>
              <Input
                type="password"
                id="password"
                {...register("password", {
                  required: "Şifre boş olamaz",
                })}
                className={cn(
                  "border rounded-md h-12 p-4 font-['math'] tracking-[.25em]",
                  errors.password && "border-red-500"
                )}
                disabled={isSubmitting}
              />
              {errors.password?.message && (
                <div className="text-xs text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="w-full font-semibold text-sm text-slate-600 underline">
              <a href="#">Şifremi unuttum?</a>
            </div>
            <Button
              size="lg"
              className="w-full text-base font-semibold p-3 h-12"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
              )}
              Giriş Yap
            </Button>
            <Separator />
            <div>
              Henüz hasıbınız yok mu?{" "}
              <Link
                className="text-primary hover:underline"
                href={`/account/register?callbackUrl=${callbackUrl}`}
              >
                Kaydol
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
