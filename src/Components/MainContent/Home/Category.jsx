import React from "react";
import { useProducts } from "../../Context/StateContext";
import { Link } from "react-router-dom";
// import ProductList from "../Product/ProductList";

export default function Category() {
  const { featureProducts, isLoading, isError } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data.</p>;
  }

  return (
    <>
      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Feature Products
            </h2>

            <div className="mt-6  grid     grid-cols-2  col-span-4 lg:col-span-3 gap-x-12 gap-y-6 lg:grid-cols-3 xl:gap-x-24 xl:gap-y-12">
              {featureProducts.map((product) => (
                <div key={product.id} className="group relative mb-6">
                  <Link to={`/${product.category}`}>
                    <div className="aspect-h-1 aspect-w-1  overflow- rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg dark:shadow-black/30">
                      <img
                        src={product.image}
                        alt={product.image}
                        className="h-full w-full rounded-lg object-fixed object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <span className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {product.category}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
