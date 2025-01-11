import NotFound from "../[lang]/notfound/NotFound";

export default async function fetchSingleProduct({ id, fetchItemType }) {
  try {
    let url = `https://dummyjson.com/${fetchItemType}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      return <NotFound page={fetchItemType}></NotFound>;
    }
    const fetchedPost = await response.json();
    return fetchedPost;
  } catch (error) {
    console.error("Failed to find product:", error);
    return <NotFound page={fetchItemType}></NotFound>;
  }
}
