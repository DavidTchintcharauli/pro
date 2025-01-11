"use client";

import Link from "next/link";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropDown from "../../components/DropDown/DropDown";
import fetchProducts from "../../fetcher/fetchProducts";
import { useEffect, useState } from "react";
import ProductActions from "../../components/buttons/ProductActions";
import AddButton from "../../components/AddButton/AddButton";
import { useRouter } from "next/navigation";

export default function Posts({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "posts";
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState();
  const router = useRouter();
  const postInfo =
    "bg-gray-400 dark:bg-gray-200 font-sans p-2 rounded-xl text-xl m-2";

  const sortOptions = [
    {
      label: "Views: Low to High",
      value: "vews-low-to-high",
      option: "views",
      order: "asc",
    },
    {
      label: "Views: High to Low",
      value: "views-high-to-low",
      option: "views",
      order: "desc",
    },
    {
      label: "Title: A-Z",
      value: "title-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Title: Z-A",
      value: "title-descending",
      option: "title",
      order: "desc",
    },
  ];

  function editProducts({ posts, setPosts }) {
    return function changeProductproducts(post) {
      posts.forEach((item) => {
        if (item.id === post.id) {
          const index = posts.indexOf(item);
          const newArray = posts;
          newArray[index] = post;

          setPosts(newArray);
        }
      });
    };
  }

  const deleteProduct = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addPost = (item) => {
    const newId = Date.now();
    const itemWithId = { ...item, id: newId };
    setPosts((prevPosts) => [...prevPosts, itemWithId]);
  };

  const toggleHandler = (option, order) => {
    router.push(`?option=${option}&order=${order}`);
  };

  useEffect(() => {
    async function fetch() {
      var postsArray = await fetchProducts({
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder,
      });
      setPosts(postsArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  var callBack = editProducts({ posts, setPosts });

  function onEditingChange(editing) {
    setEditing(editing);
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <SearchBar searchItemType="Search Posts" className="mt-5" />
        <h2 className="text-black dark:text-gray-200 font-bold text-2xl">
          Could not find anything...
        </h2>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-neutral-100 dark:bg-neutral-900 min-h-screen">
        <div className="flex flex-col items-center p-5 relative">
          <SearchBar searchItemType="Search Posts" className="mb-5" />
        </div>
        <div className="fixed left-2 top-28 z-10">
          <DropDown
            buttonText="Sort Products By:"
            content={sortOptions}
            toggleHandler={toggleHandler}
            type="Sorter"
          ></DropDown>
        </div>
        <div>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="flex flex-col border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-900 p-5 my-4 mx-5 transition-shadow hover:shadow-xl"
              >
                <Link href={`/posts/${post.id}`}>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-3 hover:underline">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-800 dark:text-gray-300 mb-5">{post.body}</p>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>Views: {post.views}</span>
                  <span>Likes: {post.reactions.likes}</span>
                  <span>Dislikes: {post.reactions.dislikes}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-3">
                  <span>Post ID: {post.id}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <span>Tags: </span>
                  {post.tags.map((tag, index) => (
                    <span
                      key={`${post.id}-${tag}-${index}`}
                      className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1 rounded-full m-1 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <ProductActions
                  type="posts"
                  product={post}
                  setProductCallBack={callBack}
                  onEditingChange={onEditingChange}
                  deleteProductCallback={deleteProduct}
                />
              </div>
            );
          })}
        </div>
        <AddButton item="Posts" addProduct={addPost} className="mt-5" />
      </div>
    </div>
  );
}
