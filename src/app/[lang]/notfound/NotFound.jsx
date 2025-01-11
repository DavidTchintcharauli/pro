import Link from "next/link";
export function ReturnBackButton({ destination }) {
  return (
    <Link
      className="flex flex-col bg-red-700 text-white text-2xl p-3 m-6 items-center border border-solid rounded-50 border-black"
      href={`/${destination}`}
    >
      <button>Go back </button>
    </Link>
  );
}

export default function NotFound(props) {
  return (
    <div className="flex flex-col items-center border border-solid rounded-50 border-black">
      <h1 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
        Oops! Page Not Found
      </h1>
      <p className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
        The page you are looking for does not exist.
      </p>
      <ReturnBackButton destination={props.page} />
    </div>
  );
}
