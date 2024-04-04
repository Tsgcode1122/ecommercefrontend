import React, { useState } from "react";
import styled from "styled-components";

const CouponCodeForm = ({ applyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  return (
    <Container>
      <p>Enter coupon code(if available)</p>
      <Input
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <ApplyButton onClick={handleApplyCoupon}>Apply</ApplyButton>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default CouponCodeForm;
