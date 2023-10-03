import { useEffect } from "react";
import { useParams } from "react-router-dom";

import PageNavigation from "./PageNavigation";
import MyImage from "../Helper/MyImage";
import PakPrice from "../Helper/PakPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "../Helper/Stars";
import { useProducts } from "../../Context/StateContext";

const API = "https://api.pujakaitem.com/api/products";

const ProCategory = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProducts();
  const { id } = useParams();

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  });

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <div className="container py-8 md:py-16 lg:py-20 xl:py-24">
      <PageNavigation title={category} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Images */}
        <div className="flex items-center justify-center">
          <MyImage imgs={image} />
        </div>

        {/* Product Data */}
        <div className="flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            {name}
          </h2>
          <Star stars={stars} reviews={reviews} />

          <p className="text-lg md:text-xl xl:text-2xl font-semibold">
            MRP:
            <del className="ml-2">
              <PakPrice price={price + 250000} />
            </del>
          </p>
          <p className="text-xl md:text-2xl text-blue-500">
            Deal of the Day: <PakPrice price={price} />
          </p>
          <p className="text-sm md:text-base">{description}</p>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <TbTruckDelivery className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full p-1 md:p-2" />
              <p>Free Delivery</p>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <TbReplace className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full p-1 md:p-2" />
              <p>30 Days Replacement</p>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <TbTruckDelivery className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full p-1 md:p-2" />
              <p>Thapa Delivered</p>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <MdSecurity className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full p-1 md:p-2" />
              <p>2 Year Warranty</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <p>
              Available:
              <span
                className={`font-semibold ${
                  stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock > 0 ? "In Stock" : "Not Available"}
              </span>
            </p>
            <p>
              ID : <span className="font-semibold">{id}</span>
            </p>
            <p>
              Brand : <span className="font-semibold">{company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProCategory;
