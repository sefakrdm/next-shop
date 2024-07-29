import mongoose, { Document, Schema } from "mongoose";

interface TranslationsProps {
  pageTitle?: string;
  pageDescription?: string;
  slug: string;
  locale: string;
  description?: string;
}

export interface ICategory extends Document {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  translations: TranslationsProps[];
  parentCategory?: Schema.Types.ObjectId | ICategory; // Üst kategori referansı
}

const categorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, unique: true, required: true },
    translations: [
      {
        pageTitle: { type: String },
        pageDescription: { type: String },
        slug: { type: String, required: true },
        locale: { type: String, required: true },
        description: { type: String },
      },
    ],
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Bu alan, kategoriye ait üst kategoriyi referans olarak tutar
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;
