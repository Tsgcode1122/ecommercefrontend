import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Switch, message } from "antd";
import axios from "axios";
import moment from "moment";

const EditSaleMotion = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [motion, setMotion] = useState(null);

  useEffect(() => {
    fetchMotion();
  }, []);

  const fetchMotion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/onSaleMotionSlide",
      );
      const motionData = response.data;
      setMotion(motionData);

      // Set initial values in the form
      form.setFieldsValue({
        text: motionData.text,
        startDate: moment(motionData.startDate),
        endDate: moment(motionData.endDate),
        enabled: motionData.enabled,
      });
    } catch (error) {
      console.error("Error fetching sale motion:", error);
      message.error("Failed to fetch sale motion");
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { startDate, endDate } = values;

      // Send updated data to backend with formatted date
      await axios.put(
        `http://localhost:5005/api/onSaleMotionSlide/${motion._id}`,
        {
          ...values,
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        },
      );
      message.success("Sale motion updated successfully");
    } catch (error) {
      console.error("Error updating sale motion:", error);
      message.error("Failed to update sale motion");
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditSaleMotion;
