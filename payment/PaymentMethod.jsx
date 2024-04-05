import React, { useState } from "react";
import styled from "styled-components";
import PaypalPayment from "./PaypalPayment";
import StripePayment from "./StripePayment";
import PaystackPayment from "./PaystackPayment";
import paypal from "./images/paypal.png";
import stripe from "./images/stripe.png";
import paystack from "./images/paystackii.png";
import { AiOutlineCheck } from "react-icons/ai"; // Import check icon from react-icons

const PaymentMethod = ({ totalPrice }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };

  return (
    <Container>
      <h3>Select a payment method to make payment</h3>
      <div>Total Price: ${totalPrice}</div>
      <OptionsContainer>
        <Option
          selected={selectedPaymentMethod === "directTransfer" && <Checkmark />}
          onClick={() => handlePaymentMethodChange("directTransfer")}
        >
          Direct Bank Transfer
        </Option>
        <Option
          selected={selectedPaymentMethod === "paypal"}
          onClick={() => handlePaymentMethodChange("paypal")}
        >
          <img src={paypal} alt="PayPal" />
          Pay with Paypal
          {selectedPaymentMethod === "paypal" && <Checkmark />}
        </Option>
        <Option
          selected={selectedPaymentMethod === "stripe"}
          onClick={() => handlePaymentMethodChange("stripe")}
        >
          <img src={stripe} alt="Stripe" />
          Pay with Stripe
          {selectedPaymentMethod === "stripe" && <Checkmark />}
        </Option>
        <Option
          selected={selectedPaymentMethod === "paystack"}
          onClick={() => handlePaymentMethodChange("paystack")}
        >
          <img src={paystack} alt="Paystack" />
          Pay with Paystack
          {selectedPaymentMethod === "paystack" && <Checkmark />}
        </Option>
      </OptionsContainer>
      {selectedPaymentMethod === "directTransfer" && (
        <DirectTransfer>
          <h3>Direct Transfer to Seller Account</h3>
          <p>Account Number: 0095212279</p>
          <p>Account Name: Falola Tosin Solomon</p>
          <p>Bank: Access Bank</p>
          <p style={{ color: "#4da3ff" }}>
            Please put the description of payment in the transfer
          </p>
        </DirectTransfer>
      )}
      {selectedPaymentMethod === "paypal" && <PaypalPayment />}
      {selectedPaymentMethod === "stripe" && <StripePayment />}
      {selectedPaymentMethod === "paystack" && <PaystackPayment />}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const OptionsContainer = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const Option = styled.div`
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
  img {
    max-width: 100%;
    height: 20px;
  }
  /* Add hover effect */
  &:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  }

  /* Add selected styles */
  ${(props) =>
    props.selected &&
    `
    border-color: #4da3ff;
  `}
`;

const Checkmark = styled(AiOutlineCheck)`
  position: absolute;
  top: 6px;
  right: 6px;
  color: #4da3ff;
`;

const DirectTransfer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  min-height: 150px;
  p {
    margin: 0;
  }
`;

export default PaymentMethod;
