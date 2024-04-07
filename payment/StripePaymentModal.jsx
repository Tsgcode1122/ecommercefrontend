import React from "react";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AiOutlineClose } from "react-icons/ai";

const StripePaymentModal = ({ totalPrice, onClose, handleSubmit, values }) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>
          <AiOutlineClose />
        </CloseButton>
        <h2>Pay with Stripe</h2>

        <CheckoutForm
          totalPrice={totalPrice}
          onClose={onClose}
          handleSubmit={handleSubmit}
          values={values}
        />
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(3, 3, 3, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CheckoutForm = ({ totalPrice, handleSubmit, values }) => {
  console.log(values);
  const stripe = useStripe();
  const elements = useElements();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Use cardElement to perform additional validations or other actions
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      // Pass the paymentMethod to the handleSubmit function
      handleSubmit(paymentMethod, values);
      console.log("[paymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <CardElement />
      <SubmitButton type="submit">Pay ${totalPrice}</SubmitButton>
    </form>
  );
};
const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

export default StripePaymentModal;
