import React, { useState, useEffect } from "react";
import {
  Form,
  Upload,
  Button,
  message,
  Input,
  Select,
  Spin,
  Radio,
  Table,
  Modal,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSalePopupContext } from "../../context/SalePopupContext";
import { useProductContext } from "../../context/ProductContext";
import styled from "styled-components";
import colors from "../colors";
import axios from "axios";
const { Option } = Select;

const EditSalesPop = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [popups, setPopups] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const { editSalePopup, getAllSalePopups } = useSalePopupContext();
  const { uploadImage, deleteImage } = useProductContext();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [liveNow, setLiveNow] = useState(false);

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const allPopups = await getAllSalePopups();
      setPopups(allPopups);
    } catch (error) {
      console.error("Error fetching sale popups:", error);
      message.error("Failed to fetch sale popups");
    }
  };

  const handleEdit = (popup) => {
    setSelectedPopup(popup);
    setModalVisible(true);
    form.setFieldsValue({
      heading: popup.heading,
      content: popup.content,
      deliveryMethod: popup.deliveryMethod,
      liveNow: popup.liveNow,
      images: popup.images,
      coupon: popup.coupon,
    });
    setImageUrl(popup.images);
    setShowCouponInput(popup.coupon);
  };

  const onFinish = async (values) => {
    try {
      const updatedPopup = {
        ...selectedPopup,
        ...values,
        images: imageUrl || selectedPopup.images,
      };
      await editSalePopup(selectedPopup._id, updatedPopup);
      message.success("Sale popup updated successfully");
      setImageUrl("");
      form.resetFields();
      setModalVisible(false);
      fetchPopups();
    } catch (error) {
      console.error("Error updating sale popup:", error);
      message.error("Failed to update sale popup");
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
    setShowCouponInput(value === "couponGiving");
  };

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Delivery Method",
      dataIndex: "deliveryMethod",
      key: "deliveryMethod",
    },
    {
      title: "Live Now",
      dataIndex: "liveNow",
      key: "liveNow",
      render: (text, record) => <span>{text ? "Yes" : "No"}</span>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (text, record) => (
        <img src={text} alt="Sale Popup" style={{ maxWidth: "100px" }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <StyledContainer>
      <TableContainer>
        <Table columns={columns} dataSource={popups} />
      </TableContainer>
      <Modal
        title="Edit Sale Popup"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
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
            rules={[
              { required: true, message: "Please select delivery method" },
            ]}
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
              Update Sale Popup
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  overflow-x: auto;
  background-color: ${colors.white};
`;

const TableContainer = styled.div`
  width: 100%; /* Ensure table takes full width */
`;

const UploadItem = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
`;

export default EditSalesPop;
