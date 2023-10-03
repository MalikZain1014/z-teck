import { createContext, useContext, useReducer, useEffect } from "react";
import { useProducts } from "./StateContext";
import reducer from "./FilterReducer";

const FilterContext = createContext();
export const useFilterProducts = () => {
  return useContext(FilterContext);
};
const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    color: "all",
    category: "all",
    size: "all",
  },
};

const FilterStateProvider = ({ children }) => {
  const { products } = useProducts();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };
  const setSortingOption = (option) => {
    return dispatch({ type: "SET_SORT_OPTION", payload: option });
  };

  const setFilter = (field, value) => {
    return dispatch({ type: "SET_FILTER", field, value });
  };
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        setSortingOption,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterStateProvider;
