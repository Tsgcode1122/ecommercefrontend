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
import { PercentageProvider } from "./context/PercentageContext.jsx";
import { CouponCodeProvider } from "./context/CouponCodeContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CouponCodeProvider>
    <SalePopupProvider>
      <ResetPasswordProvider>
        <ForgetPasswordProvider>
          <UserDataProvider>
            <UserProvider>
              <SendEmailProvider>
                <ProductProvider>
                  <ReviewProvider>
                    <CartProvider>
                      <PercentageProvider>
                        <WishlistProvider>
                          <App />
                        </WishlistProvider>
                      </PercentageProvider>
                    </CartProvider>
                  </ReviewProvider>
                </ProductProvider>
              </SendEmailProvider>
            </UserProvider>
          </UserDataProvider>
        </ForgetPasswordProvider>
      </ResetPasswordProvider>
    </SalePopupProvider>
  </CouponCodeProvider>,
);
