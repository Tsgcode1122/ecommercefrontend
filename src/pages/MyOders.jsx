import React, { useEffect, useState } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import { useUserData } from "../context/UserDataContext";
import AllOrdersTable from "../components/AllOrdersTable";
import DeliveredOrders from "../components/DeliveredOrders";
import CancelledOrders from "../components/CancelledOrders"; // Import CancelledOrders component

const { TabPane } = Tabs;

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const { userData } = useUserData();
  const userId = userData ? userData._id : null;
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Fetch all orders
        const allOrdersResponse = await axios.get(
          `http://localhost:5005/api/orders/user/660bb65b9ea709bd9cb974f2`,
        );
        setAllOrders(allOrdersResponse.data.orders);

        // Filter delivered orders
        const deliveredOrders = allOrdersResponse.data.orders.filter(
          (order) => order.orderStatus === "delivered",
        );
        setDeliveredOrders(deliveredOrders);

        // Filter cancelled orders
        const cancelledOrders = allOrdersResponse.data.orders.filter(
          (order) => order.orderStatus === "cancelled",
        );
        setCancelledOrders(cancelledOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="All Orders" key="1">
          {loading ? (
            <Spin />
          ) : allOrders.length > 0 ? (
            <AllOrdersTable orders={allOrders} />
          ) : (
            <Alert message="No orders found" type="info" />
          )}
        </TabPane>
        <TabPane tab="Delivered Orders" key="2">
          {/* Render delivered orders */}
          {loading ? (
            <Spin />
          ) : deliveredOrders.length > 0 ? (
            <DeliveredOrders userId={userId} />
          ) : (
            <Alert message="No delivered orders found" type="info" />
          )}
        </TabPane>
        <TabPane tab="Cancelled Orders" key="3">
          {/* Render cancelled orders */}
          {loading ? (
            <Spin />
          ) : cancelledOrders.length > 0 ? (
            <CancelledOrders userId={userId} />
          ) : (
            <Alert message="No cancelled orders found" type="info" />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyOrders;
