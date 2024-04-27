import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { SendEmailProvider } from "./context/SendEmailContext.jsx";
import { ForgetPasswordProvider } from "./context/forgetPasswordContext.jsx";
import { ResetPasswordProvider } from "./context/ResetPasswordContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import { SalePopupProvider } from "./context/SalePopupContext.jsx";
import App from "./App.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SalePopupProvider>
    <ResetPasswordProvider>
      <ForgetPasswordProvider>
        <UserDataProvider>
          <UserProvider>
            <SendEmailProvider>
              <ProductProvider>
                <ReviewProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <App />
                    </WishlistProvider>
                  </CartProvider>
                </ReviewProvider>
              </ProductProvider>
            </SendEmailProvider>
          </UserProvider>
        </UserDataProvider>
      </ForgetPasswordProvider>
    </ResetPasswordProvider>
  </SalePopupProvider>,
);
