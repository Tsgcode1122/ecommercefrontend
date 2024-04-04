import React, { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import CouponCodeForm from "./CouponCodeForm";
import TotalInCart from "./TotalInCart";
import useTotalPrice from "./useTotalPrice";

const CartItemCheckoutSummary = ({ closeSummary }) => {
  const [discount, setDiscount] = useState(0);
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartContext();
  const totalQuantity = TotalInCart(); //  TotalInCart component to calculate total quantity

  const totalPrice = useTotalPrice(cart, discount);

  let couponValid = 5;

  // Function to apply the coupon code and calculate the discount
  const applyCoupon = (couponCode) => {
    if (couponCode === "TOSIN2023") {
      // Apply 2% discount if the coupon code is valid
      if (totalQuantity >= couponValid) {
        setDiscount(0.02); // 2% discount
      } else {
        alert(
          `Coupon code is valid but requires at least ${couponValid} items in cart.`,
        );
      }
    } else {
      alert("Invalid coupon code.");
    }
  };

  // Function to handle quantity changes

  // handle increase
  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
    if (totalQuantity <= couponValid && discount > 0) {
      // Reset discount if the threshold is not met
      setDiscount(0);
      alert("Coupon discount has been removed due to quantity change.");
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
    if (totalQuantity <= couponValid && discount > 0) {
      // Reset discount if the threshold is not met
      setDiscount(0);
      alert("Coupon discount has been removed due to quantity change.");
    }
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    if (totalQuantity <= couponValid && discount > 0) {
      // Reset discount if the threshold is not met
      setDiscount(0);
      alert("Coupon discount has been removed due to quantity change.");
    }
  };

  return (
    <Container>
      <h2>Cart Summary</h2>
      {/* Render CouponCodeForm component */}
      <CouponCodeForm applyCoupon={applyCoupon} />
      <ItemList>
        {cart.map((item, index) => (
          <Item key={index}>
            <ItemDetails>
              <ItemDetail>Name: {item.productName}</ItemDetail>
              <ItemDetail>
                Color: <ColorCircle color={item.selectedColor} />
              </ItemDetail>
              <ItemDetail>Dimension: {item.selectedSize}</ItemDetail>
              <ItemDetail>Price: ${item.displayedPrice}</ItemDetail>
              {/* <ItemDetail>Stock: {item.availableStock}</ItemDetail> */}

              <QuantityControl>
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
              </QuantityControl>

              <ItemDetail>
                <img src={item.productImage} alt={item.productName} />
              </ItemDetail>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                remove
              </button>
            </ItemDetails>
          </Item>
        ))}
      </ItemList>
      <TotalPrice>
        Total Price: ${totalPrice} {/* Display total price after discount */}
      </TotalPrice>
      <CloseButton onClick={closeSummary}>Close Summary</CloseButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ItemDetails = styled.div`
  margin-top: 5px;
  img {
    max-width: 100%;
    width: 100px;
    height: 100px;
  }
`;

const ItemDetail = styled.p`
  margin: 0;
`;

const QuantityControl = styled.div`
  margin-bottom: 10px;
`;

const ColorCircle = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

export default CartItemCheckoutSummary;
