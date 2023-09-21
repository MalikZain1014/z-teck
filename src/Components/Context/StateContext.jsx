import React, { useReducer } from "react";
import NodeContext from "./NodeContext";
import { useEffect } from "react";
import axios from "axios";
import reducer from "./UseReducer";
const API = "https://fakestoreapi.com/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
};

const StateContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      console.log(
        "🚀 ~ file: StateContext.jsx:23 ~ getProducts ~ products:",
        products
      );
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);
  return (
    <NodeContext.Provider value={{ ...state }}>
      {props.children}
    </NodeContext.Provider>
  );
};

export default StateContext;

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
