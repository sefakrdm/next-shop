export type CategoryTypes = {
    id: number;
    title: string;
    slug: string;
}

export type ProductTypes = {
    id: number;
    title: string;
    short_description: string;
    description: string;
    price: number;
    discount_percentage: number;
    slug: string;
    category: CategoryTypes;
    images: string[];
  }