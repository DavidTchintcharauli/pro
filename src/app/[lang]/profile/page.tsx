import React from "react";
import { fetchProducts, Product } from "./fetchProducts";
import { ProductList } from "./ProductList";
import { createClient } from "../../lib/supaBase/server";
import { redirect } from "next/navigation";

interface ProductsProps {
  params: { locale: string };
}

export default async function Products({
  params,
}: ProductsProps): Promise<JSX.Element> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const productList: Product[] = await fetchProducts();
  const { locale } = params;
  return (
    <div className="container dark:text-white">
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
      <ProductList productList={productList} locale={locale} />
    </div>
  );
}
