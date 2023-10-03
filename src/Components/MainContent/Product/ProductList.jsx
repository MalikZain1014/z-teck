import React, { useState } from "react";
import { useProducts } from "../../Context/StateContext";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useCardProducts } from "../../Context/CardState";

export default function ProductList() {
  const { products, isLoading, isError } = useProducts();
  const { addToCart } = useCardProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <div className="bg-transparent">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mb-4">
            <button
              className={`${
                selectedCategory === null
                  ? "text-white bg-blue-700 "
                  : "bg-blue-300 hover:text-blue-900"
              } px-4 py-2 rounded-md mr-2 mb-2`}
              onClick={() => handleCategoryClick(null)} // Correct
            >
              Clear All Filters
            </button>

            {uniqueCategories.map((category) => (
              <button
                key={category}
                className={`${
                  selectedCategory === category
                    ? "text-white bg-blue-700 "
                    : "bg-blue-300 hover:text-blue-900"
                } px-4 py-2 rounded-md mr-2 mb-2`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6  grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm-y-64 lg:grid-cols-4 xl:gap-x-8 xl:gap-y-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative "
                // onClick={() => setSelectedCategory(product.category)}
              >
                <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg dark:shadow-black/30">
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
                    <p className="mt-1 text-sm text-gray-500">
                      {product.title}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
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
