import React from 'react';
import axios from 'axios';
import ProductItem from '../products/ProductItem';
import productService from '@/lib/service/productService';

const LastProducts:React.FC = async () => {

  const products = await productService.getFeatured(10);

  return (
    <>
      {products && products.length > 0 && products.map((prod, index) => (
        <ProductItem
          key={index}
          product={prod}
        />
      ))}
    </>
  );
}

export default LastProducts