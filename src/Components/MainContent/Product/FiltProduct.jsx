import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { useProducts } from "../../Context/StateContext";

import { useFilterProducts } from "../../Context/FilterState";
import ProductView from "./ProductView";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";

// const subCategories = [
//   { name: "Totes", href: "#" },
//   { name: "Backpacks", href: "#" },
//   { name: "Travel Bags", href: "#" },
//   { name: "Hip Bags", href: "#" },
//   { name: "Laptop Sleeves", href: "#" },
// ];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FiltProduct() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { isLoading, isError } = useProducts();
  const { filter_products, setGridView, setListView, grid_view } =
    useFilterProducts();

  // State for sorting option
  const [sortingOption, setSortingOption] = useState("lowest");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const MemoizedProductView = React.memo(ProductView);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }
  const uniqueCategories = [
    ...new Set(filter_products.map((product) => product.category)),
  ];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const filteredProducts =
    selectedCategory === null
      ? filter_products
      : filter_products.filter(
          (product) => product.category === selectedCategory
        );
  // Sorting function
  // const sortProducts = (products, option) => {
  //   if (option === "lowest") {
  //     return [...products].sort((a, b) => a.price - b.price);
  //   } else if (option === "highest") {
  //     return [...products].sort((a, b) => b.price - a.price);
  //   }
  //   // Add more sorting options as needed
  //   return products;
  // };

  const handleSortChange = (option) => {
    setSortingOption(option);
  };
  return (
    <div className="bg-trasparent">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white  py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-red-500 p-2 text-white"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-blue-600">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="px-2 py-3 font-medium text-gray-900">
                      {uniqueCategories.map((category) => (
                        <div
                          key={category}
                          className={`${
                            selectedCategory === category
                              ? "text-white bg-blue-700  "
                              : "bg-white hover:text-blue-900"
                          } px-4 py-2 rounded mr-2 mb-2 capitalize`}
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-blue-600 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-blue-600 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    <div
                      className={`${
                        selectedCategory === null
                          ? "text-white bg-blue-700 "
                          : "bg-red-600 hover:text-white text-gray-100"
                      } px-4 py-2 rounded mx-1 mt-2`}
                      onClick={() => handleCategoryClick(null)} // Correct
                    >
                      CLEAR ALL
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-blue-600 pb-6 pt-24 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleSortChange("lowest")}
                            className={classNames(
                              sortingOption === "lowest"
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Lowest Price
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleSortChange("highest")}
                            className={classNames(
                              sortingOption === "highest"
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Highest Price
                          </button>
                        )}
                      </Menu.Item>
                      {/* Add more sorting options as needed */}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className={
                  grid_view
                    ? " active -m-2 ml-2 p-2 text-gray-800 hover:text-white sm:ml-7"
                    : "-m-2 ml-2 p-2 text-gray-600 hover:text-gray-700 sm:ml-7"
                }
                onClick={setGridView}
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={
                  !grid_view
                    ? " active -m-2 ml-2 p-2 text-gray-800 hover:text-white sm:ml-7"
                    : "-m-2 ml-2 p-2 text-gray-600 hover:text-gray-700 sm:ml-7"
                }
                onClick={setListView}
              >
                <span className="sr-only">View grid</span>
                <BsList className="h-5 w-5 " aria-hidden="true" />
              </button>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 ">
            <h2 id="products-heading" className="sr-only ">
              Products
            </h2>

            <div className="grid grid-cols-4 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              {/* Filters */}
              <form className="hidden lg:block ">
                <h3 className="sr-only">Categories</h3>
                <ul className="px-2 py-3 font-medium text-gray-900">
                  <Link className="mb-4 text-">
                    {uniqueCategories.map((category) => (
                      <div
                        key={category}
                        className={`${selectedCategory === category}
                           border-b border-gray-200 pt-6 capitalize text-sm font-medium text-gray-900`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </Link>
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-blue-600 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-blue-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Link to="">
                  <div
                    className={`${
                      selectedCategory === null
                        ? "text-white bg-blue-700 "
                        : "bg-red-600 hover:text-white text-gray-100"
                    } px-4 py-2 rounded mt-2`}
                    onClick={() => handleCategoryClick(null)} // Correct
                  >
                    CLEAR ALL
                  </div>
                </Link>
              </form>

              <MemoizedProductView products={filteredProducts} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
