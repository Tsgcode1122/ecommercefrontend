import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useCartContext } from "../context/CartContext";
import AmountButtons from "../components/AmountButtons";

const CartItems = ({ closeSidebar }) => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartContext();
  // handle increase
  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateSubtotal = (item) => {
    return item.displayedPrice * item.quantity;
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => {
      return total + calculateSubtotal(item);
    }, 0);
    return totalPrice;
  };

  return (
    <Container>
      <h2>Cart Items</h2>
      <ItemList>
        {cart.length === 0 ? (
          <EmptyCartMessage>
            Your cart is empty.{" "}
            {/* i pass the closesidebar props, so when the button is clicked the side bar will close and it from the navbar */}
            <Link to="/products" onClick={closeSidebar}>
              Shop now
            </Link>
          </EmptyCartMessage>
        ) : (
          <>
            {cart.map((item, index) => (
              <Item key={index}>
                <ItemDetails>
                  <ItemDetail>Name: {item.productName}</ItemDetail>
                  <ItemDetail>
                    Color: <ColorCircle color={item.selectedColor} />
                  </ItemDetail>
                  <ItemDetail>Dimension: {item.selectedSize}</ItemDetail>
                  <ItemDetail>Price: ${item.displayedPrice}</ItemDetail>
                  <ItemDetail>Stock: {item.availableStock}</ItemDetail>

                  <QuantityControl>
                    <button onClick={() => handleDecreaseQuantity(item.id)}>
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => handleIncreaseQuantity(item.id)}>
                      +
                    </button>
                  </QuantityControl>
                  <ItemDetail>Subtotal: ${calculateSubtotal(item)}</ItemDetail>

                  <ItemDetail>
                    <img src={item.productImage} alt={item.productName} />
                    {/* delete single item */}
                  </ItemDetail>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    remove
                  </button>
                </ItemDetails>
              </Item>
            ))}
            {/* calculate total price */}
            <p>
              total price will be calculated after shipping and coupon(if
              applicable) is calculated, proceed to checkout...
            </p>
            <TotalPrice>Sub total Price: ${calculateTotalPrice()}</TotalPrice>
            {/* clear all cart */}
            <button onClick={clearCart}>Clear all cart</button>
          </>
        )}
      </ItemList>
      <Link to="/checkout" onClick={closeSidebar}>
        {" "}
        Proceed to Checkout
      </Link>
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

const EmptyCartMessage = styled.div`
  margin-top: 20px;
`;

export default CartItems;
