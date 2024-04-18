import React, { useState } from "react";
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
import { useProductContext } from "../../context/ProductContext";

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

const CreateProduct = () => {
  const [form] = Form.useForm();
  const { createProduct, uploadImage, deleteImage } = useProductContext();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [variants, setVariants] = useState([{ color: "", sizes: [] }]);
  const [formValues, setFormValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const onFinish = (values) => {
    console.log("Received values:", { ...values, variants, images: imageUrls });
    createProduct({ ...values, variants, images: imageUrls });
    message.success("Product created successfully");
    // Reset form fields after successful product creation
    form.resetFields();
    setVariants([{ color: "", sizes: [] }]);
    setFormValues({});
    setImageUrls([]);
    setSelectedColors([]);
    setSelectedSizes([]);
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
    setVariants([...variants, { color: "", sizes: [] }]);
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleColorChange = (index, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index].color = value;
    setVariants(updatedVariants);
    setSelectedColors((prevColors) => [...prevColors, value]);
    setSelectedSizes((prevSizes) =>
      prevSizes.filter((size) => size.variantIndex !== index),
    );
  };
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
  const getColorOptions = (index) => {
    const usedColors = variants
      .filter((_, i) => i !== index)
      .map((variant) => variant.color);
    return COLORS.filter((color) => !usedColors.includes(color));
  };
  const handleAddSize = (index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].sizes.push({ size: "", price: 0, stock: 0 });
    setVariants(updatedVariants);
  };

  const handleDeleteSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setVariants(updatedVariants);
  };

  const handleSizeChange = (variantIndex, sizeIndex, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex].size = value;
    setVariants(updatedVariants);
    setSelectedSizes((prevSizes) => [
      ...prevSizes,
      { variantIndex, size: value },
    ]);
  };

  const handlePriceChange = (variantIndex, sizeIndex, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex].price = value;
    setVariants(updatedVariants);
  };

  const handleStockChange = (variantIndex, sizeIndex, value) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].sizes[sizeIndex].stock = value;
    setVariants(updatedVariants);
  };
  const getSizeOptions = (variantIndex) => {
    const selectedColor = variants[variantIndex].color;
    const selectedVariant = variants[variantIndex];

    const sizesOfSelectedColor = selectedSizes
      .filter((size) => size.variantIndex !== variantIndex)
      .filter((size) => variants[size.variantIndex].color === selectedColor)
      .map((size) => size.size);

    const selectedSizesOfCurrentVariant = selectedVariant.sizes.map(
      (size) => size.size,
    );

    const allSizes = ["S", "M", "L", "XL"];

    return allSizes.filter(
      (size) =>
        !sizesOfSelectedColor.includes(size) &&
        !selectedSizesOfCurrentVariant.includes(size),
    );
  };

  return (
    <>
      <Container>
        <StyledForm
          form={form}
          layout="vertical"
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

          {variants.map((variant, variantIndex) => (
            <StyledFormItem
              key={variantIndex}
              label={`Variant ${variantIndex + 1}`}
            >
              <Button danger onClick={() => handleDeleteVariant(variantIndex)}>
                <DeleteOutlined />
              </Button>
              <StyledFormItem label="Color">
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => handleColorChange(variantIndex, value)}
                >
                  {getColorOptions(variantIndex).map((color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </StyledFormItem>
              {variant.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex}>
                  <StyledFormItem label="Size">
                    <Select
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleSizeChange(variantIndex, sizeIndex, value)
                      }
                    >
                      {getSizeOptions(variantIndex).map((size) => (
                        <Option key={size} value={size}>
                          {size}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                  <StyledFormItem label="Price">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      onChange={(value) =>
                        handlePriceChange(variantIndex, sizeIndex, value)
                      }
                    />
                  </StyledFormItem>
                  <StyledFormItem label="Stock">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      onChange={(value) =>
                        handleStockChange(variantIndex, sizeIndex, value)
                      }
                    />
                  </StyledFormItem>
                  <Button
                    danger
                    onClick={() => handleDeleteSize(variantIndex, sizeIndex)}
                  >
                    Delete Size
                  </Button>
                </div>
              ))}
              <StyledFormItem>
                <PrimaryButton
                  type="primary"
                  onClick={() => handleAddSize(variantIndex)}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Add Size
                </PrimaryButton>
              </StyledFormItem>
            </StyledFormItem>
          ))}
          <StyledFormItem>
            {" "}
            <PrimaryButton type="primary" onClick={handleAddVariant}>
              Add Variant
            </PrimaryButton>
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
              Create Product
            </PrimaryButton>
          </StyledFormItem>
        </StyledForm>
      </Container>
    </>
  );
};

export default CreateProduct;
