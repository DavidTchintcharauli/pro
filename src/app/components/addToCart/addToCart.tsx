"use client";
import React, { useState } from "react";

const AddToCartButton = ({
  productId,
  userId, 
}: {
  productId: number;
  userId: string; 
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId, quantity: 1 }), 
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Item added to cart successfully!"); 
      } else {
        setMessage(result.error || "Error adding to cart."); 
      }
    } catch (error) {
      setMessage("Error adding to cart. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default AddToCartButton;
