"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import ProductPurchaseCart from "../../components/ProductPurchaseCart/ProductPurchaseCart";
import { redirect } from "next/navigation";

interface Product {
  id: number;
  title_en: string;
  title_ge: string;
  description_en: string;
  description_ge: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [groupedProducts, setGroupedProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const client: SupabaseClient = createClient();

  const getUserIdFromSupabase = async (): Promise<string | null> => {
    try {
      const {
        data: { user },
        error,
      } = await client.auth.getUser();

      if (error || !user) {
        // console.error("Error fetching user from Supabase:", error);
        redirect("/");
        return null;
      }

      return user.id;
    } catch (unexpectedError) {
      console.error(
        "Unexpected error fetching user ID from Supabase:",
        unexpectedError
      );
      return null;
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = await getUserIdFromSupabase();

        if (!userId) {
          setError("User is not authenticated.");
          return;
        }

        const { data: cartData, error: cartError } = await client
          .from("cart")
          .select("product_list")
          .eq("user_id", userId)
          .single();

        if (cartError || !cartData) {
          setError("Your cart is empty or there was an error.");
          return;
        }

        const productList = cartData.product_list;

        const uniqueProductIds = Array.from(new Set(productList));

        const { data: productData, error: productError } = await client
          .from("products")
          .select(
            "id, title_en, title_ge, description_en, description_ge, price, image"
          )
          .in("id", uniqueProductIds);

        if (productError || !productData) {
          setError("Error fetching product data.");
          return;
        }

        const productMap = productData.reduce(
          (acc: { [key: number]: any }, product) => {
            const quantity = productList.filter(
              (id: number) => id === product.id
            ).length;
            acc[product.id] = { ...product, quantity };
            return acc;
          },
          {}
        );

        const groupedProducts = Object.values(productMap);
        const totalPrice = groupedProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );

        setGroupedProducts(groupedProducts as Product[]);
        setTotalPrice(totalPrice);
      } catch (error) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-page p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groupedProducts.length === 0 ? (
          <p>No products in the cart.</p>
        ) : (
          groupedProducts.map((product) => (
            <div
              key={product.id}
              className="cart-item bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col items-center p-4"
            >
              <img
                src={product.image}
                alt={product.title_en}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product.title_en}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {product.description_en}
              </p>
              <p className="text-lg font-bold text-green-600 mt-4">
                {product.price} $ x {product.quantity}
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Subtotal: {product.price * product.quantity} $
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-lg font-semibold text-center">
        <h3>Total: {totalPrice} $</h3>

        <ProductPurchaseCart totalAmount={totalPrice * 100} />
      </div>
    </div>
  );
};

export default CartPage;
