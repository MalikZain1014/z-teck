const FilterReducer = (state, action) => {
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
    case "SELECT_SUBCATEGORY":
      return {
        ...state,
        selectedSubcategory: action.payload,
      };

    default:
      return state;
  }
};
export default FilterReducer;
//

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
// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   // cart state
//   const [cart, setCart] = useState([]);
//   // item amount state
//   const [itemAmount, setItemAmount] = useState(0);
//   // total price state
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const total = cart.reduce((accumulator, currentItem) => {
//       return accumulator + currentItem.price * currentItem.amount;
//     }, 0);
//     setTotal(total);
//   }, [cart]);

//   // update item amount
//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((accumulator, currentItem) => {
//         return accumulator + currentItem.amount;
//       }, 0);
//       setItemAmount(amount);
//     }
//   }, [cart]);

//   // add to cart
//   const addToCart = (product, id) => {
//     const newItem = { ...product, amount: 1 };
//     // check if the item is already in the cart
//     const cartItem = cart.find((item) => {
//       return item.id === id;
//     });
//     if (cartItem) {
//       const newCart = [...cart].map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount + 1 };
//         } else return item;
//       });
//       setCart(newCart);
//     } else {
//       setCart([...cart, newItem]);
//     }
//   };

//   // remove from cart
//   const removeFromCart = (id) => {
//     const newCart = cart.filter((item) => {
//       return item.id !== id;
//     });
//     setCart(newCart);
//   };

//   // cleart cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // increase amount
//   const increaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     addToCart(cartItem, id);
//   };

//   // decrease amount
//   const decreaseAmount = (id) => {
//     const cartItem = cart.find((item) => item.id === id);
//     if (cartItem) {
//       const newCart = cart.map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: cartItem.amount - 1 };
//         } else {
//           return item;
//         }
//       });
//       setCart(newCart);
//     }
//     if (cartItem && cartItem.amount <= 1) {
//       removeFromCart(id);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseAmount,
//         decreaseAmount,
//         itemAmount,
//         total,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;

// import React, { useEffect, createContext, useContext, useReducer } from "react";

// const ProductContext = createContext();

// export const useProducts = () => {
//   return useContext(ProductContext);
// };

// const initialState = {
//   products: [],
//   featureProducts: [],
//   allProducts: [],
//   categories: [],
//   isLoading: true,
//   isError: false,
//   cart: [], // Add a cart property to store items in the cart
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_PRODUCTS":
//       return { ...state, products: action.payload, isLoading: false };
//     case "SET_FEATURE_PRODUCTS":
//       return { ...state, featureProducts: action.payload };
//     case "SET_TOP_SLIDER":
//       return { ...state, topSlider: action.payload };
//     case "SET_LOADING":
//       return { ...state, isLoading: action.payload };
//     case "SET_ERROR":
//       return { ...state, isError: action.payload, isLoading: false };
//     case "ADD_TO_CART":
//       return { ...state, cart: [...state.cart, action.payload] }; // Add item to the cart
//     default:
//       return state;
//   }
// };

// const StateContext = (props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     fetch("data.json", {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//       .then(function (response) {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(function (myJson) {
//         dispatch({ type: "SET_PRODUCTS", payload: myJson });

//         const featureProducts = myJson.filter(
//           (product) => product.feature === true
//         );
//         const topSlider = myJson.filter((product) => product.feature === true);

//         dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
//         dispatch({ type: "SET_TOP_SLIDER", payload: topSlider });
//       })
//       .catch(function (error) {
//         console.error("There was a problem with the fetch operation:", error);
//         dispatch({ type: "SET_ERROR", payload: true });
//       });
//   }, []);

//   // Function to add an item to the cart
//   const addToCart = (item) => {
//     dispatch({ type: "ADD_TO_CART", payload: item });
//   };

//   // Function to get the cart items
//   const getCartItems = () => {
//     return state.cart;
//   };

//   return (
//     <ProductContext.Provider value={{ ...state, addToCart, getCartItems }}>
//       {props.children}
//     </ProductContext.Provider>
//   );
// };

// export default StateContext;
