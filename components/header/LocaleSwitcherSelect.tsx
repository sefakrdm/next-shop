"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
  children: ReactNode;
  defaultValue: string;
};

const LocaleSwitcherSelect = ({ children, defaultValue }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const onSelectChange = (value: string) => {
    const nextLocale = value as Locale;
    startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className="w-32 ring-0 focus:ring-0 focus:outline-offset-0 focus:ring-offset-0 outline-none border-none bg-transparent">
        <SelectValue placeholder="Türkçe" />
      </SelectTrigger>
      <SelectContent>
        {children}
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcherSelect;
