import React from 'react';
import ProductDetail from '@/components/product-detail/ProductDetail';

const ProductPage = ({ params }: { params: { slug: string } }) => {
  return (
    <ProductDetail slug={params.slug} />
  )
}

export default ProductPage;