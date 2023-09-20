import React from "react";
import CreateContext from "./CreateContext";
import { useEffect } from "react";
import axios from "axios";

const API = "https://fakestoreapi.com/products/1";
// fetch('https://fakestoreapi.com/products/1')
// .then(res=>res.json())
// .then(json=>console.log(json))

const StateContext = (props) => {
  const getProducts = async (url) => {
    // dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      console.log(
        "🚀 ~ file: StateContext.jsx:13 ~ getProducts ~ products:",
        products
      );
    } catch (error) {}
  };

  useEffect(() => {
    getProducts(API);
  }, []);
  return (
    <CreateContext.Provider value={{ name: "zain" }}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default StateContext;
