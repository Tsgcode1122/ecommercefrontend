// App.js

import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import PaymentPage from "./pages/PaymentPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterPage from "./pages/RegisterPage";
// App.js or any other JSX file
import "./index.css";
import Navbar from "./components/Navbar";
import Checkout from "./components/CheckOut";
import SuccessMessage from "../payment/SuccessMessage";
import Footer from "../Footer/Footer";
import WishList from "./pages/WishList";
import MyOders from "./pages/MyOders";

const App = () => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/products" exact Component={ProductPage} />
        <Route path="/products/:id" exact Component={SingleProductPage} />
        <Route path="/cart" exact Component={CartPage} />
        <Route path="/my-orders" exact Component={MyOders} />
        <Route path="/about" exact Component={AboutPage} />
        <Route path="/payment" exact Component={PaymentPage} />
        <Route path="/wishlist" exact Component={WishList} />
        <Route path="/admin" exact Component={AdminDashboardPage} />
        <Route path="/profile" exact Component={CustomerProfilePage} />
        <Route path="/login" exact Component={LoginPage} />
        <Route path="/reset-password" exact Component={ResetPasswordPage} />
        <Route path="/register" exact Component={RegisterPage} />
        <Route
          path="/checkout"
          exact
          element={
            <Checkout
              setOrderConfirmed={setOrderConfirmed}
              orderConfirmed={orderConfirmed}
            />
          }
        />
        <Route
          path="/success-message"
          exact
          Component={orderConfirmed ? SuccessMessage : HomePage}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
