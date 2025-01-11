import React from "react";
import "./ProductCard.css";
// import Link from "next/link";
// import { useTranslations } from "next-intl";
import { Product } from "./fetchProducts";
import ProductPurchase from "../../components/CheckoutButton/CheckoutButton";
import AddToCartButton from "../../components/addToCart/addToCart";
import { getUserIdFromSupabase } from "../../lib/getUserIdFromSupabase";
interface ProductCardProps {
  product: Product;
  locale: string;
}

export default async function ProductCard({
  product,
  locale,
}: ProductCardProps): Promise<JSX.Element> {
  const title = locale === "ka" ? product.title_ge : product.title_en;
  const description =
    locale === "ka" ? product.description_ge : product.description_en;
  const userId = await getUserIdFromSupabase();
  return (
    <div
      key={product.id}
      className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition-transform hover:scale-105"
    >
      <img
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-800">
          {title || "სათაური არ არის ხელმისაწვდომი"}
        </h4>
        <div className="text-green-500 font-bold text-lg mt-2">
          {product.price} $
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {description || "აღწერა არ არის ხელმისაწვდომი"}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <AddToCartButton productId={Number(product.id)} userId={userId} />

        <ProductPurchase productId={product.stripe_product_id} />
      </div>
    </div>
  );
}

// export default function ProductCard({
//   product,
//   locale,
// }: ProductCardProps): JSX.Element {
//   const title = locale === "ka" ? product.title_ge : product.title_en;
//   const description =
//     locale === "ka" ? product.description_ge : product.description_en;
//   // const t = useTranslations("Add");

//   return (
//     <div key={product.id} className="item ">
//       <img
//         src={product.image}
//         alt={title || "პროდუქტის სურათი"}
//         className="item-img"
//       />
//       <h4 className="item-name ">{title || "სათაური არ არის ხელმისაწვდომი"}</h4>
//       <div>{product.price} $</div>
//       <p className="item-desc">
//         {description || "აღწერა არ არის ხელმისაწვდომი"}
//       </p>
//       <div>
//         {/* <button className="button">{t("Add to cart")}</button> */}
//         <button className="button">Add to cart</button>
//         {/* <Link
//           href={`/${locale}/products/${product.id}`}
//           className="moreCardBtn"
//         >
//           BUY Now
//         </Link> */}
//         <ProductPurchase productId={product.stripe_product_id} />
//       </div>
//     </div>
//   );
// }
