import React from "react";
import ProductCard from "./ProductCard";
import "./ProductCard.css";
import { Product } from "./fetchProducts";

interface ProductListProps {
  productList: Product[];
  locale: string;
}

export const ProductList = ({
  productList,
  locale,
}: ProductListProps): JSX.Element => {
  return (
    <div className="container margin-bottom-20px">
      <h1 className="text-3xl text-center font-bold text-gray-800 my-6">
        Purchased products
      </h1>
      <div className="flex flex-col gap-4 mx-20">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
};
