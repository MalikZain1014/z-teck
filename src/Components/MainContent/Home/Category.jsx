import React from "react";
import { useProducts } from "../../Context/StateContext";

export default function Category() {
  const { featureProducts, isLoading, isError } = useProducts();

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <p>Loading...</p>;
  }

  if (isError) {
    // Display an error message if there was an error during data fetching
    return <p>Error fetching data.</p>;
  }

  return (
    <>
      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {featureProducts.map((product) => (
                <div key={product.id} className="group relative mb-6">
                  <div className="relative h-full  w-full overflow-hidden rounded-lg bg-white md:aspect-h-1 md:aspect-w-1 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64 shadow-lg dark:shadow-black/30">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-full w-full  object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={product.href}>
                      <span className="absolute inset-0" />
                      {product.category}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {product.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
