"use client";

import React, { useCallback } from "react";
import { CategoryTypes } from "@/utils/definitions";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GridFour, GridNine } from "@phosphor-icons/react/dist/ssr";

interface DetailHeadProps {
  category: CategoryTypes;
  handleViewProduct: (value: string) => void;
}

const DetailHead: React.FC<DetailHeadProps> = ({
  category,
  handleViewProduct,
}) => {
  const [viewProduct, setViewProduct] = React.useState<string>("grid-4");

  const changeViewProduct = (value: string) => {
    setViewProduct(value);
    handleViewProduct(value);
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listOption = searchParams.get('l');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between rounded-lg shadow bg-white p-5 mb-5">
      <h1 className="capitalize text-xl font-semibold">{category?.title}</h1>
      <div className="flex items-center space-x-5">
        <Select defaultValue={listOption || "1"} onValueChange={(value) => router.push(pathname + '?' + createQueryString('l', value))}>
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Son Eklenen</SelectItem>
            <SelectItem value="4">İlk Eklenen</SelectItem>
            <SelectItem value="2">Artan Fiyat</SelectItem>
            <SelectItem value="3">Azalan Fiyat</SelectItem>
            <SelectItem value="5">Artan İndirim</SelectItem>
            <SelectItem value="6">Azalan İndirim</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          defaultValue={viewProduct}
          onValueChange={changeViewProduct}
        >
          <ToggleGroupItem value="grid-4">
            <GridNine className="text-base" />
          </ToggleGroupItem>
          <ToggleGroupItem value="gird-3">
            <GridFour className="text-base" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default DetailHead;