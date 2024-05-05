import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const TotalOrders = () => {
  const [orderData, setOrderData] = useState(null);
  const [orderStatusValues, setOrderStatusValues] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/orders");

      // Filter orders by status
      const pendingOrders = response.data.filter(
        (order) => order.orderStatus === "pending",
      );
      const shippedOrders = response.data.filter(
        (order) => order.orderStatus === "shipped",
      );
      const deliveredOrders = response.data.filter(
        (order) => order.orderStatus === "delivered",
      );
      const cancelledOrders = response.data.filter(
        (order) => order.orderStatus === "cancelled",
      );

      // Get the count of orders for each status
      const pendingCount = pendingOrders.length;
      const shippedCount = shippedOrders.length;
      const deliveredCount = deliveredOrders.length;
      const cancelledCount = cancelledOrders.length;

      // Set the order data for the bar chart
      setOrderData({
        labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
        datasets: [
          {
            label: "Total Orders",
            data: [pendingCount, shippedCount, deliveredCount, cancelledCount],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });

      // Set the order status values
      setOrderStatusValues([
        { status: "Pending", value: pendingCount },
        { status: "Shipped", value: shippedCount },
        { status: "Delivered", value: deliveredCount },
        { status: "Cancelled", value: cancelledCount },
      ]);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <Container>
      <Header>
        {orderStatusValues.map((status, index) => (
          <StatusValue key={index}>
            <StatusTitle>{status.status}</StatusTitle>
            <StatusCount>{status.value}</StatusCount>
          </StatusValue>
        ))}
      </Header>
      <h2>Total Orders Report</h2>
      <ChartContainer>
        {orderData && (
          <Bar
            data={orderData}
            options={{
              indexAxis: "x",
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Order Status",
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Number of Orders",
                  },
                },
              },
            }}
          />
        )}
      </ChartContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const StatusValue = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: calc(50% - 10px);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatusTitle = styled.div`
  font-weight: bold;
`;

const StatusCount = styled.div`
  margin-top: 5px;
`;

const ChartContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export default TotalOrders;
