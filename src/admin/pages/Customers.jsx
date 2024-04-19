import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Modal, Button, Table, Image } from "antd";
import colors from "../colors";
const Customers = () => {
  const [orders, setOrders] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to group orders by customer
  const groupOrdersByCustomer = () => {
    const customers = {};

    orders.forEach((order) => {
      const { userId, formData, cartItems, createdAt } = order;
      const customerKey = `${formData.fullName}-${formData.email}-${formData.phone}`;
      const customerOrders = customers[customerKey] || {
        orders: [],
        totalOrders: 0,
      };

      customerOrders.orders.push({
        orderId: order._id,
        createdAt: new Date(createdAt).toLocaleDateString(),
        cartItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.details.Quantity,
          image: item.details.Image,
        })),
      });

      customerOrders.totalOrders++;
      customers[customerKey] = customerOrders;
    });

    return customers;
  };

  // Function to handle modal open
  const handleOpenModal = (customerOrders) => {
    setSelectedCustomerOrders(customerOrders);
    setModalVisible(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Render customer orders
  const renderCustomerOrders = () => {
    const customers = groupOrdersByCustomer();

    return Object.entries(customers).map(
      ([customerKey, customerData], index) => (
        <CustomerContainer key={index}>
          <CustomerInfo>
            <h2>{customerKey.split("-")[0]}</h2>
            <p>Email: {customerKey.split("-")[1]}</p>
            <p>Phone: {customerKey.split("-")[2]}</p>
            <p>Total Orders: {customerData.totalOrders}</p>
          </CustomerInfo>
          <ViewOrdersButton
            onClick={() => handleOpenModal(customerData.orders)}
          >
            View Orders
          </ViewOrdersButton>
        </CustomerContainer>
      ),
    );
  };

  // Columns for the orders table
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <StyledImage src={image} alt="Product" />,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <Container>
      {renderCustomerOrders()}
      <Modal
        title="Customer Orders"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCustomerOrders.map((order, index) => (
          <div key={index}>
            <h3>Order {index + 1}</h3>
            <Table
              dataSource={order.cartItems}
              columns={columns}
              pagination={false}
            />
          </div>
        ))}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  margin: 1rem;
`;

const CustomerContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const ViewOrdersButton = styled(Button)`
  background-color: ${colors.primary};
  border-color: ${colors.secondary};
  color: #fff;

  &:hover {
    background-color: #40a9ff;
    border-color: ${colors.secondary};
  }
`;

const StyledImage = styled(Image)`
  max-width: 50px; /* Adjust the width as needed */
  max-height: 50px; /* Adjust the height as needed */
`;

export default Customers;
