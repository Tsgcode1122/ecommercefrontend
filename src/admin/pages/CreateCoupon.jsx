import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import {
  Form,
  Input,
  Button,
  Radio,
  Upload,
  message,
  Select,
  Spin,
  InputNumber,
} from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import colors from "../colors";

const { Option } = Select;

const StyledForm = styled(Form)`
  background-color: ${colors.white};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const PrimaryButton = styled(Button)`
  background-color: ${colors.primary};
  border-color: ${colors.primary};

  &:hover {
    background-color: ${colors.secondary} !important;
    border-color: ${colors.secondary} !important;
  }
`;
const Container = styled.div`
  padding: 1rem;
  z-index: 1;
`;
const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const UploadItem = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;

const COLORS = [
  "red",
  "black",
  "white",
  "blue",
  "yellow",
  "green",
  "orange",
  "pink",
];

const EditProduct = () => {
  const { id } = useParams();
  const { products, updateProduct, uploadImage, deleteImage } =
    useProductContext();
  const [product, setProduct] = useState(null);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const singleProductEdit = products.find((product) => product._id === id);
    if (singleProductEdit) {
      setProduct(singleProductEdit);
      setImageUrls(singleProductEdit.images || []);
      form.setFieldsValue(singleProductEdit);
    }
  }, [id, products, form]);

  const onFinish = async (values) => {
    console.log("Received values:", { ...values, images: imageUrls });
    updateProduct({ ...values, images: imageUrls });
    message.success("Product updated successfully");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUploadChange = async (info) => {
    if (!uploading && info.file.status === "uploading") {
      setUploading(true);
      try {
        const imageUrl = await uploadImage(info.file.originFileObj);
        setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
        message.success(`${info.file.name} file uploaded successfully`);
      } catch (error) {
        message.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDelete = async (index, imageUrl) => {
    try {
      await deleteImage(imageUrl);

      setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
      message.success("Image deleted successfully");
    } catch (error) {
      message.error("Failed to delete image");
    }
  };

  const handleAddVariant = () => {
    form.setFieldsValue({
      variants: [
        ...(form.getFieldValue("variants") || []),
        { color: "", sizes: [] },
      ],
    });
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = [...(form.getFieldValue("variants") || [])];
    updatedVariants.splice(index, 1);
    form.setFieldsValue({ variants: updatedVariants });
  };

  const handleAddSize = (variantIndex) => {
    const variants = form.getFieldValue("variants") || [];
    const updatedVariant = {
      ...variants[variantIndex],
      sizes: [
        ...(variants[variantIndex].sizes || []),
        { size: "", price: 0, stock: 0 },
      ],
    };
    variants[variantIndex] = updatedVariant;
    form.setFieldsValue({ variants });
  };

  const handleDeleteSize = (variantIndex, sizeIndex) => {
    const variants = form.getFieldValue("variants") || [];
    const updatedVariant = { ...variants[variantIndex] };
    updatedVariant.sizes.splice(sizeIndex, 1);
    variants[variantIndex] = updatedVariant;
    form.setFieldsValue({ variants });
  };

  return (
    <Container>
      {product ? (
        <StyledForm
          form={form}
          layout="vertical"
          initialValues={product}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <StyledFormItem
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </StyledFormItem>

          <StyledFormItem label="Description" name="description">
            <ReactQuill theme="snow" />
          </StyledFormItem>

          <StyledFormItem label="Images" name="images">
            <Upload multiple onChange={onUploadChange} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {uploading && <Spin />}
            <UploadContainer>
              {imageUrls.map((url, index) => (
                <UploadItem key={index}>
                  <img src={url} alt="Uploaded" style={{ height: "40px" }} />
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index, url)}
                  />
                </UploadItem>
              ))}
            </UploadContainer>
          </StyledFormItem>

          <StyledFormItem label="Category" name="category">
            <Select mode="multiple">
              <Option value="Men Wear">Men Wear</Option>
              <Option value="Female Wear">Female Wear</Option>
              <Option value="Short">Short</Option>
              <Option value="Top">Top</Option>
            </Select>
          </StyledFormItem>

          <StyledFormItem label="Brand" name="brand">
            <Input />
          </StyledFormItem>

          <StyledFormItem label="Variants" name="variants">
            {(form.getFieldValue("variants") || []).map(
              (variant, variantIndex) => (
                <div key={variantIndex}>
                  <Button
                    danger
                    onClick={() => handleDeleteVariant(variantIndex)}
                  >
                    <DeleteOutlined />
                  </Button>
                  <StyledFormItem label={`Color ${variantIndex + 1}`}>
                    <Input
                      value={variant.color}
                      onChange={(e) =>
                        form.setFieldsValue({
                          [`variants[${variantIndex}].color`]: e.target.value,
                        })
                      }
                    />
                  </StyledFormItem>
                  {variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex}>
                      <StyledFormItem label={`Size ${sizeIndex + 1}`}>
                        <Input
                          value={size.size}
                          onChange={(e) =>
                            form.setFieldsValue({
                              [`variants[${variantIndex}].sizes[${sizeIndex}].size`]:
                                e.target.value,
                            })
                          }
                        />
                      </StyledFormItem>
                      <StyledFormItem label="Price">
                        <InputNumber
                          style={{ width: "100%" }}
                          min={0}
                          value={size.price}
                          onChange={(value) =>
                            form.setFieldsValue({
                              [`variants[${variantIndex}].sizes[${sizeIndex}].price`]:
                                value,
                            })
                          }
                        />
                      </StyledFormItem>
                      <StyledFormItem label="Stock">
                        <InputNumber
                          style={{ width: "100%" }}
                          min={0}
                          value={size.stock}
                          onChange={(value) =>
                            form.setFieldsValue({
                              [`variants[${variantIndex}].sizes[${sizeIndex}].stock`]:
                                value,
                            })
                          }
                        />
                      </StyledFormItem>
                      <Button
                        danger
                        onClick={() =>
                          handleDeleteSize(variantIndex, sizeIndex)
                        }
                      >
                        Delete Size
                      </Button>
                    </div>
                  ))}
                  <StyledFormItem>
                    <PrimaryButton
                      type="primary"
                      onClick={() => handleAddSize(variantIndex)}
                    >
                      Add Size
                    </PrimaryButton>
                  </StyledFormItem>
                </div>
              ),
            )}
            <StyledFormItem>
              <PrimaryButton type="primary" onClick={handleAddVariant}>
                Add Variant
              </PrimaryButton>
            </StyledFormItem>
          </StyledFormItem>

          <StyledFormItem label="Is Featured" name="isFeatured">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </StyledFormItem>

          <StyledFormItem label="On Sale" name="onSale">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </StyledFormItem>

          <StyledFormItem>
            <PrimaryButton
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "10px",
              }}
            >
              Update Product
            </PrimaryButton>
          </StyledFormItem>
        </StyledForm>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EditProduct;
