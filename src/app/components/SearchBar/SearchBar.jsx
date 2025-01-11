"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar({ searchItemType }) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const router = useRouter();
  useEffect(() => {
    if (debouncedValue) {
      router.push(`?search=${debouncedValue}`);
    }
  }, [debouncedValue, router]);

  return (
    <div className="text-gray-200 border border-solid border-gray-400 rounded-xl p-3 dark:border-gray-200 bg-gray-800 ">
      Search:{"  "}
      <input
        className="rounded-xl placeholder:p-2"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (e.target.value === "") {
            if (searchItemType === "Search Posts") router.push("/posts");
            if (searchItemType === "Search Products") router.push("/products");
          }
        }}
        placeholder={searchItemType}
        title="search"
      ></input>
    </div>
  );
}
