import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Result, Button } from "antd";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import PaymentPage from "./pages/PaymentPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import "./index.css";
import Navbar from "./components/Navbar";
import Checkout from "./components/CheckOut";
import SuccessMessage from "../payment/SuccessMessage";
import Footer from "../Footer/Footer";
import WishList from "./pages/WishList";
import MyOders from "./pages/MyOders";
import ProtectedAdminDashboardPage from "./admin/ProtectedAdminDashboardPage";
import { useNavigate } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      {/* The BrowserRouter wraps around the entire application */}
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOders />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/admin/*" element={<ProtectedAdminDashboardPage />} />
        <Route path="/profile" element={<CustomerProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success-message" element={<SuccessMessage />} />
        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<InvalidPath />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
};

const InvalidPath = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Oops! The page you are looking for does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default App;
