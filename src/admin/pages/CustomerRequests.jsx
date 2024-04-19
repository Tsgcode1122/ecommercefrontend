import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, Modal, Descriptions, Image, message } from "antd";
import colors from "../colors";
const CancelOrders = () => {
  const [cancelOrderMessages, setCancelOrderMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    const fetchCancelOrderMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/orders/cancel-orders",
        );

        setCancelOrderMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching cancel order messages:", error);
      }
    };

    fetchCancelOrderMessages();

    // Load accepted orders from local storage
    const acceptedOrdersFromStorage = JSON.parse(
      localStorage.getItem("acceptedOrders"),
    );
    if (acceptedOrdersFromStorage) {
      setAcceptedOrders(acceptedOrdersFromStorage);
    }
  }, []);

  useEffect(() => {
    // Save accepted orders to local storage
    localStorage.setItem("acceptedOrders", JSON.stringify(acceptedOrders));
  }, [acceptedOrders]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleAcceptOrderCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5005/api/orders/cancel-orders/${id}`);
      setAcceptedOrders([...acceptedOrders, id]);
      message.success("Order Cancel Accepted");
    } catch (error) {
      console.error("Error accepting order cancel:", error);
      // Handle error
    }
  };

  return (
    <div>
      <Container>
        <h1>Cancel Order Requests</h1>
        {cancelOrderMessages.map((order) => (
          <MessageContainer key={order._id}>
            <Message>
              <MessageText>
                Hey admin, <span>{order.formData.fullName}</span> with{" "}
                <span>{order.formData.email}</span>,{" "}
                <span>{order.formData.phone}</span> requested to cancel the
                order made on{" "}
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </MessageText>
              <ButtonContainer>
                <StyledButton onClick={() => handleViewDetails(order)}>
                  View Details
                </StyledButton>
                <StyledButton
                  onClick={() => handleAcceptOrderCancel(order._id)}
                  disabled={acceptedOrders.includes(order._id)}
                >
                  {acceptedOrders.includes(order._id)
                    ? "Order Cancel Accepted"
                    : "Accept Order Cancel"}
                </StyledButton>
              </ButtonContainer>
            </Message>
          </MessageContainer>
        ))}
      </Container>
      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {/* Render order details using Descriptions component... */}
        {selectedOrder && (
          <Descriptions bordered>
            <Descriptions.Item label="Order ID">
              {selectedOrder._id}
            </Descriptions.Item>
            <Descriptions.Item label="User ID">
              {selectedOrder.userId}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {selectedOrder.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Method">
              {selectedOrder.shippingMethod}
            </Descriptions.Item>
            {/* Render other order details... */}
            {/* You can map and render cart items here */}
            <Descriptions.Item label="Payment Status">
              {selectedOrder.paymentStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {selectedOrder.orderStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Request Cancel Order">
              {selectedOrder.requestCancelOrder ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Cart Items" span={3}>
              {/* Map and render cart items */}
              {selectedOrder.cartItems.map((item, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <Image src={item.details.Image} width={50} />{" "}
                  {/* Small image */}
                  <div>
                    <p>{item.name}</p> {/* Item name */}
                    <p>Color: {item.details.Color}</p> {/* Item color */}
                    <p>Size: {item.details.Size}</p> {/* Item size */}
                    <p>Price: ${item.details.Price}</p> {/* Item price */}
                    <p>Quantity: {item.details.Quantity}</p>{" "}
                    {/* Item quantity */}
                  </div>
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};
const Container = styled.div`
  padding: 20px;
`;

const MessageContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 16px;

  span {
    font-weight: bold;
    color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.primary};
  color: #fff;
  border: none;

  &:hover {
    background-color: ${colors.primary};
  }
`;
export default CancelOrders;
