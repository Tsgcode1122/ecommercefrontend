import React, { useState } from "react";
import {
  Form,
  Upload,
  Button,
  message,
  Input,
  Select,
  Spin,
  Radio,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSalePopupContext } from "../../context/SalePopupContext";
import { useProductContext } from "../../context/ProductContext";
import colors from "../colors";
import styled from "styled-components";
import axios from "axios";
const { Option } = Select;

const CreateSalesPop = () => {
  const [form] = Form.useForm();
  const { createSalePopup } = useSalePopupContext();
  const { uploadImage, deleteImag } = useProductContext();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false); // State to control the visibility of the coupon input
  const [liveNow, setLiveNow] = useState(false); // State for the "Live Now" feature

  const onFinish = async (values) => {
    try {
      console.log({ ...values, images: imageUrl, liveNow });
      await createSalePopup({ ...values, images: imageUrl, liveNow });
      message.success("Sale popup created successfully");
      setImageUrl("");
      form.resetFields();
    } catch (error) {
      console.error("Error creating sale popup:", error);
      message.error("Failed to create sale popup");
    }
  };

  const onUploadChange = async (info) => {
    if (!uploading && info.file.status === "uploading") {
      setUploading(true);
      try {
        const imageUrl = await uploadImage(info.file.originFileObj);
        setImageUrl(imageUrl);
        message.success(`${info.file.name} file uploaded successfully`);
      } catch (error) {
        message.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const public_id = imageUrl.split("/").slice(-1)[0].split(".")[0];
      console.log(public_id);
      await axios.delete(`http://localhost:5005/api/products/images/delete`, {
        data: {
          public_id: public_id,
        },
      });

      console.log("Image deleted successfully");
      setImageUrl("");
      message.success("Image deleted successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete image");
    }
  };

  const handleDeliveryMethodChange = (value) => {
    // If delivery method is couponGiving, show the coupon input
    setShowCouponInput(value === "couponGiving");
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="heading"
        label="Heading"
        rules={[{ required: true, message: "Please enter the heading" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="content"
        label="Content"
        rules={[{ required: true, message: "Please enter the content" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="deliveryMethod"
        label="Delivery Method"
        rules={[{ required: true, message: "Please select delivery method" }]}
      >
        <Select onChange={handleDeliveryMethodChange}>
          <Option value="emailInput">Email Input</Option>
          <Option value="couponGiving">Coupon Giving</Option>
          <Option value="noInput">No Input</Option>
        </Select>
      </Form.Item>

      {showCouponInput && (
        <Form.Item
          name="coupon"
          label="Please enter the coupon"
          rules={[{ required: true, message: "Please enter the coupon" }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item label="Live Now" name="liveNow" initialValue={false}>
        <Radio.Group onChange={(e) => setLiveNow(e.target.value)}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <StyledFormItem label="Images" name="images">
        <Upload onChange={onUploadChange} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {uploading && <Spin />}
        {imageUrl && (
          <UploadItem>
            <img src={imageUrl} alt="Uploaded" style={{ height: "40px" }} />
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </UploadItem>
        )}
      </StyledFormItem>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Sale Popup
        </Button>
      </Form.Item>
    </Form>
  );
};

const UploadItem = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;

export default CreateSalesPop;
