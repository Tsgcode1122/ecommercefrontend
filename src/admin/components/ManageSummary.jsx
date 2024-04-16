import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowUpOutlined } from "@ant-design/icons";
import manageProductsImage from "../Images/product-chain.png";
import manageOrdersImage from "../Images/order.png";
import manageDiscountsImage from "../Images/discount.png";
import colors from "../colors";

const Container = styled.div`
  display: grid;
  padding: 0rem 1rem;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;
const SlantedArrowIcon = styled(ArrowUpOutlined)`
  font-size: 20px;
  color: ${colors.white};
  background-color: #00000020;
  border-radius: 50%;
  padding: 8px;
  transform: rotate(45deg);
`;
const Item = styled.div`
  flex: 1 0 45%;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  color: ${colors.white};

  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Text = styled.p`
  margin: 0;
  font-weight: bold;
`;

const ArrowLink = styled(Link)`
  margin-left: auto;
  color: #1890ff;
`;

const ManageSummary = () => {
  return (
    <Container>
      <Item backgroundColor={colors.Support1}>
        <Image src={manageProductsImage} alt="Manage Products" />
        <Text>Manage Products</Text>
        <ArrowLink to="/admin/manage-products">
          <SlantedArrowIcon />
        </ArrowLink>
      </Item>
      <Item backgroundColor={colors.Support2}>
        <Image src={manageOrdersImage} alt="Manage Orders" />
        <Text>Manage Orders</Text>
        <ArrowLink to="/admin/manage-orders">
          <SlantedArrowIcon />
        </ArrowLink>
      </Item>
      <Item backgroundColor={colors.Support3}>
        <Image src={manageDiscountsImage} alt="Manage Discounts" />
        <Text>Manage Discounts</Text>
        <ArrowLink to="/admin/manage-discounts">
          <SlantedArrowIcon />
        </ArrowLink>
      </Item>
    </Container>
  );
};

export default ManageSummary;
