import React from "react";
import styled from "styled-components";
// import paypal from "./images/paypal.png";
import paypal from "./images/paypaye.png";
const PaypalPayment = () => {
  return (
    <Container>
      <h3>Pay with Paypal </h3>
      <img src={paypal} />
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  align-items: center;
  gap: 20px;
  max-height: 150px;
  margin-bottom: 20px;
  img {
    width: 100%;

    max-height: 150px;
  }
`;

export default PaypalPayment;
