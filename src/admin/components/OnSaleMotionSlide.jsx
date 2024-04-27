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
      // Format date range
      const [startDate, endDate] = values.dateRange;
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      // Send data to backend with formatted date range
      await axios.post("http://localhost:5005/api/onSaleMotionSlide", {
        ...values,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
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
          Create Sales Motion
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OnSaleMotionSlide;