"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryDetail from '../category-detail/CategoryDetail';
import ProductDetail from '../product-detail/ProductDetail';

interface IndexProps {
    slug: string;
}

const Index: React.FC<IndexProps> = ({ slug }) => {

    const [isCategory, setIsCategory] = useState<boolean>(false);
    const [isProduct, setIsProduct] = useState<boolean>(false);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get(`/api/v1/categories/${slug}`);
                const productResponse = await axios.get(`/api/v1/products/${slug}`);
                
                // Kategori ve ürün her ikisi de varsa veri yüklendi olarak işaretlenir
                if (categoryResponse.data.data != null) {
                    setIsCategory(true);
                }
                if (productResponse.data.data != null) {
                    setIsProduct(true);
                }

                // Herhangi bir veri yüklendiğinde veri yüklendi olarak işaretlenir
                if (categoryResponse.data.data || productResponse.data.data) {
                    setDataLoaded(true);
                } else {
                    setError(true); // Her iki istek de başarısız olduğunda hata gösterilecek
                }
            } catch (error) {
                console.log(error);
                setError(true); // Herhangi bir hata durumunda hata gösterilecek
            }
        }
        
        fetchData();
    }, [slug]);

    return (
        <>
            {error && <h1>HATA</h1>}
            {dataLoaded && (
                <>
                    {isCategory && <CategoryDetail slug={slug} />}
                    {isProduct && <ProductDetail slug={slug} />}
                </>
            )}
        </>
    )
}

export default Index;