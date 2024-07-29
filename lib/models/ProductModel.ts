import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./CategoryModel";
import { IImage } from "./ProductImagesModel";

// mongoose.connect(process.env.MONGODB_URI as string);
// mongoose.Promise = global.Promise;

// const db = mongoose.connection;

interface PriceProps {
  buyPrice?: number | null; //* Satın alma fiyatı
  campaignPrice: number | null; //* Kampanya fiyatı
  currency?: string; //* Para birimi "TRY", "USD"
  currencyCode?: string; //* Para birimi kodu "₺", "$"
  currencySymbol?: string; //* Para birimi sembolü
  discountPrice: number | null;
  priceListId?: number | null; //* İndirimli fiyat
  sellPrice?: number; //* Satış fiyatı
  unitPrice?: number | null; //* Birim fiyat
}

interface TransitionsProps {
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  locale: string;
}

export interface IProduct extends Document {
  _id: string;
  sku: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price?: PriceProps[];
  discountPercentage?: number | undefined;
  stock: number;
  slug: string;
  images: IImage[];
  categoryId?: ICategory['_id'];
  variants?: any[];
  category: ICategory[];
  isActive: boolean;
  isFeatured?: boolean;
  isHomePage?: boolean;
  isNewProduct?: boolean;
  isFreeShipping?: boolean;
  transitions?: TransitionsProps[];
  brandId: string;
  brand: any[];
  isVariantProduct: boolean
}


const ProductSchema = new Schema(
  {
    sku: { type: String, required: true },
    title: { type: String, required: true },
    shortDescription: String,
    description: String,
    price: [{ type: Object }],
    discountPercentage: { type: Number },
    stock: Number,
    slug: { type: String, unique: true, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    isActive: { type: Boolean, default: false },
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    isFeatured: { type: Boolean, default: false },
    isHomePage: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    isFreeShipping: { type: Boolean, default: false },
    transitions: [{ type: Object }],
    brandId: { type: Schema.Types.ObjectId, ref: 'Brand' },
    isVariantProduct: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;