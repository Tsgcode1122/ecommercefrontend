import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import axios from "axios";

const CreateCoupon = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Send the form values to the backend to create the coupon
    setLoading(true);
    axios
      .post("http://localhost:5005/api/discountRoutes/coupon-code", values)
      .then((response) => {
        console.log("Coupon created:", response.data);
        message.success("Coupon created successfully");
        setLoading(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error creating coupon:", error);
        message.error("Failed to create coupon");
        setLoading(false);
      });
  };

  const isNumber = (rule, value, callback) => {
    if (isNaN(value)) {
      callback("Please enter a valid number");
    } else {
      callback();
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="code"
        label="Coupon Code"
        rules={[{ required: true, message: "Please enter a coupon code" }]}
      >
        <Input placeholder="Enter coupon code" />
      </Form.Item>
      <Form.Item
        name="percentageOff"
        label="Percentage Off"
        rules={[
          { required: true, message: "Please enter the percentage off" },
          { validator: isNumber },
        ]}
      >
        <InputNumber
          min={1}
          max={100}
          placeholder="Enter percentage off"
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          step={1}
        />
      </Form.Item>
      <Form.Item
        name="minimumOrder"
        label="Minimum Order Quantity"
        rules={[
          {
            required: true,
            message: "Please enter the minimum order quantity",
          },
          { validator: isNumber },
        ]}
      >
        <InputNumber
          min={1}
          placeholder="Enter minimum order quantity"
          step={1}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Coupon
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCoupon;
