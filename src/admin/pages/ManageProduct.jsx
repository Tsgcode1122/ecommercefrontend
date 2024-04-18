import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Table,
  message,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import colors from "../colors";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ManageProduct = () => {
  const { products, deleteProduct } = useProductContext();
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let newFilteredProducts = [...products];

    if (searchText.trim() !== "") {
      newFilteredProducts = newFilteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filter by date range
    if (filterDate && filterDate.length === 2) {
      const [startDate, endDate] = filterDate;
      newFilteredProducts = newFilteredProducts.filter(
        (product) =>
          new Date(product.createdAt) >= startDate &&
          new Date(product.createdAt) <= endDate,
      );
    }

    setFilteredProducts(newFilteredProducts);
  }, [products, searchText, filterDate]);
  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      await deleteProduct(productId);
      message.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };

  // Define table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img src={record.images[0]} alt={record.name} style={{ width: 50 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "On Sale",
      dataIndex: "onSale",
      key: "onSale",
      render: (onSale) => (
        <Tag color={onSale ? "green" : "gray"}>{onSale ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      render: (variants) => variants.length,
    },
    {
      title: "Total in Stock",
      dataIndex: "overallStock",
      key: "overallStock",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews) => (reviews ? reviews.length : 0), // Handle case when reviews might be undefined
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <StyledDropdown overlay={ActionsDropdown(record)} trigger={["click"]}>
          <Button>Actions</Button>
        </StyledDropdown>
      ),
    },
  ];

  // Actions dropdown menu
  const ActionsDropdown = (record) => (
    <Menu>
      <Menu.Item key="edit">
        <Link to={`/admin/edit-product/${record._id}`}>Edit</Link>
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => handleDelete(record._id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header>
        <Search
          placeholder="Search by product name"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />

        <StyledRangePicker
          onChange={(dates) => setFilterDate(dates)}
          style={{ marginRight: 10 }}
        />
        <Link to="/admin/create-products">
          <Button type="primary">Add Product</Button>
        </Link>
      </Header>
      <StyledTable
        dataSource={filteredProducts}
        columns={columns}
        size="middle"
        pagination={{ pageSize: 10 }} // Adjust pageSize as needed
        scroll={{ x: true }} // Enable horizontal scrolling
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: ${colors.white} !important;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  & > * {
    margin-right: 10px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 8px 0;
  }
`;

const StyledTable = styled(Table)`
  width: 100%;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledRangePicker = styled(RangePicker)`
  width: 100%;

  @media screen and (max-width: 768px) {
    .ant-picker-panel {
      overflow-x: auto !important;
    }
  }
`;

export default ManageProduct;
