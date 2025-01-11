"use client";

import React, { useState, useEffect } from "react";
import { createCheckoutSession } from "../../actions/stripe";

interface ProductPurchaseProps {
  productId: string;
}

export default function ProductPurchase({ productId }: ProductPurchaseProps) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // console.log("Fetching product details for productId:", productId);

        const response = await fetch(
          `/api/get-product-details?productId=${productId}`
        );

        // console.log("API Response Status:", response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        // console.log("Product details received:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      if (!product) throw new Error("Product details are not loaded yet.");

      const formData = new FormData();
      formData.set("uiMode", "hosted");
      formData.set("name", product.name);
      formData.set("description", product.description);
      formData.set("description_ge", product.description_ge);
      formData.set("title_ge", product.name);
      formData.set("category", product.category);
      formData.set("gender", product.gender);
      formData.set("size", product.size);
      formData.set("priceInCents", product.priceInCents);
      formData.set("id", product.id);

      const { url } = await createCheckoutSession(formData);
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No URL returned from the server action.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {product ? (
        <>
          <button
            onClick={handlePurchase}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </>
      ) : (
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
          {" "}
          Loading....
        </button>
      )}
    </div>
  );
}
