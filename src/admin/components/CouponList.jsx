import React, { useState, useEffect } from "react";
import {
  Table,
  Switch,
  Modal,
  Form,
  Input,
  Button,
  message,
  Dropdown,
  Menu,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

const StyledTableContainer = styled.div`
  overflow-x: auto;
  background-color: white !important;
`;

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editedCoupon, setEditedCoupon] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/discountRoutes/coupon-code",
      );
      setCoupons(response.data.reverse());
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditedCoupon(coupon);
    setVisible(true);
    form.setFieldsValue(coupon);
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5005/api/discountRoutes/coupon-code/${id}`,
      );
      message.success("Coupon deleted successfully");
      fetchCoupons(); // Refresh coupons after delete
    } catch (error) {
      console.error("Error deleting coupon:", error);
      message.error("Failed to delete coupon");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:5005/api/discountRoutes/coupon-code/${editedCoupon._id}`,
        values,
      );
      message.success("Coupon updated successfully");
      setVisible(false);
      fetchCoupons(); // Refresh coupons after update
    } catch (error) {
      console.error("Error updating coupon:", error);
      message.error("Failed to update coupon");
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Percentage Off",
      dataIndex: "percentageOff",
      key: "percentageOff",
    },
    {
      title: "Minimum Order",
      dataIndex: "minimumOrder",
      key: "minimumOrder",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (_, record) => <Switch checked={record.active} disabled />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={() => handleEditCoupon(record)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleDeleteCoupon(record._id)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <StyledTableContainer>
        <Table dataSource={coupons} columns={columns} rowKey="_id" />
      </StyledTableContainer>

      <Modal
        title="Edit Coupon"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} initialValues={editedCoupon}>
          <Form.Item name="code" label="Code">
            <Input />
          </Form.Item>
          <Form.Item name="percentageOff" label="Percentage Off">
            <Input type="number" min={1} max={100} />
          </Form.Item>
          <Form.Item name="minimumOrder" label="Minimum Order">
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CouponList;
