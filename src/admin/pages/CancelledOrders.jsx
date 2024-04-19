import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Pagination } from "antd";

const CancelledOrders = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/orders");
        const cancelledOrdersData = response.data.filter(
          (order) => order.orderStatus === "cancelled",
        );
        setCancelledOrders(cancelledOrdersData);
      } catch (error) {
        console.error("Error fetching cancelled orders:", error);
      }
    };

    fetchCancelledOrders();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(cancelledOrders.length / pageSize);

  // Calculate starting index of the current page
  const startIndex = (currentPage - 1) * pageSize;

  // Slice the orders array to get orders for the current page
  const currentOrders = cancelledOrders.slice(
    startIndex,
    startIndex + pageSize,
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <h1>Cancelled Orders</h1>
      {currentOrders.map((order) => (
        <OrderContainer key={order._id}>
          <OrderId>
            ID: <Bold>{order._id}</Bold>
          </OrderId>
          <OrderDate>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </OrderDate>
          <UserInfo>
            <p>User Full Name: {order.formData.fullName}</p>
            <p>User Email: {order.formData.email}</p>
            <p>User Phone: {order.formData.phone}</p>
          </UserInfo>
          <CartItems>
            {order.cartItems.map((item) => (
              <CartItem key={item._id}>
                <ItemImage src={item.details.Image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {item.details.Quantity}</p>
                </div>
              </CartItem>
            ))}
          </CartItems>
        </OrderContainer>
      ))}
      <PaginationContainer>
        <Pagination
          current={currentPage}
          total={cancelledOrders.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin: 1rem;
  background-color: #fff; /* White background color */
`;

const OrderContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
`;

const OrderId = styled.p`
  margin: 0;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const OrderDate = styled.p`
  margin: 0;
`;

const UserInfo = styled.div`
  margin-bottom: 10px;
`;

const CartItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default CancelledOrders;
