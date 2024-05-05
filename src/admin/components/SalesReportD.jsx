import React, { useState, useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const SalesReportD = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPricePending, setTotalPricePending] = useState(0);
  const [totalPriceFailed, setTotalPriceFailed] = useState(0);
  const [totalPriceCompleted, setTotalPriceCompleted] = useState(0);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/orders");

      // Filter orders by payment status
      const pendingOrders = response.data.filter(
        (order) => order.paymentStatus === "pending",
      );
      const failedOrders = response.data.filter(
        (order) => order.paymentStatus === "failed",
      );
      const completedOrders = response.data.filter(
        (order) => order.paymentStatus === "completed",
      );

      // Calculate total price for each payment status
      const totalPricePending = pendingOrders.reduce(
        (total, order) => total + order.totalPrice,
        0,
      );
      const totalPriceFailed = failedOrders.reduce(
        (total, order) => total + order.totalPrice,
        0,
      );
      const totalPriceCompleted = completedOrders.reduce(
        (total, order) => total + order.totalPrice,
        0,
      );

      // Set total price for all orders
      const totalPriceAll = response.data.reduce(
        (total, order) => total + order.totalPrice,
        0,
      );

      // Set state for total prices
      setTotalPrice(totalPriceAll);
      setTotalPricePending(totalPricePending);
      setTotalPriceFailed(totalPriceFailed);
      setTotalPriceCompleted(totalPriceCompleted);

      // Set payment data for doughnut chart
      setPaymentData({
        labels: ["Pending", "Failed", "Completed"],
        datasets: [
          {
            data: [totalPricePending, totalPriceFailed, totalPriceCompleted],
            backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  return (
    <Container>
      <h2>Payment Status Report</h2>
      <Summary>
        <TotalPrice>Total Price (All Orders): ${totalPrice}</TotalPrice>
        <TotalPrice>Total Price (Pending): ${totalPricePending}</TotalPrice>
        <TotalPrice>Total Price (Failed): ${totalPriceFailed}</TotalPrice>
        <TotalPrice>Total Price (Completed): ${totalPriceCompleted}</TotalPrice>
      </Summary>
      <DoughnutContainer>
        {paymentData && (
          <Doughnut
            data={paymentData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Payment Status Distribution",
                },
              },
            }}
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
          />
        )}
      </DoughnutContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Summary = styled.div`
  margin-bottom: 20px;
`;

const TotalPrice = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DoughnutContainer = styled.div`
  margin-top: 20px;
`;

export default SalesReportD;
