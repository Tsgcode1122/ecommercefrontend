import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Input, Form, message, Table } from "antd";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const CreateOrders = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [shippingMethod, setShippingMethod] = useState("paid");
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/auth/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedVariant(null);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const variant = selectedProduct.variants.find(
      (variant) => variant.color === selectedColor,
    );
    if (variant) {
      const selectedVariant = variant.sizes.find((s) => s.size === size);
      setSelectedVariant(selectedVariant);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setUserModalVisible(false);
  };

  const handleCreateOrder = async () => {
    try {
      const formData = {
        products: selectedProducts,
        customer: selectedCustomer,
        comment: comment,
        paymentStatus: paymentStatus,
        orderStatus: orderStatus,
        shippingMethod: shippingMethod,
      };
      console.log("Form data:", formData);
      message.success("Order created successfully");
      setSelectedProducts([]);
      setSelectedCustomer(null);
      setComment("");
      setPaymentStatus("pending");
      setOrderStatus("pending");
      setShippingMethod("paid");
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Failed to create order");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Overall Stock",
      dataIndex: "overallStock",
      key: "overallStock",
    },
  ];

  const userColumns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <div>
      <h2>Create Order</h2>
      <Button onClick={() => setProductModalVisible(true)}>
        Select Product
      </Button>
      <Form layout="vertical">
        <Form.Item label="Selected Products">
          {selectedProducts.map((product, index) => (
            <div key={index}>
              <h3>{product.name}</h3>
              <p>Overall Stock: {product.overallStock}</p>
            </div>
          ))}
        </Form.Item>
        {selectedProduct && (
          <>
            <Form.Item label="Select Color">
              <Select
                style={{ width: "100%" }}
                onChange={handleColorSelect}
                value={selectedColor}
                disabled={!selectedProduct}
              >
                {selectedProduct &&
                  selectedProduct.variants.map((variant) => (
                    <Option key={variant.color} value={variant.color}>
                      {variant.color}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label="Select Size">
              <Select
                style={{ width: "100%" }}
                onChange={handleSizeSelect}
                value={selectedSize}
                disabled={!selectedColor}
              >
                {selectedColor &&
                  selectedProduct &&
                  selectedProduct.variants
                    .find((variant) => variant.color === selectedColor)
                    ?.sizes.map((size) => (
                      <Option key={size.size} value={size.size}>
                        {size.size}
                      </Option>
                    ))}
              </Select>
            </Form.Item>
            <Form.Item label="Price">
              <Input
                value={selectedVariant ? selectedVariant.price : ""}
                disabled
              />
            </Form.Item>
          </>
        )}
        <Form.Item label="Quantity">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Comment">
          <TextArea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Select Customer">
          <Button onClick={() => setUserModalVisible(true)}>
            Select Customer
          </Button>
          {selectedCustomer && (
            <div>
              <h3>Selected Customer</h3>
              <p>Name: {selectedCustomer.fullName}</p>
              <p>Email: {selectedCustomer.email}</p>
              <p>Phone Number: {selectedCustomer.phoneNumber}</p>
            </div>
          )}
        </Form.Item>
        <Form.Item label="Payment Status">
          <Select
            style={{ width: "100%" }}
            value={paymentStatus}
            onChange={setPaymentStatus}
          >
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="failed">Failed</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Order Status">
          <Select
            style={{ width: "100%" }}
            value={orderStatus}
            onChange={setOrderStatus}
          >
            <Option value="pending">Pending</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Shipping Method">
          <Select
            style={{ width: "100%" }}
            value={shippingMethod}
            onChange={setShippingMethod}
          >
            <Option value="paid">Paid</Option>
            <Option value="pay_on_delivery">Pay on Delivery</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Sub Total">
          <Input
            value={
              selectedVariant && quantity
                ? selectedVariant.price * quantity
                : ""
            }
            disabled
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreateOrder}>
            Create Order
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Select Product"
        visible={productModalVisible}
        onCancel={() => setProductModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setProductModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Table
          dataSource={products}
          columns={columns}
          rowKey={(record) => record._id}
          onRow={(record) => ({
            onClick: () => {
              setSelectedProducts([...selectedProducts, record]);
              setProductModalVisible(false);
            },
          })}
        />
      </Modal>

      <Modal
        title="Select Customer"
        visible={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setUserModalVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Table
          dataSource={users}
          columns={userColumns}
          rowKey={(record) => record._id}
          onRow={(record) => ({
            onClick: () => handleCustomerSelect(record),
          })}
        />
      </Modal>
    </div>
  );
};

export default CreateOrders;
