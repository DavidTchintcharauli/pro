"use client";

import React, { useEffect, useState } from "react";
import "./productActions.css";

const ProductActions = ({
  product,
  type,
  setProductCallBack,
  deleteProductCallback,
  onEditingChange,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(product.title);

  const handleEdit = async () => {
    if (newTitle) {
      try {
        const response = await fetch(
          `https://dummyjson.com/${type}/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle }),
          }
        );
        if (response.status === 200) {
          var data = await response.json();
          setProductCallBack(data);
        }
        if (response.status === 404) {
          var updatedProduct = product;
          updatedProduct.title = newTitle;
          setProductCallBack(updatedProduct);
        }
        setEditing(false);
      } catch (error) {
        console.error("Failed to update product", error);
      }
    } else {
      alert("Can not save without any name");
      setProductCallBack(product);
      setNewTitle(product.title);
      setEditing(false);
    }
  };

  useEffect(() => {
    onEditingChange(editing);
  }, [editing]);

  const handleDelete = () => {
    fetch(`https://dummyjson.com/${type}/${product.id}`, {
      method: "DELETE",
    })
      .then(() => {
        deleteProductCallback(product.id);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            className="rounded m-5"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            className="bg-white border border-gray-800 dark:bg-gray-200 w-20  rounded-sm"
            onClick={handleEdit}
          >
            Save
          </button>
          <button
            className="bg-white border border-gray-800 dark:bg-gray-200 w-20  rounded-sm"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-3 p-3">
          <button
            className="bg-white border border-gray-800 dark:bg-gray-200 w-20  rounded-sm"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-white border border-gray-800 dark:bg-gray-200 w-20  rounded-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
