import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ProductContext from "./Components/Context/StateContext";
import CartProvider from "./Components/Context/CardState";
import FilterContext from "./Components/Context/FilterState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ProductContext>
    <CartProvider>
      <FilterContext>
        <App />
      </FilterContext>
    </CartProvider>
  </ProductContext>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
