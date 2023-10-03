import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../MainContent/Helper/CardItem";
import { useCardProducts } from "../Context/CardState";

const ShoppingCard = () => {
  const { isOpen, handleClose, cart, clearCart, itemAmount, total } =
    useCardProducts();

  const cartItems = useMemo(
    () => cart.map((item) => <CartItem item={item} key={item.id} />),
    [cart]
  );

  const formattedTotal = useMemo(() => parseFloat(total).toFixed(2), [total]);

  const handleClearCart = useCallback(() => clearCart(), [clearCart]);
  const handleButtonClick = () => {
    // Call the handleClose function to close the shopping cart
    handleClose();
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed  top-0 h-auto shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-10 px-4 lg:px-[15px]`}
    >
      <div className="flex items-center justify-between pt-6  border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleButtonClick}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cartItems}
      </div>
      <div className="flex flex-col gap-y-1  ">
        <div className="flex w-full justify-between items-center">
          {/* total */}
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> $ {formattedTotal}
          </div>
          {/* clear cart icon */}
          <div
            onClick={handleClearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-blue-600  w-full font-medium lg:px-8"
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-blue-600 w-full font-medium lg:px-8"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCard;
