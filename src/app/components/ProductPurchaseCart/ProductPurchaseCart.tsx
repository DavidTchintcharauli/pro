"use client";

import React, { useState } from "react";
import { createCheckoutSession } from "../../actions/stripe";  

interface ProductPurchaseCartProps {
  totalAmount: number;  
}

export default function ProductPurchaseCart({
  totalAmount,
}: ProductPurchaseCartProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      if (!totalAmount) {
        throw new Error("Total amount is not provided.");
      }

      const formData = new FormData();
      formData.set("priceInCents", totalAmount.toString());  
      formData.set("uiMode", "hosted");
      
      formData.set("name", "Cart Items");  
      formData.set("description", "Description in English");  
      formData.set("description_ge", "აღწერა");  
      formData.set("title_ge", "კალათის ნივთები");  

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
    <button
      onClick={handlePurchase}
      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
      disabled={loading}
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
