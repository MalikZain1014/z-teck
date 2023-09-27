import React, { useEffect, createContext, useContext, useReducer } from "react";
import Data from "../../Data.json"; // Import the local JSON file

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

const initialState = {
  products: [],
  featureProducts: [],
  allProducts: [],
  categories: [],
  isLoading: true, // Initialize isLoading as true
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, isLoading: false };
    case "SET_FEATURE_PRODUCTS":
      return { ...state, featureProducts: action.payload };
    case "SET_TOP_SLIDER":
      return { ...state, topSlider: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload, isLoading: false };
    default:
      return state;
  }
};

const StateContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Use the imported local JSON data instead of Axios
    const products = Data; // Data is now the imported JSON file

    if (products && products) {
      dispatch({ type: "SET_PRODUCTS", payload: products });

      // Filter myJson.products to get only feature products
      const featureProducts = products.filter(
        (product) => product.feature === true
      );

      // You can similarly filter for topSlider

      dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
      // dispatch({ type: "SET_TOP_SLIDER", payload: topSlider });
    } else {
      // Handle the case where myJson or myJson.products is undefined
      dispatch({ type: "SET_ERROR", payload: true });
    }
  }, []);

  return (
    <ProductContext.Provider value={{ ...state }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default StateContext;

// import { createContext, useContext, useEffect, useReducer } from "react";
// import axios from "axios";
// import reducer from "./UseReducer";

// const ProductContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";

// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
//   isSingleLoading: false,
//   singleProduct: {},
// };

// const StateContext = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const getProducts = async (url) => {
//     dispatch({ type: "SET_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const products = await res.data;
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };

//   // my 2nd api call for single product

//   const getSingleProduct = async (url) => {
//     dispatch({ type: "SET_SINGLE_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const singleProduct = await res.data;
//       dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
//     } catch (error) {
//       dispatch({ type: "SET_SINGLE_ERROR" });
//     }
//   };

//   useEffect(() => {
//     getProducts(API);
//   }, []);

//   return (
//     <ProductContext.Provider value={{ ...state, getSingleProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// // custom hooks

// export const useProducts = () => {
//   return useContext(ProductContext);
// };

// export default StateContext;
