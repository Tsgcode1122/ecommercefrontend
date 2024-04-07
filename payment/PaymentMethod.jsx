import React, { useState } from "react";
import styled from "styled-components";

import stripe from "./images/stripe.png";
import bank from "./images/bank.png";

import { AiOutlineCheck } from "react-icons/ai"; // Import check icon from react-icons
import DirectTransfer from "./DirectTransfer";

const PaymentMethod = ({
  totalPrice,
  onPaymentMethodChange,
  showStripeModal,
  showDirectModal,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
    onPaymentMethodChange(value);
  };

  return (
    <Container>
      <h4>Select a payment method to make payment</h4>
      <OptionsContainer>
        <Option
          selected={selectedPaymentMethod === "directTransfer"}
          onClick={() => handlePaymentMethodChange("directTransfer")}
        >
          <img src={bank} alt="bank" />
          Direct Bank Transfer
          {selectedPaymentMethod === "directTransfer" && <Checkmark />}
        </Option>

        <Option
          selected={selectedPaymentMethod === "stripe"}
          onClick={() => handlePaymentMethodChange("stripe")}
        >
          <img src={stripe} alt="Stripe" />
          Pay with Stripe
          {selectedPaymentMethod === "stripe" && <Checkmark />}
        </Option>
      </OptionsContainer>
      {showDirectModal && selectedPaymentMethod === "directTransfer" && (
        <DirectTransfer totalPrice={totalPrice} />
      )}
      {showStripeModal && selectedPaymentMethod === "stripe" && (
        <StripePaymentModal totalPrice={totalPrice} />
      )}
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

export default PaymentMethod;
