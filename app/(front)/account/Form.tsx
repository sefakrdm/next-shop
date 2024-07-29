"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';

type Inputs = {
    name: string;
    surname: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const Form = () => {

    const { data: session, update } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        defaultValues: {
            name: '',
            surname: '',
            // email: '',
            phone: '',
            // password: '',
        }
    });

    useEffect(() => {
        if (session && session.user) {
            setValue('name', session.user.name!);
            setValue('surname', session.user.surname!);
            // setValue('email', session.user.email!);
            setValue('phone', session.user.phone!);
        }
    }, [router, session, setValue]);

    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { name, surname, phone } = form;

        try {
            const res = await fetch('/api/v1/auth/account', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    // email,
                    phone,
                    // password,
                }),
            });

            if(res.status === 200) {
                // Hesap bilgileri güncellendi
                toast.success("Bilgileriniz güncellendi")
                const newSession = {
                    ...session,
                    user: {
                        ...session?.user,
                        name,
                        surname,
                        // email,
                        phone,
                    },
                }
                await update(newSession);
            } else {
                const data = await res.json();
                // HATA data.message
                toast.error(data.message);
            }

        } catch (err: any) {
            const error = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message;
            toast.error(error);
                
        }
    }
    
  return (
    <div className="">
      <form className="space-y-5" onSubmit={handleSubmit(formSubmit)}>
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
                "border rounded-md h-12 p-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600",
                errors.name && "border-red-500"
              )}
              disabled={isSubmitting}
            />
            {errors.name?.message && (
              <div className="text-xs text-red-500">{errors.name.message}</div>
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
                "border rounded-md h-12 p-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600",
                errors.surname && "border-red-500"
              )}
              disabled={isSubmitting}
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
            value={session?.user.email?.toString()}
            className={cn(
              "border rounded-md h-12 p-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600"
            )}
            disabled
          />
        </div>
        <div className="flex flex-col space-y-0.5">
          <label htmlFor="phone" className="font-semibold">
            Telefon
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) =>
                isValidPhoneNumber(value.toString()) || "Geçersiz telefon numarası",
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                id="phone"
                defaultCountry="TR"
                international
                withCountryCallingCode
                value={value as any}
                onChange={(v) => onChange(v as string)}
                className={cn(
                  "flex w-full border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border rounded-md h-12 p-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600",
                  errors.phone ? "border-red-500" : ""
                )}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.phone?.message && (
            <div className="text-xs text-red-500">{errors.phone.message}</div>
          )}
        </div>
        {/* <div className="flex flex-col space-y-0.5">
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
            className={cn(
              "border rounded-md h-12 p-4 font-['math'] tracking-[.25em]",
              errors.confirmPassword && "border-red-500"
            )}
          />
          {errors.confirmPassword?.message && (
            <div className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </div>
          )}
        </div> */}
        <div className="items-top flex space-x-2">
          <Checkbox id="campPerm" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="campPerm"
              className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kampanyalardan haberdar olmak için Ticari Elektronik İleti Onayı
              metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari
              elektronik iletileri almak istiyorum.
            </label>
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="font-semibold h-12 float-right"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
          )}
          Kaydet
        </Button>
      </form>
    </div>
  );
}

export default Form