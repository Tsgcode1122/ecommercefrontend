// App.js

import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/products" exact Component={ProductPage} />
        <Route path="/products/:id" exact Component={SingleProductPage} />
        <Route path="/cart" exact Component={CartPage} />
        <Route path="/about" exact Component={AboutPage} />
        <Route path="/payment" exact Component={PaymentPage} />
        <Route path="/admin" exact Component={AdminDashboardPage} />
        <Route path="/profile" exact Component={CustomerProfilePage} />
        <Route path="/login" exact Component={LoginPage} />
        <Route path="/reset-password" exact Component={ResetPasswordPage} />
        <Route path="/register" exact Component={RegisterPage} />
        <Route path="/checkout" exact Component={Checkout} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
