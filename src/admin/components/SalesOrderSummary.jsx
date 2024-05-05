import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card } from "antd";
import styled from "styled-components";
import {
  OrderedListOutlined,
  ShoppingOutlined,
  UserOutlined,
  ArrowUpOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import colors from "../colors";
import lineChart from "../Images/line-chart.png";
import barChart from "../Images/bar-chart.png";
import familyChart from "../Images/family-tree.png";
import barGraph from "../Images/bar-graph.png";

const Container = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 1rem 0.5rem 1rem;
  gap: 10px;
`;

const StyledCard = styled.div`
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  background-color: ${colors.white};
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  text-align: center;

  align-items: center;
  img {
    max-width: 100%;
    height: 70px;
  }
`;

const ContentContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  color: ${colors.primary};
`;

const Value = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const SalesOrderSummary = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const siteVisitors = 10000; // Hardcoded value for site visitors

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/orders");

      // Calculate total orders
      const totalOrdersCount = response.data.length;
      setTotalOrders(totalOrdersCount);
      const completedOrders = response.data.filter(
        (order) => order.paymentStatus === "completed",
      );
      // Calculate total sales (overall total order sales)
      const totalSalesAmount = completedOrders.reduce(
        (total, order) => total + order.totalPrice,
        0,
      );
      setTotalSales(totalSalesAmount);
      // const totalSalesAmount = completedOrders.reduce(
      //   (total, order) => total + order.totalPrice,
      //   0,
      // );
      // setTotalSales(totalSalesAmount);

      // Calculate cancelled orders
      const cancelledOrdersCount = response.data.filter(
        (order) => order.orderStatus === "cancelled",
      ).length;
      setCancelledOrders(cancelledOrdersCount);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <div>
      <Container>
        <StyledCard>
          <ContentContainer>
            <IconWrapper>
              <OrderedListOutlined />
            </IconWrapper>
            <Value>{totalOrders}</Value>
            <p>Total Orders</p>
          </ContentContainer>
          <ImageContainer>
            <img src={barChart} alt="Bar Chart" />
          </ImageContainer>
        </StyledCard>

        <StyledCard>
          <ContentContainer>
            <IconWrapper>
              <ShoppingOutlined />
            </IconWrapper>
            <Value>${totalSales}</Value>
            <p>Total Sales</p>
          </ContentContainer>
          <ImageContainer>
            <img src={barGraph} alt="Bar Graph" />
          </ImageContainer>
        </StyledCard>

        <StyledCard>
          <ContentContainer>
            <IconWrapper>
              <UserOutlined />
            </IconWrapper>
            <Value>{siteVisitors}</Value>
            <p>Site Visitors</p>
          </ContentContainer>
          <ImageContainer>
            <img src={familyChart} alt="Family Chart" />
          </ImageContainer>
        </StyledCard>

        <StyledCard>
          <ContentContainer>
            <IconWrapper>
              <CloseCircleOutlined />
            </IconWrapper>
            <Value>{cancelledOrders}</Value>
            <p>Cancelled Orders</p>
          </ContentContainer>
          <ImageContainer>
            <img src={lineChart} alt="Line Chart" />
          </ImageContainer>
        </StyledCard>
      </Container>
    </div>
  );
};

export default SalesOrderSummary;
