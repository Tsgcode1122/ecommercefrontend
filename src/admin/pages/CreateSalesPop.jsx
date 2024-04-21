import React, { useState } from "react";
import { Form, Upload, Button, message, Input, Select, Spin } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSalePopupContext } from "../../context/SalePopupContext";
import { useProductContext } from "../../context/ProductContext";
import colors from "../colors";
import styled from "styled-components";

const { Option } = Select;

const CreateSalesPop = () => {
  const [form] = Form.useForm();
  const { createSalePopup } = useSalePopupContext();
  const { uploadImage, deleteImag } = useProductContext();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFinish = async (values) => {
    try {
      console.log({ ...values, images: imageUrl });
      await createSalePopup({ ...values, images: imageUrl });
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
      // const public_id = imageUrl;

      await axios.delete(
        `http://localhost:5005/api/products/images/${imageUrl}`,
      );

      setImageUrl("");
      message.success("Image deleted successfully");
    } catch (error) {
      message.error("Failed to delete image");
    }
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
        <Select>
          <Option value="emailInput">Email Input</Option>
          <Option value="couponGiving">Coupon Giving</Option>
          <Option value="noInput">No Input</Option>
        </Select>
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
