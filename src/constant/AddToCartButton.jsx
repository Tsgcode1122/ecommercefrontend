import React from "react";
import styled from "styled-components";
import { calculateSalePrice } from "../constant/Saleprice";
import { useCartContext } from "../context/CartContext";

const AddToCartButton = ({
  selectedColor,
  selectedDimension,
  quantity,
  singleProduct,
}) => {
  const { addToCart, cart } = useCartContext();

  const handleAddToCart = () => {
    const itemId = singleProduct._id + selectedColor + selectedDimension;

    const totalQuantityInCart = cart.reduce((total, item) => {
      if (
        item.id === itemId &&
        item.selectedColor === selectedColor &&
        item.selectedDimension === selectedDimension
      ) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    const remainingStock = singleProduct.stock - totalQuantityInCart;

    if (remainingStock > 0) {
      const productPrice = singleProduct.onSale
        ? calculateSalePrice(
            selectedColor
              ? singleProduct.variants.find((v) => v.color === selectedColor)
                  ?.price || singleProduct.price
              : singleProduct.price,
          )
        : selectedColor
          ? singleProduct.variants.find((v) => v.color === selectedColor)
              ?.price || singleProduct.price
          : singleProduct.price;

      const productImage = singleProduct.images[0];

      addToCart(
        singleProduct,
        selectedColor,
        Math.min(quantity, remainingStock),
        productPrice,
        selectedDimension,
        productImage,
      );
    } else {
      alert(
        `You cannot add that amount to the cart - we have ${singleProduct.stock} in stock and you already have ${totalQuantityInCart} in your cart.`,
      );
    }
  };

  return (
    <Button
      disabled={quantity <= 0 || !selectedColor || !selectedDimension}
      onClick={handleAddToCart}
    >
      {singleProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
};

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "blue")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "gray" : "darkblue")};
  }
`;

export default AddToCartButton;
