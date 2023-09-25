import React, { useEffect, createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

const initialState = {
  products: [],
  featureProducts: [],
  allProducts: [],
  categories: [],
  isLoading: true,
  isError: false,
  cart: [],
  isSingleLoading: false, // Add isSingleLoading property
  singleProduct: {}, // Add singleProduct property
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, isLoading: false };
    case "SET_FEATURE_PRODUCTS":
      return { ...state, featureProducts: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload, isLoading: false };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "SET_SINGLE_LOADING": // Action type for setting isSingleLoading
      return { ...state, isSingleLoading: action.payload };
    case "SET_SINGLE_PRODUCT": // Action type for setting singleProduct
      return { ...state, singleProduct: action.payload };
    default:
      return state;
  }
};

const StateContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://api.pujakaitem.com/api/products")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (url) {
        dispatch({ type: "SET_PRODUCTS", payload: url });

        const featureProducts = url.filter(
          (product) => product.featured === true
        );

        dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
      })
      .catch(function (error) {
        console.error("There was a problem with the fetch operation:", error);
        dispatch({ type: "SET_ERROR", payload: true });
      });
  }, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const getCartItems = () => {
    return state.cart;
  };

  // Function to set isSingleLoading
  const singleLoading = (isLoading) => {
    dispatch({ type: "SET_SINGLE_LOADING", payload: isLoading });
  };

  // Function to set singleProduct
  const singleProduct = (product) => {
    dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        addToCart,
        getCartItems,
        singleLoading, // Add setSingleLoading to context
        singleProduct, // Add setSingleProduct to context
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default StateContext;
