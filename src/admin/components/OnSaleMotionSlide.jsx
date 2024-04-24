import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Switch, message } from "antd";
import axios from "axios";

const { RangePicker } = DatePicker;

const OnSaleMotionSlide = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Send data to backend
      await axios.post("http://localhost:5005/api/onsalemotionslide", values);
      message.success("On sale motion slide updated successfully");
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
        <Input />
      </Form.Item>
      <Form.Item
        name="dateRange"
        label="Start and End Date"
        rules={[{ required: true, message: "Please select the date range" }]}
      >
        <RangePicker />
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OnSaleMotionSlide;
