import React from 'react';
import { ProductItem } from '@/components/products/ProductItem';
import productService from '@/lib/service/productService';

export const SaleProducts: React.FC = async () => {

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
            product={prod}
          />
        ))}
    </>
  );
}