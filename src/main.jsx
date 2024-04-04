import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { UserDataProvider } from "./context/UserDataContext.jsx";
import { SendEmailProvider } from "./context/SendEmailContext.jsx";
import { ForgetPasswordProvider } from "./context/forgetPasswordContext.jsx";
import { ResetPasswordProvider } from "./context/resetPasswordContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ResetPasswordProvider>
    <ForgetPasswordProvider>
      <UserDataProvider>
        <UserProvider>
          <SendEmailProvider>
            <ProductProvider>
              <ReviewProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ReviewProvider>
            </ProductProvider>
          </SendEmailProvider>
        </UserProvider>
      </UserDataProvider>
    </ForgetPasswordProvider>
  </ResetPasswordProvider>,
);
