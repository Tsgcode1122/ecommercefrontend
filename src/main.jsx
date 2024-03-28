import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ProductProvider>
      <ReviewProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ReviewProvider>
    </ProductProvider>
  </CartProvider>,
);
