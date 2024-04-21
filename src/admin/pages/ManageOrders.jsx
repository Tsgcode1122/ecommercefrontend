import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Table,
  Button,
  Modal,
  Select,
  Tag,
  Dropdown,
  Input,
  Menu,
  Tabs,
} from "antd";
import axios from "axios";

const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/orders");
      setOrders(response.data.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // Filter function to search orders by name or order ID
  const filteredOrders = orders.filter((order) => {
    return (
      order.formData.fullName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      order._id.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: "formData",
      key: "user",
      render: (formData) => formData.fullName,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Total Amount",
      dataIndex: "totalPrice",
      key: "totalAmount",
    },
    {
      title: "Order State",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => {
        let color = "";
        switch (text) {
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => {
        let color = "";
        switch (text) {
          case "completed":
            color = "green";
            break;
          case "failed":
            color = "red";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleAction(e, record)}>
              <Menu.Item key="view">View Order</Menu.Item>
              <Menu.Item key="edit">Edit Order</Menu.Item>
              <Menu.Item key="delete">Delete Order</Menu.Item>
            </Menu>
          }
        >
          <Button>...</Button>
        </Dropdown>
      ),
    },
  ];

  const handleAction = (e, order) => {
    const action = e.key;
    setSelectedOrder(order);
    if (action === "view") {
      setViewModalVisible(true);
    } else if (action === "edit") {
      // Set initial paymentStatus and orderStatus based on selected order
      setPaymentStatus(order.paymentStatus);
      setOrderStatus(order.orderStatus);
      setEditModalVisible(true);
    } else if (action === "delete") {
      // Implement delete order functionality
    }
  };

  const handleEditSubmit = () => {
    // Send PUT request to backend with updated paymentStatus and orderStatus
    console.log("Payment Status:", paymentStatus);
    console.log("Order Status:", orderStatus);
    setEditModalVisible(false);
  };

  return (
    <Container>
      <h2>Manage Orders</h2>
      <Search
        placeholder="Search by name or order ID"
        allowClear
        enterButton
        onChange={(e) => setSearchText(e.target.value)} // Update search text state
      />
      <StyledTabs defaultActiveKey="all" tabBarStyle={{ overflow: "hidden" }}>
        <TabPane tab="All Orders" key="all">
          <TableContainer>
            <StyledTable
              dataSource={filteredOrders}
              columns={columns}
              scroll={{ x: "auto" }}
              pagination={{ pageSize: 10 }}
            />
          </TableContainer>
        </TabPane>
        <TabPane tab="Paid Orders" key="paid">
          <TableContainer>
            <StyledTable
              dataSource={orders.filter(
                (order) => order.paymentStatus === "completed",
              )}
              columns={columns}
              scroll={{ x: "auto" }}
            />
          </TableContainer>
        </TabPane>
        <TabPane tab="Unpaid Orders" key="unpaid">
          <TableContainer>
            <StyledTable
              dataSource={orders.filter(
                (order) =>
                  order.paymentStatus === "pending" ||
                  order.paymentStatus === "failed",
              )}
              columns={columns}
              scroll={{ x: "auto" }}
            />
          </TableContainer>
        </TabPane>
        <TabPane tab="Delivered Orders" key="delivered">
          <TableContainer>
            <StyledTable
              dataSource={orders.filter(
                (order) => order.orderStatus === "delivered",
              )}
              columns={columns}
              scroll={{ x: "auto" }}
            />
          </TableContainer>
        </TabPane>
        <TabPane tab="Pending Delivery" key="pendingDelivery">
          <TableContainer>
            <StyledTable
              dataSource={orders.filter(
                (order) =>
                  order.orderStatus === "pending" ||
                  order.orderStatus === "shipped",
              )}
              columns={columns}
              scroll={{ x: "auto" }}
            />
          </TableContainer>
        </TabPane>
      </StyledTabs>

      {/* View Order Details Modal */}
      <Modal
        title="View Order Details"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {/* Render order details here */}
        <h3>Order Items:</h3>
        <ul>
          {selectedOrder &&
            selectedOrder.cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img
                    src={item.details.Image}
                    alt={item.name}
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>Color: {item.details.Color}</p>
                  <p>Size: {item.details.Size}</p>
                  <p>Price: ${item.details.Price}</p>
                  <p>Quantity: {item.details.Quantity}</p>
                </div>
              </li>
            ))}
        </ul>
      </Modal>

      {/* Edit Order Details Modal */}
      <Modal
        title="Edit Order"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
      >
        <div>
          <p>Payment Status:</p>
          <Select
            value={paymentStatus}
            style={{ width: 120 }}
            onChange={setPaymentStatus}
          >
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="failed">Failed</Option>
          </Select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>Order Status:</p>
          <Select
            value={orderStatus}
            style={{ width: 120 }}
            onChange={setOrderStatus}
          >
            <Option value="pending">Pending</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </div>
      </Modal>
    </Container>
  );
};
const Container = styled.div`
  padding: 2px;
  margin: 1rem;
  background-color: white;
`;

const StyledTabs = styled(Tabs)`
  height: calc(100vh - 180px); /* Adjust height according to your layout */
  overflow: hidden;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  height: calc(100% - 40px); /* Adjust height according to your layout */
`;

const StyledTable = styled(Table)`
  table-layout: auto;
`;

export default ManageOrders;
