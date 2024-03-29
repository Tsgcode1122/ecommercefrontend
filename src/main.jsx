import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductProvider>
    <ReviewProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ReviewProvider>
  </ProductProvider>,
);
