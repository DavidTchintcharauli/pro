import NotFound from "../[lang]/notfound/NotFound";

export default async function fetchProducts({
  fetchItemType,
  debouncedSearch,
  sortOption,
  sortOrder,
}) {
  try {
    let url = `https://dummyjson.com/${fetchItemType}`;
    if (debouncedSearch) {
      url = `https://dummyjson.com/${fetchItemType}/search?q=${debouncedSearch}`;
    }
    if (sortOption && sortOrder) {
      url = `https://dummyjson.com/${fetchItemType}?sortBy=${sortOption}&order=${sortOrder}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return fetchItemType === "posts" ? data.posts || [] : data.products || [];
  } catch (error) {
    return <NotFound page={fetchItemType}></NotFound>;
  }
}
