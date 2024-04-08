import React, { useEffect } from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserData } from "../src/context/UserDataContext";

const { Title, Paragraph } = Typography;

const SuccessMessage = () => {
  const { userData } = useUserData();
  if (userData) {
    return (
      <Container>
        <Title level={2}>Payment Successful</Title>
        <Paragraph>
          Hey {userData.fullName}, thanks for making payment to order from our
          store. Kindly check your dashboard to see your payment and order
          status.
        </Paragraph>
        <Actions>
          <Button type="primary" size="large">
            <Link to="/products">Shop More</Link>
          </Button>
          <Paragraph>
            If you want to track and check your order as a registered user,{" "}
            <Link to="/dashboard">click here</Link>.
          </Paragraph>
          <Paragraph>
            If you are not a registered user, kindly{" "}
            <Link to="/register">register now</Link>.
          </Paragraph>
        </Actions>
      </Container>
    );
  } else {
    return (
      <Container>
        <Title level={2}>Payment Successful</Title>
        <Paragraph>
          Thank you for making payment to order from our store. If you want to
          shop more,
        </Paragraph>
        <Actions>
          <Button type="primary" size="large">
            <Link to="/products">Shop More</Link>
          </Button>

          <Paragraph>
            If you are not a registered user, kindly{" "}
            <Link to="/register">register now</Link>.
          </Paragraph>
        </Actions>
      </Container>
    );
  }
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 40px;
`;

export default SuccessMessage;
