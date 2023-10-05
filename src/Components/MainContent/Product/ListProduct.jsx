// import Link from "react-router-dom";

import { useCardProducts } from "../../Context/CardState";

// import { Button } from "../styles/Button";

const ListProduct = ({ products }) => {
  const { addToCart } = useCardProducts();
  return (
    <div className=" ">
      <div className=" grid">
        {products.map((product) => {
          const { image, title, description, price } = product;
          const Description = description.slice(0, 99);
          return (
            <section
              className="overflow-hedden p-20 md:pb-12  h-full flex items-center  "
              key={product.id}
            >
              <div className="container mx-auto">
                {/* image and text wrapper */}
                <div className="flex  items-center key={product.id}">
                  {/* image */}
                  <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                    <img className="max-w-20 max-w-xs" src={image} alt="" />
                  </div>
                  {/* text */}
                  <div className="flex-1 pl-20 text-left">
                    <h1 className="text-lm font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                      {title}
                    </h1>
                    <div className="text-2xl text-red-500 font-medium mb-6">
                      $ {price}
                    </div>
                    <p className="mb-8 text-sm ">{Description}...</p>
                    <button
                      onClick={() => addToCart(product, product.id)}
                      className="bg-blue-500 py-4 px-8 text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
