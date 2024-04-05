import React from "react";
import styled from "styled-components";
import paystack from "./images/paystacka.png";
const PaystackPayment = () => {
  return (
    <Container>
      <h3>Pay with Paystack</h3>
      <img src={paystack} />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  max-height: 150px;
  img {
    max-width: 100%;
  }
`;

export default PaystackPayment;
