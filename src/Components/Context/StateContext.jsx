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
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (myJson) {
        dispatch({ type: "SET_PRODUCTS", payload: myJson });

        // Filter myJson to get only feature products
        const featureProducts = myJson.filter(
          (product) => product.feature === true
        );
        const topSlider = myJson.filter((product) => product.feature === true);

        dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
        dispatch({ type: "SET_TOP_SLIDER", payload: topSlider });
      })
      .catch(function (error) {
        console.error("There was a problem with the fetch operation:", error);
        dispatch({ type: "SET_ERROR", payload: true });
      });
  }, []);

  return (
    <ProductContext.Provider value={state}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default StateContext;

// import React, { useReducer, useEffect, createContext, useContext } from "react";
// import axios from "axios";
// import AllData from "./Item.json";
// import reducer from "./UseReducer";

// const ProductContext = createContext();

// export const useProducts = () => {
//   return useContext(ProductContext);
// };
// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
// };

// const StateContext = (props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const getProducts = async (AllData) => {
//     dispatch({ type: "SET_LOADING" });
//     try {
//       const res = await axios.get(`./Item.json`);
//       const products = await res.data;
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };

//   useEffect(() => {
//     getProducts(AllData);
//   }, []);

//   return (
//     <ProductContext.Provider value={state.products}>
//       console.log("🚀 ~ file: StateContext.jsx:38 ~ StateContext ~ products:",
//       products)
//       {props.children}
//     </ProductContext.Provider>
//   );
// };

// export default StateContext;

// import React, { useReducer } from "react";
// import NodeContext from "./NodeContext";
// import { useEffect } from "react";
// import axios from "axios";
// import reducer from "./UseReducer";
// const API = "https://fakestoreapi.com/products";

// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
// };

// const StateContext = (props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const getProducts = async (url) => {
// dispatch({ type: "SET_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const products = await res.data;
//       console.log(
//         "🚀 ~ file: StateContext.jsx:23 ~ getProducts ~ products:",
//         products
//       );
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };

// useEffect(() => {
//   getProducts(API);
// }, []);
//   return (
//     <NodeContext.Provider value={{ ...state }}>
//       {props.children}
//     </NodeContext.Provider>
//   );
// };

// export default StateContext;

// import React, { useEffect, useReducer } from "react";
// import NodeContext from "./NodeContext";
// import reducer from "./UseReducer";
// import axios from "axios";
// const API = "https://fakestoreapi.com/products";
// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
// };
// const StateContext = (props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const GetAllData = async (url) => {
//     dispatch({ type: "SET_LOADING" });
//     try {
//       const res = await axios.get(url);
//       const products = await res.data;
//       dispatch({ type: "SET_API_DATA", payload: products });
//       console.log(
//         "🚀 ~ file: StateContext.jsx:65 ~ GetAllData ~ products:",
//         products
//       );
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };
//   useEffect(() => {
//     GetAllData(API);
//   }, []);
//   return (
//     <NodeContext.Provider value={{ ...state }}>
//       {props.childern}
//     </NodeContext.Provider>
//   );
// };
// export default StateContext;
