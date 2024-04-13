import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Spin, Alert } from "antd";
import styled from "styled-components";

const DeliveredOrders = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5005/api/orders/user/660bb65b9ea709bd9cb974f2`,
        );
        const allOrders = response.data.orders;
        const deliveredOrders = allOrders.filter(
          (order) => order.orderStatus === "delivered",
        );
        setDeliveredOrders(deliveredOrders.reverse());
      } catch (error) {
        console.error("Error fetching delivered orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, [userId]);

  return (
    <DeliveredOrdersContainer>
      {loading ? (
        <Spin />
      ) : deliveredOrders.length > 0 ? (
        <CustomTableContainer>
          <CustomTableHeader>
            <CustomTableCell>Product Name</CustomTableCell>
            <CustomTableCell>Quantity</CustomTableCell>
            <CustomTableCell>Color</CustomTableCell>
            <CustomTableCell>Price</CustomTableCell>
            <CustomTableCell>Image</CustomTableCell>
          </CustomTableHeader>
          <CustomTableBody>
            {deliveredOrders.map((order) =>
              order.cartItems.map((item) => (
                <CustomTableRow key={item._id}>
                  <CustomTableCell>{item.name}</CustomTableCell>
                  <CustomTableCell>{item.details.Quantity}</CustomTableCell>
                  <CustomTableCell>
                    <ColorCircle
                      style={{ backgroundColor: item.details.Color }}
                    />
                  </CustomTableCell>
                  <CustomTableCell>{item.details.Price}</CustomTableCell>
                  <CustomTableCell>
                    <ProductImage src={item.details.Image} alt="Product" />
                  </CustomTableCell>
                </CustomTableRow>
              )),
            )}
          </CustomTableBody>
        </CustomTableContainer>
      ) : (
        <Alert message="No delivered orders found" type="info" />
      )}
    </DeliveredOrdersContainer>
  );
};

const DeliveredOrdersContainer = styled.div`
  padding: 20px;
  margin-bottom: 5rem;
`;

const CustomTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const CustomTableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  font-weight: bold;
`;

const CustomTableCell = styled.div`
  flex: 1;
  padding: 8px;
`;

const CustomTableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomTableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e8e8e8;
`;

const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #a7a7a7;
`;

const ProductImage = styled.img`
  width: 50px;
  height: auto;
  margin: 0 auto;
`;

export default DeliveredOrders;
