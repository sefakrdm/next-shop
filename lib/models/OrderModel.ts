import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  _id: string;
  title: string;
  slug: string;
  stock: number;
  qty: number;
  image: string;
  price: number;
  variants: any[];
  shortDescription?: string;
  description?: string;
  currency: string;
  otherPrice?: any[];
  discountPercentage?: number | undefined;
  images?: string[];
  categoryId?: string;
  isFeatured?: boolean;
  isHomePage?: boolean;
  isNewProduct?: boolean;
  isFreeShipping?: boolean;
  transitions?: any[];
  brandId: string;
  brand: any[];
}