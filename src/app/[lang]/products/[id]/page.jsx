
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";

export default async function ProductPage(params) {
  const { id } = params.params;
  const fetchItemType = "products";
  var product;

  product = await fetchSingleProduct({ fetchItemType, id });

  if (!product.id) return <NotFound page="products" />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900 p-5">
      <h1 className="text-3xl font-bold underline cursor-pointer text-gray-800 dark:text-gray-200 mb-4">
        {product.title}
      </h1>
      <img
        className="w-80 h-80 object-cover mb-4 rounded-lg shadow-md"
        src={product.images}
        alt={product.title}
      />
      <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        <span className="font-semibold">Tags:</span>
        {product.tags.map((tag, index) => (
          <span
            className="bg-gray-300 rounded-xl p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2"
            key={index}
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="border border-gray-500 rounded-lg p-2 mb-4 bg-white dark:bg-neutral-800">
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
          Price: ${product.price}
        </span>
      </div>
      <ReturnBackButton destination="products" />
    </div>
  );
}
