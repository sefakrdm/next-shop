"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleNotch, Warning } from "@phosphor-icons/react/dist/ssr";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Form = () => {
    const { data: session } = useSession();

    const params = useSearchParams();
    const router = useRouter();

    let callbackUrl = params.get('callbackUrl') || '/';

    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors, isSubmitting },
    } = useForm<Inputs>({
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    useEffect(() => {
        if(session && session.user) {
            router.push(callbackUrl);
        }
    }, [callbackUrl, params, router, session]);

    const [errorMess, setErrorMess] = useState<string>("");

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { name, surname, email, password } = form;

        try {
            const res = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    password
                }),
            });

            if(res.ok) {
                return router.push(
                    `/account/login?callbackUrl=${callbackUrl}&success=Hesabınız oluşturuldu`
                )
            } else {
                const data = await res.json();
                throw new Error(data.message);
            }

        } catch (err: any) {
          setErrorMess(
            err.message && err.message.indexOf("E11000") === 0
              ? "Bu e-posta adresi ile daha önce kayıt olunmuş. Lütfen farklı bir e-posta adresi giriniz."
              : err.message
          );
          console.log(err || "error");
        }
    }

    return (
      <section className="mt-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold mb-10">Kayıt Ol</h1>
          <div className="realative w-[450px] bg-white drop-shadow-md p-10 rounded-xl">
            {errorMess && (
              <Alert className="mb-5" variant="destructive">
                <Warning weight="bold" className="h-4 w-4" />
                <AlertTitle>Kayıt Başarısız.</AlertTitle>
                <AlertDescription>
                    {errorMess}
                </AlertDescription>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="name" className="font-semibold">
                    Ad
                  </label>
                  <Input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Ad boş olamaz",
                    })}
                    className={cn(
                      "border rounded-md h-12 p-4",
                      errors.name && "border-red-500"
                    )}
                  />
                  {errors.name?.message && (
                    <div className="text-xs text-red-500">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="surname" className="font-semibold">
                    Soyad
                  </label>
                  <Input
                    type="text"
                    id="surname"
                    {...register("surname", {
                      required: "Soyad boş olamaz",
                    })}
                    className={cn(
                      "border rounded-md h-12 p-4",
                      errors.surname && "border-red-500"
                    )}
                  />
                  {errors.surname?.message && (
                    <div className="text-xs text-red-500">
                      {errors.surname.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="email" className="font-semibold">
                  E-Posta
                </label>
                <Input
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "E-posta boş olamaz",
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Geçersiz e-posta adresi",
                    },
                  })}
                  className={cn(
                    "border rounded-md h-12 p-4",
                    errors.email && "border-red-500"
                  )}
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
                  className={cn("border rounded-md h-12 p-4 font-['math'] tracking-[.25em]", errors.password && "border-red-500")}
                />
                {errors.password?.message && (
                  <div className="text-xs text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="confirmPassword" className="font-semibold">
                  Şifre Doğrula
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Şifre doğrulama boş olamaz",
                    validate: (value) => {
                      const { password } = getValues();
                      return (
                        password === value ||
                        "Girdiğiniz şifler birbirleri ile eşleşmiyor"
                      );
                    },
                  })}
                  className={cn("border rounded-md h-12 p-4 font-['math'] tracking-[.25em]", errors.confirmPassword && "border-red-500")}
                />
                {errors.confirmPassword?.message && (
                  <div className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
              <Button
                size="lg"
                className="w-full text-base font-semibold p-3 h-12"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <CircleNotch className="mr-2 h-4 w-4 animate-spin" />}
                Kayıt Ol
              </Button>
              <div className="items-top flex space-x-2">
                <Checkbox id="campPerm" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="campPerm"
                    className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Kampanyalardan haberdar olmak için Ticari Elektronik İleti
                    Onayı metnini okudum, onaylıyorum. Tarafınızdan gönderilecek
                    ticari elektronik iletileri almak istiyorum.
                  </label>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="kvkkTerms" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="kvkkTerms"
                    className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Üyelik sözleşmesini ve KVKK Aydınlatma Metnini okudum, kabul ediyorum.
                  </label>
                </div>
              </div>
              <Separator />
              <div>
                Henüz hasıbınız yok mu?{" "}
                <Link
                  className="text-primary hover:underline"
                  href={`/account/login?callbackUrl=${callbackUrl}`}
                >
                  Giriş Yap
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    );

}

export default Form