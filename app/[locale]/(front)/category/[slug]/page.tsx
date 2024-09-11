import React from 'react';
import CategoryDetail from '@/components/category-detail/CategoryDetail';
import categoryService from '@/lib/service/categoryService';
import { CategoryTypes, ProductTypes } from '@/utils/definitions';
import { useSearchParams } from 'next/navigation';

const CategoryPage = async ({ params }: { params: { slug: string } }) => {

  const category = await categoryService.getBySlug(params.slug);
  const categories = await categoryService.getChildCategories(category ? category._id : '');
  // const products = await productService.getByCategoryId(category ? category._id : '', 10);

  return (
    <CategoryDetail
      category={category ?? ({} as CategoryTypes)}
      categories={categories ?? ([] as CategoryTypes[])}
      // products={products ?? ([] as ProductTypes[])}
    />
  );
}

export default CategoryPage