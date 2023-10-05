import React from "react";
import GridProduct from "./GridProduct";
import ListProduct from "./ListProduct";
import { useFilterProducts } from "../../Context/FilterState";

const ProductView = ({ products }) => {
  const { grid_view } = useFilterProducts();

  if (grid_view === true) {
    return <GridProduct products={products} />;
  }
  if (grid_view === false) {
    return <ListProduct products={products} />;
  }
};
export default ProductView;
