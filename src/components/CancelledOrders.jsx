import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Alert } from "antd";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 5rem;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled(TableRow)`
  font-weight: bold;
`;

const TableCell = styled.div`
  flex: ${(props) => (props.flex ? props.flex : 1)};
  display: flex;
  align-items: center; /* Align content vertically center */
`;

const Image = styled.img`
  max-width: 50px;
  height: auto;
`;
const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #a7a7a7;
`;
const CancelledOrders = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      setLoading(true);
      try {
        // Fetch orders by user ID
        const response = await axios.get(
          `http://localhost:5005/api/orders/user/660bb65b9ea709bd9cb974f2`,
        );
        // Filter cancelled orders
        const cancelledOrders = response.data.orders.filter(
          (order) => order.orderStatus === "cancelled",
        );
        setCancelledOrders(cancelledOrders.reverse());
      } catch (error) {
        console.error("Error fetching cancelled orders:", error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, [userId]);

  return (
    <TableContainer>
      {loading ? (
        <Spin />
      ) : cancelledOrders.length > 0 ? (
        <TableWrapper>
          <TableHeader>
            <TableCell flex={2}>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Color</TableCell>

            <TableCell>Image</TableCell>
          </TableHeader>
          {cancelledOrders.map((order) => (
            <React.Fragment key={order._id}>
              {order.cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell flex={2}>{item.name}</TableCell>
                  <TableCell>{item.details.Quantity}</TableCell>
                  <TableCell>
                    {" "}
                    <ColorCircle
                      style={{ backgroundColor: item.details.Color }}
                    />
                  </TableCell>

                  <TableCell>
                    <Image src={item.details.Image} alt={item.name} />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableWrapper>
      ) : (
        <Alert message="No cancelled orders found" type="info" />
      )}
    </TableContainer>
  );
};

export default CancelledOrders;
