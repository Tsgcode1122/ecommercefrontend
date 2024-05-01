import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message, DatePicker } from "antd";
import axios from "axios";

const CreateSalesPercentage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("http://localhost:5005/api/discountRoutes/percentage-off", values)
      .then((response) => {
        message.success("Sales percentage created successfully");
        setLoading(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error creating sales percentage:", error);
        message.error("Failed to create sales percentage");
        setLoading(false);
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        name="percentageOff"
        label="Percentage Off"
        rules={[
          { required: true, message: "Please enter the percentage off" },
          {
            type: "number",
            min: 1,
            max: 100,
            message: "Enter a number between 1 and 100",
          },
        ]}
      >
        <InputNumber
          min={1}
          max={100}
          placeholder="Enter percentage off"
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: "Please select the start date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="endDate"
        label="End Date"
        rules={[{ required: true, message: "Please select the end date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Sales Percentage
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSalesPercentage;
