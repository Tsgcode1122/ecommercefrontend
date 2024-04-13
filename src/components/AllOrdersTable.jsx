import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library
import { Spin, Alert, Tag, Button } from "antd";
import styled from "styled-components";
import { useUserData } from "../context/UserDataContext";

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 5rem;
  th,
  td {
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;

    width: fit-content;
  }
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 10rem;
  border-bottom: 1px solid #ddd; /* Add underline */
`;

const ProductImage = styled.img`
  max-width: 50px;
  height: auto;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div`
  font-size: 12px;
`;

const ProductColor = styled.div`
  margin-top: auto;
`;

const Quantity = styled.div`
  font-size: 12px;
`;

const AllOrdersTable = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { userData } = useUserData();
  const userId = userData ? userData._id : null;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5005/api/orders/user/${userId}`,
        );
        setOrders(response.data.orders.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:5005/api/orders/request-cancel`, {
        userId,
        orderId,
      });
      // Reload orders after canceling order
      const response = await axios.get(
        `http://localhost:5005/api/orders/user/${userId}`,
      );
      setOrders(response.data.orders.reverse());
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      {loading ? (
        <Spin />
      ) : orders.length > 0 ? (
        <CustomTable>
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Request Order Cancel</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.cartItems.map((item) => (
                    <ProductDetailsContainer key={item._id}>
                      <ProductImage src={item.details.Image} alt={item.name} />
                      <ProductInfo>
                        <ProductName>{item.name}</ProductName>
                        <ProductColor>
                          <Tag
                            color={item.details.Color}
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                              marginRight: "5px",
                            }}
                          ></Tag>
                        </ProductColor>
                        <Quantity>Quantity: {item.details.Quantity}</Quantity>
                      </ProductInfo>
                    </ProductDetailsContainer>
                  ))}
                </td>
                <td>
                  <Tag
                    color={
                      order.paymentStatus === "pending"
                        ? "orange"
                        : order.paymentStatus === "completed"
                          ? "green"
                          : order.paymentStatus === "failed"
                            ? "red"
                            : "default"
                    }
                  >
                    {order.paymentStatus.toUpperCase()}
                  </Tag>
                </td>
                <td>
                  <Tag
                    color={
                      order.orderStatus === "shipped"
                        ? "blue"
                        : order.orderStatus === "pending"
                          ? "orange"
                          : order.orderStatus === "completed"
                            ? "green"
                            : order.orderStatus === "delivered"
                              ? "geekblue"
                              : "default"
                    }
                  >
                    {order.orderStatus.toUpperCase()}
                  </Tag>
                </td>
                <td>
                  {order.orderStatus === "pending" && (
                    <Button
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={order.requestCancelOrder}
                    >
                      {order.requestCancelOrder
                        ? "Order Cancel Requested"
                        : "Request Cancel Order"}
                    </Button>
                  )}
                </td>
                <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
          </tbody>
        </CustomTable>
      ) : (
        <Alert message="No orders found" type="info" />
      )}
    </div>
  );
};

export default AllOrdersTable;
