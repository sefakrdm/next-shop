"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarUI } from "@/components/custom-ui/CalendarUI";

type Inputs = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  gender: string;
};

const Form = () => {
  const { data: session, status, update } = useSession();
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
      name: "",
      surname: "",
      email: '',
      phone: "",
      birthday: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue("name", session.user.name || "");
      setValue("surname", session.user.surname || "");
      setValue('email', session.user.email || "");
      setValue("phone", session.user.phone || "");
      setValue("birthday", session.user.birthday || "");
      setValue("gender", session.user.gender || "");
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, surname, email, phone, birthday, gender } = form;

    try {
      const res = await fetch("/api/v1/account/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          phone,
          birthday,
          gender,
        }),
      });

      if (res.status === 200) {
        await update({ name, surname, email, phone, birthday, gender });
        toast.success("Bilgileriniz güncellendi");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };

  return (
    <div>
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
          <div className="flex flex-col space-y-0.5">
            <label htmlFor="email" className="font-semibold">
              E-Posta
            </label>
            <Input
              type="text"
              id="email"
              value={session?.user.email?.toString() || ""}
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
                  value && isValidPhoneNumber(value?.toString()) || "Geçersiz telefon numarası"
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  id="phone"
                  defaultCountry="TR"
                  international
                  withCountryCallingCode
                  value={value as any || ""}
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
          <div className="flex flex-col space-y-0.5">
            <label className="font-semibold">Doğum Tarihi</label>
            <Controller
              name="birthday"
              control={control}
              // rules={{
              //   validate: (value) =>
              //     isValidBirthday(value.toString()) || "Geçersiz tarih",
              // }}
              render={({ field: { onChange, value } }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start border rounded-md h-12 p-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600"
                      )}
                      disabled={isSubmitting}
                    >
                      <Calendar size={16} weight="bold" className="mr-2" />
                      {value ? (
                        format(value, "PPP", { locale: tr })
                      ) : (
                        <span>Tarih seçin</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] rounded-lg bg-white p-5 shadow-md">
                    <CalendarUI
                      mode="single"
                      selected={value as any || ""}
                      onSelect={onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div className="flex flex-col space-y-0.5">
            <label htmlFor="gender" className="font-semibold">
              Cinsiyet
            </label>
            <select
              id="gender"
              {...register("gender", {
                required: "Cinsiyet seçimi boş olamaz",
              })}
              className={cn(
                "text-sm border rounded-md h-12 px-4 focus-visible:ring-0 focus-visible:shadow-none focus-visible:ring-offset-0 focus-visible:border-blue-600"
              )}
              disabled={isSubmitting}
            >
              <option value="" disabled hidden>
                Cinsiyet seçiniz
              </option>
              <option value="kadin">Kadın</option>
              <option value="erkek">Erkek</option>
              <option value="diger">Belirtmek istemiyorum</option>
            </select>
          </div>
          <div className="col-span-2 items-top flex space-x-2">
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
            className="font-semibold h-12"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
            )}
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
