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

import Navbar from "./components/Navbar";
import ManageProduct from "./pages/ManageProduct";
import CreateOrders from "./pages/createOrders";
import CreateProduct from "./pages/createProduct";
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

const AdminRoutes = () => {
  return (
    <>
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
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/page-visits" element={<PageVisits />} />
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
export default AdminRoutes;
