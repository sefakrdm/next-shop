import React from "react";
import Form from "./Form";
import { Metadata } from "next";
import DynamicImage from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Kaydol",
};

export default async function RegisterPage() {
  return (
    <section className="my-16">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center max-w-5xl bg-background rounded-xl drop-shadow-md relative overflow-hidden">
          <div>
            <DynamicImage
              url={`${process.env.NEXT_PUBLIC_URL}/uploads/images/register-image.png`}
              alt={""}
              width={500}
              height={650}
              className="object-cover rounded-l-xl"
              containerClass="max-h-[650px]"
              priority
            />
          </div>
          <div className="flex flex-col items-start p-10 w-[500px]">
            <h1 className="text-4xl font-extrabold mb-10">Kayıt Ol</h1>
            <div className="realative w-full">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}