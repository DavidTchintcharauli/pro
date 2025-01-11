"use client";
import React from "react";
import { useState } from "react";
import "./AddButton.css";

const AddButton = ({ item, addProduct }) => {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleClick = () => {
    if (item === "Posts") {
      setPostModalOpen(true);
    } else if (item === "Products") {
      setProductModalOpen(true);
    } else {
      console.error("Error: Item not found");
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title: productName,
      description: productDescription,
      price: productPrice,
      thumbnail: productImage,
    };
    addProduct(newProduct);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage("");

    setProductModalOpen(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitle,
      body: postDescription,
      tags: postTags,
      reactions: {
        likes: 0,
        dislikes: 0,
      },
    };
    addProduct(newPost);

    setPostTitle(" ");
    setPostDescription(" ");
    setPostTags([]);
    setTagInput(" ");
    setPostModalOpen(false);
  };

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductDescriptionChange = (e) =>
    setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);

  const handlePostTitleChange = (e) => setPostTitle(e.target.value);
  const handlePostDescriptionChange = (e) => setPostDescription(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductImage(imageUrl);
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setPostTags([...postTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setPostTags(postTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="fixed right-6 top-36">
      <button
        className="flex items-center justify-center h-12 px-6 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={handleClick}
      >
        +
      </button>
      {isProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="form">
              <label htmlFor="product-name">Product Name:</label>
              <input
                type="text"
                id="product-name"
                value={productName}
                onChange={handleProductNameChange}
                required
              />
              <label htmlFor="product-description">Product Description:</label>
              <textarea
                id="product-description"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                required
              />
              <label htmlFor="product-price">Product Price:</label>
              <input
                type="number"
                id="product-price"
                value={productPrice}
                onChange={handleProductPriceChange}
                required
              />
              <label htmlFor="product-image">Product Image:</label>
              <input
                type="file"
                id="product-image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button className="submit-btn" type="submit">
                Add Product
              </button>
            </form>
            <button
              className="close-modal"
              onClick={() => setProductModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isPostModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Post</h2>
            <form onSubmit={handlePostSubmit} className="form">
              <label htmlFor="post-title">Post Title:</label>
              <input
                type="text"
                id="post-title"
                value={postTitle}
                onChange={handlePostTitleChange}
                required
              />
              <label htmlFor="post-description">Write a Post:</label>
              <textarea
                id="post-description"
                value={postDescription}
                onChange={handlePostDescriptionChange}
                required
              />
              <label htmlFor="post-tags">Tags:</label>
              <input
                type="text"
                id="post-tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add a tag"
              />
              <div className="tags-container">
                {postTags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      className="tag-remove-btn"
                      type="button"
                      onClick={() => removeTag(index)}
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
              <button className="submit-button" type="submit">
                Add Post
              </button>
            </form>
            <button
              className="close-modal"
              onClick={() => setPostModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
