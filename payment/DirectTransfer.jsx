import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const DirectTransfer = ({
  totalPrice,
  onClose,
  sendOrderDetailsToBackend,
  values,
}) => {
  const handleDirectModal = () => {
    onClose();
  };
  return (
    <div>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={handleDirectModal}>
            <AiOutlineClose />
          </CloseButton>
          <DirectTransf>
            <h3>Kindly transfer ${totalPrice} to the account Below</h3>
            <h3>Direct Transfer to Seller Account</h3>
            <p>Account Number: 0095212279</p>
            <p>Account Name: Falola Tosin Solomon</p>
            <p>Bank: Access Bank</p>
            <p style={{ color: "#4da3ff" }}>
              Please put the description of payment in the transfer
            </p>
            <p>
              Once you transfer to the account kindly click on the the below
              button to confirm transfer{" "}
            </p>
          </DirectTransf>
          <CheckoutForm
            totalPrice={totalPrice}
            onClose={onClose}
            sendOrderDetailsToBackend={sendOrderDetailsToBackend}
            values={values}
          />
        </ModalContent>
      </ModalContainer>
    </div>
  );
};
const DirectTransf = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  min-height: 150px;
  p {
    margin: 0;
  }
`;
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
const CheckoutForm = ({ totalPrice, sendOrderDetailsToBackend, values }) => {
  event.preventDefault();
  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    try {
      await sendOrderDetailsToBackend(values);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <SubmitButton type="submit">i transfered ${totalPrice} </SubmitButton>
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
export default DirectTransfer;
