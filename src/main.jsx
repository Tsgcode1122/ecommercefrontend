import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <ReviewProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReviewProvider>
  </ProductProvider>,
);
