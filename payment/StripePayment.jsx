import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Replace 'your_stripe_publishable_key' with your actual Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51OuEOcP5VD7BOW3SqV5IuUrwEjGl5KoH8uzQrxHEbGjDqUk8Pf6CuKCR0W5gYIeZI392vqhQI6KTJflhl0rTcxPr00BWkzDpIb",
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // You can send the paymentMethod.id to your server to process the payment
    console.log("PaymentMethod ID:", paymentMethod.id);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <CardElementContainer>
          <CardElement options={{ style: cardElementStyle }} />
        </CardElementContainer>
        <SubmitButton type="submit" disabled={!stripe}>
          Pay
        </SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const FormContainer = styled.div`
  padding: 20px;
`;

const CardElementContainer = styled.div`
  margin-bottom: 20px;
`;

const cardElementStyle = {
  base: {
    fontSize: "16px",
    color: "#424770",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#9e2146",
  },
};

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 10px;
`;

export default Checkout;
