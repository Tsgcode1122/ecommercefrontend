// AdminRoutes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Products from "./pages/Products";
import PageVisits from "./pages/PageVisits";
import Overview from "./pages/Overview";
import SalesReport from "./pages/SalesReport";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import ManageProduct from "./pages/ManageProduct";
import CreateOrders from "./pages/CreateOrders";
import CreateProduct from "./pages/CreateProduct";
import ManageOrders from "./pages/ManageOrders";
import NewOrders from "./pages/NewOrders";
import CreateDiscount from "./pages/CreateDiscount";
import CreateCoupon from "./pages/CreateCoupon";
import CreateSalesPercentage from "./pages/CreateSalesPercentage";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import CustomerRequests from "./pages/CustomerRequests";
import RegisterUsers from "./pages/RegisterUsers";
import CreateSalesPop from "./pages/CreateSalesPop";
import Reviews from "./pages/Reviews";
import TotalOrders from "./pages/TotalOrders";
import CancelledOrders from "./pages/CancelledOrders";

const AdminRoutes = () => {
  return (
    <>
      <GlobalStyle />
      <IrregularCircle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        {/* <Route path="/" element={<AdminDashboardPage />} /> */}
        <Route path="/products" element={<Products />} />
        <Route path="/manage-products" element={<ManageProduct />} />
        <Route path="/create-products" element={<CreateProduct />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route path="/create-orders" element={<CreateOrders />} />
        <Route path="/new-orders" element={<NewOrders />} />
        <Route path="/salesReport" element={<SalesReport />} />

        <Route path="/create-discount" element={<CreateDiscount />} />
        <Route path="/create-coupon" element={<CreateCoupon />} />
        <Route
          path="/create-sales-percentage"
          element={<CreateSalesPercentage />}
        />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/page-visits" element={<PageVisits />} />
        <Route path="/total-orders" element={<TotalOrders />} />
        <Route path="/cancelled-orders" element={<CancelledOrders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers-Requests" element={<CustomerRequests />} />
        <Route path="/registered-users" element={<RegisterUsers />} />
        <Route path="/create-sales-pop" element={<CreateSalesPop />} />

        <Route path="/reviews" element={<Reviews />} />
        {/* Catch-all route for paths not found */}
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </>
  );
};
const InvalidPath = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/admin");
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
const GlobalStyle = createGlobalStyle`
  body {
    background: #EDF1F6; /* Set linear gradient background with blue and red colors */
    margin: 0; /* Remove default body margin */
    padding: 0; /* Remove default body padding */
    font-family: 'Roboto', sans-serif;
 
  }
`;

// Create a styled component for the irregular circle shape
const IrregularCircle = styled.div`
  width: 100%;
  height: 450px;
  position: absolute;
  clip-path: ellipse(100% 60% at 70% 0%);
  background: rgb(37, 71, 106);
  background: linear-gradient(
    90deg,
    rgba(37, 71, 106, 1) 0%,
    rgba(46, 74, 102, 1) 20%,
    rgba(67, 94, 122, 1) 53%,
    rgba(74, 110, 147, 1) 80%,
    rgba(68, 92, 117, 1) 100%
  );
`;

export default AdminRoutes;
