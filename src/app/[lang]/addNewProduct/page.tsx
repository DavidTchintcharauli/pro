"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./style.css";
import { createClient } from "../../../utils/supabase/client";

let tagArray = ["", "", ""];
type ImageState = {
  url: string;
  file: File | null;
};
export default function AddNewProduct() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<ImageState | null>({
    url: "",
    file: null,
  });
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  });

  function handleImageUpload(file: File) {
    let url = URL.createObjectURL(file);
    setImageUrl({
      url: url,
      file: file,
    });
  }

  function deleteImage() {
    setImageUrl({
      url: "",
      file: null,
    });
  }

  async function submitProduct(
    formData: FormData,
    formElement: HTMLFormElement
  ) {
    try {
      // Collect form data

      const {
        data: { user },
      } = await supabase.auth.getUser();
      debugger;
      if (user) {
        const title_en = formData.get("title_en") as string;
        const title_ge = formData.get("title_ge") as string;
        const description_en = formData.get("description_en") as string;
        const description_ge = formData.get("description_ge") as string;
        const gender = formData.get("gender") as string;
        const category = formData.get("category") as string;
        const price = formData.get("price") as string;
        const size = formData.get("size") as string;
        debugger;

        const tags: string[] = [];
        for (let i = 0; i < tagArray.length; i++) {
          const tag = formData.get(`tag-${i}`) as string;
          if (tag?.trim()) tags.push(tag.trim());
        }

        if (!title_en || !title_ge || !price || !category || !size) {
          throw new Error("Please fill out all required fields.");
        }
        const productData = {
          title_en,
          title_ge,
          description_en,
          description_ge,
          gender,
          category,
          price,
          size,
          tags,
          name: imageUrl?.file?.name as string,
          image: await fileToBase64(),
        };

        const response = await fetch("/api/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          throw new Error(`Failed to add product: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Product added successfully:", result);

        formElement.reset();
        deleteImage();

        setMessage("Product added successfully!");
        hideMessageAfterDelay();
      } else {
        setMessage("Login to add product!");
        hideMessageAfterDelay();
      }
    } catch (error) {
      console.error("Error adding product:", error);

      setMessage("Error adding product. Please try again.");
      hideMessageAfterDelay();
    }
  }
  function fileToBase64() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
      debugger;

      reader.readAsDataURL(imageUrl.file);
    });
  }
  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage(null);
    }, 1000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    debugger;

    submitProduct(formData, event.currentTarget);
  };

  return (
    <div className="addNewProduct-container">
      <form onSubmit={handleSubmit} className="addNewProduct-form">
        <div className="addNewProduct-Info">
          <div className="border-b-2 border-[#98cddf] mb-5">
            <h3>ინფორმაცია</h3>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="title_en" className="mb-2">
                Title
              </label>
              <input
                id="title_en"
                name="title_en"
                type="text"
                placeholder="Title"
                required
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="title_ge" className="mb-2">
                სათაური
              </label>
              <input
                id="title_ge"
                name="title_ge"
                type="text"
                placeholder="სათაური"
                required
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid gap-5 mt-5 grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2">Description</label>
              <textarea
                id="description_en"
                name="description_en"
                placeholder="Description"
                className="h-24 p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">აღწერა</label>
              <textarea
                id="description_ge"
                name="description_ge"
                placeholder="აღწერა"
                required
                className="h-24 p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid gap-5 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col">
              <label className="mb-2">Gender</label>
              <select id="gender" name="gender" className="p-2 border rounded">
                <option value="woman">ქალი</option>
                <option value="man">კაცი</option>
                <option value="girl">გოგო</option>
                <option value="boy">ბიჭი</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Category</label>
              <select
                id="category"
                name="category"
                className="p-2 border rounded"
              >
                <option value="pants">შარვალი</option>
                <option value="jeans">ჯინსი</option>
                <option value="shorts">შორტები</option>
                <option value="coat">ქურთუკი</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Size</label>
              <select id="size" name="size" className="p-2 border rounded">
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                required
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div className="mb-2 flex gap-2 items-center">
              <label>Tags</label>
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {tagArray.map((tag, index) => (
                <input
                  key={index}
                  className="p-2 border rounded"
                  placeholder={`Tag ${index + 1}`}
                  name={`tag-${index}`}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "5px",
              alignItems: "center",
              border: "1px dashed #98cddf",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            {imageUrl.url !== "" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  position: "relative",
                }}
                key={"image"}
              >
                <Image
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #98cddf",
                  }}
                  width={120}
                  height={120}
                  alt=""
                  src={imageUrl.url}
                />
                <svg
                  style={{
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={() => {
                    deleteImage();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            )}
            {imageUrl.url.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <svg
                  onClick={() => {
                    document.getElementById(`ImgInput`).click();
                  }}
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    width: "100px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
                <p>Upload Image</p>
                <input
                  onChange={(e) => {
                    handleImageUpload(e.target.files[0]);
                  }}
                  id={`ImgInput`}
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  name="image"
                  required
                ></input>
              </div>
            )}
          </div>
          <button
            style={{
              padding: "10px",
              marginTop: "20px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
            type="submit"
          >
            Add Product to Stripe
          </button>
        </div>
      </form>

      {message && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "all 0.5s linear",
            padding: "20px",
            backgroundColor: message.includes("successfully")
              ? "#d4edda"
              : "#f8d7da",
            color: message.includes("successfully") ? "#155724" : "#721c24",
            border: `1px solid ${
              message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"
            }`,
            borderRadius: "5px",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
