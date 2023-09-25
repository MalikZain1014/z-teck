import React from "react";
import PakPrice from "../../Context/PakPrice";
import { Link } from "react-router-dom"; // Import Link
import { useProducts } from "../../Context/StateContext";
import { BsPlus, BsEyeFill } from "react-icons/bs"; // Import BsPlus icon

export default function ProductList() {
  const { products, isLoading, isError, addToCart } = useProducts(); // Destructure addToCart function

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <p>Loading...</p>;
  }

  if (isError) {
    // Display an error message if there was an error during data fetching
    return <p>Error fetching data.</p>;
  }

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-4  xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 shadow-lg dark:shadow-black/30">
                <img
                  src={product.image}
                  alt={product.url}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={() => addToCart(product)}>
                  <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                    <BsPlus className="text-3xl" />
                  </div>
                </button>
                <Link
                  to={`/product/${product.id}`} // Use the product's ID
                  className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                >
                  <BsEyeFill />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  <PakPrice price={product.price} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
