import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../products/ProductItem';
import productService from '@/lib/service/productService';

const SaleProducts:React.FC = async () => {

    // const [products, setProducts] = useState<ProductTypes[]>([]);

    // useEffect(() => {
    //     const getProducts = async () => {
    //         await axios.get('/api/v1/products')
    //         .then(res => setProducts(res.data.data))
    //         .then(console.log);
    //     }
    //     getProducts();
    // }, []);
    

    const products = await productService.getFeatured(6);

  return (
    <>
      {products &&
        products.length > 0 &&
        products.map((prod, index) => (
          <ProductItem
            key={index}
            id={prod._id}
            title={prod.title}
            price={prod.price}
            slug={prod.slug}
            discountPercentage={prod.discountPercentage || undefined}
            stock={prod.stock}
            images={prod.images || []}
            isNewProduct={prod.isNewProduct}
            isFreeShipping={prod.isFreeShipping}
          />
        ))}
    </>
  );
}

export default SaleProducts