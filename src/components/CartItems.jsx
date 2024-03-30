import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import AmountButtons from "../components/AmountButtons";

const CartItems = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCartContext();

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  return (
    <Container>
      <h2>Cart Items</h2>
      <ItemList>
        {cart.map((item, index) => (
          <Item key={index}>
            <ItemDetails>
              <ItemDetail>Name: {item.productName}</ItemDetail>
              <ItemDetail>Color: {item.selectedColor}</ItemDetail>
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

              <ItemDetail>
                <img src={item.productImage} alt={item.productName} />
              </ItemDetail>
            </ItemDetails>
          </Item>
        ))}
      </ItemList>
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
  }
`;

const ItemDetail = styled.p`
  margin: 0;
`;

const QuantityControl = styled.div`
  margin-bottom: 10px;
`;

export default CartItems;
