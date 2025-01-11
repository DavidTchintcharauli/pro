import { Product } from "./fetchProducts";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({
  product,
  locale,
}: ProductCardProps): JSX.Element {
  const title = locale === "ka" ? product.title_ge : product.title_en;
  const description =
    locale === "ka" ? product.description_ge : product.description_en;

  return (
    <div
      key={product.id}
      className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden p-4"
    >
      <img
        src={product.image}
        alt={title || "პროდუქტის სურათი"}
        className="w-48 h-48 object-cover rounded-lg"
      />
      <div className="ml-4 flex flex-col justify-center">
        <h4 className="text-lg font-semibold text-gray-800">
          {title || "სათაური არ არის ხელმისაწვდომი"}
        </h4>
        <div className="text-green-500 font-bold text-lg mt-2">
          {product.price} $
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {description || "აღწერა არ არის ხელმისაწვდომი"}
        </p>
      </div>
    </div>
  );
}
