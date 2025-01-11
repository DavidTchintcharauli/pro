"use client";

import Link from "next/link";
import DropDown from "../../components/DropDown/DropDown";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducts from "../../fetcher/fetchProducts";
import ProductActions from "../../components/buttons/ProductActions";
import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";
import { useRouter } from "next/navigation";

export default function Products({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "products";
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState();
  const router = useRouter();

  const sortOptions = [
    {
      label: "Price: Low to High",
      value: "price-low-to-high",
      option: "price",
      order: "asc",
    },
    {
      label: "Price: High to Low",
      value: "price-high-to-low",
      option: "price",
      order: "desc",
    },
    {
      label: "Name: A-Z",
      value: "name-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Name: Z-A",
      value: "name-descending",
      option: "title",
      order: "desc",
    },
  ];

  function editProducts({ products, setProducts }) {
    return function changeProductproducts(product) {
      products.forEach((item) => {
        if (item.id === product.id) {
          const index = products.indexOf(item);
          const newArray = products;
          newArray[index] = product;
          setProducts(newArray);
        }
      });
    };
  }

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const addProduct = (item) => {
    const newId = Date.now();
    const itemWithId = { ...item, id: newId };
    setProducts((prevProducts) => [...prevProducts, itemWithId]);
  };
  const toggleHandler = (option, order) => {
    router.push(`?option=${option}&order=${order}`);
  };

  useEffect(() => {
    async function fetch() {
      var productArray = await fetchProducts({
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder,
      });
      setProducts(productArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  var callBack = editProducts({ products, setProducts });

  function onEditingChange(editing) {
    setEditing(editing);
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <SearchBar searchItemType="Search Products" className="mt-5" />
        <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
          Could not find anything...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <div className="relative flex flex-col items-center p-5">
        <SearchBar searchItemType="Search Products" className="mb-5" />
        <div className="fixed left-2 flex flex-col">
          <DropDown
            buttonText="Sort Products By:"
            content={sortOptions}
            toggleHandler={toggleHandler}
            type="Sorter"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 p-5 my-4 mx-5 transition-shadow hover:shadow-xl"
            >
              <img
                className="object-cover w-full h-48"
                src={product.thumbnail}
                alt={product.title}
              />
              <Link href={`/products/${product.id}`} className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 hover:underline">
                  {product.title}
                </h3>
              </Link>
              <p className="p-4 text-gray-800 dark:text-gray-300 mb-5">
                {product.description}
              </p>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Price: <span className="font-bold">${product.price}</span></span>
              </div>
              <ProductActions
                type="products"
                product={product}
                setProductCallBack={callBack}
                onEditingChange={onEditingChange}
                deleteProductCallback={deleteProduct}
              />
            </div>
          ))}
        </div>
        <AddButton item="Products" addProduct={addProduct} className="mt-5" />
      </div>
    </div>
  );
}
