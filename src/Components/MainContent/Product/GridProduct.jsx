import React from "react";
import { useCardProducts } from "../../Context/CardState";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
export default function GridProduct({ product }) {
  const { addToCart } = useCardProducts();
  return (
    <div className="mt-6  grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm-y-64 lg:grid-cols-3 lg:col-span-3 xl:gap-x-12 xl:gap-y-12">
      {product.map((product) => (
        <div
          key={product.id}
          className="group relative "
          // onClick={() => setSelectedCategory(product.category)}
        >
          <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg dark:shadow-black/25">
            <img
              src={product.image}
              alt={product.url}
              className="h-full w-full object-fixed object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="absolute top-6 -right-0  group-hover:right-4  flex  flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
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
                  {product.category}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.title}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
