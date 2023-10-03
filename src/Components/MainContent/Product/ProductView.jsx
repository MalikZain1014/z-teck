import React from "react";
import GridProduct from "./GridProduct";
import ListProduct from "./ListProduct";
import { useFilterProducts } from "../../Context/FilterState";

const ProductView = () => {
  const { filter_products, grid_view } = useFilterProducts();

  if (grid_view === true) {
    return <GridProduct product={filter_products} />;
  }
  if (grid_view === false) {
    return <ListProduct product={filter_products} />;
  }
};
export default ProductView;
