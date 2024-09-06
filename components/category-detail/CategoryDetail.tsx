import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import categoryService from "@/lib/service/categoryService";
import productService from "@/lib/service/productService";
import dynamic from "next/dynamic";

const ProductItem = dynamic(() => import("../products/ProductItem").then((mod) => mod.ProductItem), {
  loading: () => <div>Yükleniyor...</div>,
  ssr: false,
});

interface CategoryDetailProps {
  slug: string;
}

const CategoryDetail: React.FC<CategoryDetailProps> = async ({ slug }) => {

  const category = await categoryService.getBySlug(slug);
  const categories = await categoryService.getChildCategories(category ? category._id : '');
  const products = await productService.getByCategoryId(category ? category._id : '', 10);

  return (
    <>
      <section className="bg-slate-100/60 py-3">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Anasayfa</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-3 max-h-full h-full sticky top-2">
              <div className="bg-white rounded-xl shadow p-5 space-y-2.5">
                <h2 className="text-xl font-semibold">Alt Kategoriler</h2>
                <div className="flex flex-col space-y-0.5 max-h-72 overflow-y-auto">
                  {Array.isArray(categories) && categories.length > 0 &&
                    categories.map((cat, index) => (
                      <Link key={index} href={`/${cat.slug}`}>
                        {cat.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-9">
              <div className="rounded-lg shadow bg-white p-5 mb-5">
                <h1 className="capitalize text-xl font-semibold">
                  {category?.title}
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-5">
                {products && products?.length > 0 ? (
                  <>
                    {products?.map((prod, index) => (
                      <ProductItem
                        key={index}
                        product={prod}
                      />
                    ))}
                  </>
                ) : (
                  <div>Bu kategoride ürün bulunamadı...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryDetail;
