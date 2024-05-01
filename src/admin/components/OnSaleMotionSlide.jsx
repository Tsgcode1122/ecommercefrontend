import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Switch, message } from "antd";
import axios from "axios";

const OnSaleMotionSlide = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Extract start and end dates from the values object
      const { startDate, endDate } = values;

      // Send data to backend with formatted date range
      await axios.post("http://localhost:5005/api/onSaleMotionSlide", {
        ...values,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      });
      message.success("On sale motion slide created successfully");
    } catch (error) {
      console.error("Error updating on sale motion slide:", error);
      message.error("Failed to update on sale motion slide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="text"
        label="Text"
        rules={[{ required: true, message: "Please input the text" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: "Please select the start date" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="endDate"
        label="End Date"
        rules={[{ required: true, message: "Please select the end date" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="enabled"
        label="Enabled"
        valuePropName="checked"
        initialValue={false}
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Sales Motion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OnSaleMotionSlide;
