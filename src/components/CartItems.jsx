import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/CartContext";

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
              <ItemDetail>Name: {item.name}</ItemDetail>
              <ItemDetail>Color: {item.selectedColor}</ItemDetail>
              <ItemDetail>Dimension: {item.selectedDimension}</ItemDetail>
              <ItemDetail>Price: ${item.productPrice}</ItemDetail>
              <ItemDetail>stock: ${item.stock}</ItemDetail>

              <QuantityControl>
                <button
                  type="button"
                  className="amount-btn"
                  onClick={() => handleDecreaseQuantity(item.id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                {item.quantity}
                <button
                  type="button"
                  className="amount-btn"
                  onClick={() => handleIncreaseQuantity(item.id)}
                  disabled={item.quantity === item.stock}
                >
                  +
                </button>
              </QuantityControl>

              <ItemDetail>
                <img src={item.image} alt={item.name} />
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
