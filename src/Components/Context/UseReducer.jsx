// // import React from "react";

// const UseReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_LOADING":
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case "SET_API_DATA":
//       const featureData = action.payload.filter((curElem) => {
//         return curElem.feature === true;
//       });
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         products: [],
//         featureProducts: featureData,
//       };

//     case "SET_ERROR":
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     default:
//       return state;
//   }
// };

// export default UseReducer;

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
