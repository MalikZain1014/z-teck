import { createContext, useContext, useReducer, useEffect } from "react";
import { useProducts } from "./StateContext";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "SET_SORT_OPTION":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.field]: action.value,
        },
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  filter_products: [],
  subCategories: [],
  grid_view: true,
  sorting_value: "lowest",
  filter: {
    color: "all",
    // category: "all",
    size: "all",
  },
};

// Create context
const FilterContext = createContext();

// Custom hook for using filter state
export const useFilterProducts = () => {
  return useContext(FilterContext);
};

// FilterStateProvider component
const FilterStateProvider = ({ children }) => {
  const { products } = useProducts();

  const [state, dispatch] = useReducer(reducer, initialState);

  // Functions for setting grid view, list view, and handling filters
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };
  const sortOptions = (option) => {
    return dispatch({ type: "SET_SORT_OPTION", payload: option });
  };

  const filters = (field, value) => {
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
        sortOptions,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterStateProvider;
