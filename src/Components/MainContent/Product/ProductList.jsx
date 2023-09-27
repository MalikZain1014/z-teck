import React from "react";

import { Link } from "react-router-dom";
import { useProducts } from "../../Context/StateContext";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useCardProducts } from "../../Context/CardState";
import PageNavigation from "./PageNavigation"; // Import PageNavigation component

export default function ProductList() {
  const { products, featureProducts, isLoading, isError } = useProducts();
  const { addToCart } = useCardProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  // Access featureProducts directly from the state
  const { category } = featureProducts;

  return (
    <>
      <strong className="px-4 py-8 mx-auto">
        <PageNavigation title={category} />
      </strong>
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6  grid grid-cols-1 gap-x-18 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg dark:shadow-black/30">
                  <img
                    src={product.image}
                    alt={product.url}
                    className="h-full w-full object-fixed object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="absolute top-6 -right-5  group-hover:right-2  flex  flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => addToCart(product, product.id)}>
                    <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                      <BsPlus className="text-3xl" />
                    </div>
                  </button>
                  <Link
                    to={`/allproduct/${product.category}/${product.id}`}
                    className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                  >
                    <BsEyeFill />
                  </Link>
                </div>

                <div className=" relative mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $ {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
