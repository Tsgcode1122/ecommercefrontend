import React, { useState, useEffect } from "react";
import { Select, Table, Checkbox, Button, message } from "antd";
import axios from "axios";
import { useProductContext } from "../../context/ProductContext";
import styled from "styled-components";
import moment from "moment";

const { Option } = Select;

const PercentageList = () => {
  const [percentages, setPercentages] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedPercentage, setSelectedPercentage] = useState(null); // State to store selected sales percentage
  const { products } = useProductContext();

  useEffect(() => {
    fetchPercentages();
  }, []);

  const fetchPercentages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/discountRoutes/percentage-off",
      );
      setPercentages(response.data);
    } catch (error) {
      console.error("Error fetching percentages:", error);
    }
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setSelectedPercentage(value); // Update selectedPercentage state when an option is selected
  };

  const onSelectAllChange = (e) => {
    const selected = e.target.checked;
    const selectedKeys = selected ? products.map((p) => p._id) : [];
    setSelectedRowKeys(selectedKeys);
  };
  const handleApply = () => {
    console.log("Selected product IDs:", selectedRowKeys);
    console.log("Selected sales percentage:", selectedPercentage);

    // Find the selected percentage object based on its name
    const selectedPercentageObject = percentages.find(
      (percentage) => percentage.name === selectedPercentage,
    );

    if (!selectedPercentageObject) {
      console.error("Selected percentage not found");
      return;
    }

    // Extract the ID of the selected percentage
    const percentageId = selectedPercentageObject._id;

    // Send data to backend
    axios
      .post("http://localhost:5005/api/discountRoutes/apply-percentage", {
        productIds: selectedRowKeys,
        percentageId: percentageId,
      })
      .then((response) => {
        message.success("Percentage applied successfully");
        console.log("Percentage applied successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error applying percentage:", error);
      });
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={onSelectAllChange}
          checked={selectedRowKeys.length === products.length}
        />
      ),
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => {
            const selected = e.target.checked;
            const key = record._id;
            if (selected) {
              setSelectedRowKeys([...selectedRowKeys, key]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key));
            }
          }}
          checked={selectedRowKeys.includes(record._id)}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "On Sale",
      dataIndex: "onSale",
      key: "onSale",
      render: (onSale) => (onSale ? "Yes" : "No"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <>
      <Select
        style={{ width: 200, height: 50 }}
        placeholder="Select a percentage"
        onChange={handleChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {percentages.map((percentage) => (
          <Option key={percentage._id} value={percentage.name}>
            {percentage.name} - {percentage.percentageOff}% <br />
            <SmallText>
              {moment(percentage.startDate).format("YYYY-MM-DD")} -{" "}
              {moment(percentage.endDate).format("YYYY-MM-DD")}
            </SmallText>
          </Option>
        ))}
      </Select>

      <Table dataSource={products} columns={columns} rowKey="_id" />

      <Button type="primary" onClick={handleApply}>
        Apply
      </Button>
    </>
  );
};

const SmallText = styled.small`
  font-size: smaller;
`;

export default PercentageList;
