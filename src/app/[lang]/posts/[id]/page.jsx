import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";

export default async function PostPage(params) {
  const { id } = params.params;
  const fetchItemType = "posts";
  var post;

  post = await fetchSingleProduct({ fetchItemType, id });

  if (!post.id) return <NotFound page="posts" />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900 p-5">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl border border-gray-700 rounded-2xl bg-gray-200 dark:bg-gray-800 gap-5 p-5 shadow-lg">
        <h1 className="underline font-serif cursor-pointer text-black dark:text-gray-300 text-3xl font-bold">
          {post.title}
        </h1>
        <p className="text-black dark:text-gray-300 font-serif font-normal text-lg">
          {post.body}
        </p>
        <div className="text-black dark:text-gray-200 font-sans">
          <span className="font-semibold">Tags:</span>{" "}
          {post.tags.map((tag, index) => (
            <span
              className="bg-gray-400 dark:bg-gray-700 text-black dark:text-gray-200 p-2 m-2 rounded-lg"
              key={index}
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-black dark:text-gray-300 font-serif font-normal">
          <span className="font-semibold">Views:</span> {post.views}
        </div>
        <ReturnBackButton destination="posts" className="mt-4" />
      </div>
    </div>
  );
}
