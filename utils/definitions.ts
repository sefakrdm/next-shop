export type CategoryTypes = {
  _id: string;
  id: string;
  title: string;
  description?: string;
  slug: string;
  translations: any[];
  parentCategory?: string; // Üst kategori referansı
  childCategories: CategoryTypes[];
};

export type ReviewTypes = {
  _id: string; // MongoDB ObjectID'si
  id: string;
  rate: number;
  comment: string;
  images: string[];
  user: {
    name: string;
    surname: string;
  }
  hiddenName: boolean;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductTypes = {
  id: string;
  _id: string;
  sku: string;
  title: string;
  description?: string;
  shortDescription?: string;
  prices?: PriceTypes[];
  discountPercentage?: number;
  stock: number;
  slug: string;
  categoryId?: string;
  variants: any[];
  isFavorited: boolean;
  isActive: boolean;
  isFeatured: boolean;
  isHomePage: boolean;
  isNewProduct: boolean;
  isBestSeller: boolean;
  isFreeShipping: boolean;
  transitions: any[];
  brandId: string;
  isVariantProduct: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryTypes;
  brand: any;
  favorites: any[];
  ProductVariant: any[];
  ProductImages: ProductImageTypes[];
  OrderItem: OrderItemTypes[];
  Review: ReviewTypes[];
  qty: number;
};

export type PriceTypes = {
  currency: string;
  sellPrice: number;
  discountPrice: number;
};

export type ProductImageTypes = {
  _id: string;
  id: string;
  productId: string;
  isMain: boolean;
  isVideo: boolean;
  order: number;
  fileName: string;
  url: string;
  alt: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderItemTypes = {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  variants: any[];
  qty: number;
  price: number;
  total: number;
  tax: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  images: string[];
  title: string;
  currency: string;
}

export type AddressTypes = {
  _id: string;
  id: string;
  title: string;
  name: string;
  surname: string;
  addressLine1: string;
  addressLine2: string;
  province: string;
  district: string;
  postalCode: string;
  userId: string;
}

export type FavoriteTypes = {
  _id: string;
  userId: string;
  product: ProductTypes[];
  createdAt: Date
}

export type PaymentTypes = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  type: string;
  transactionCost?: number;
  status: boolean;
  queue: number;
  apiKey: string;
  privApiKey: string;
}

export type ShippingTypes = {
  _id: string;
  title: string;
  image?: string;
  price: number;
  status: boolean;
  apiKey: string;
  privApiKey: string;
}

export type SiteSettingTypes = {
  _id: string;
  id: string;
  title: string;
  description?: string;
  defaultLang?: string;
  currency?: string;
  isMaintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}