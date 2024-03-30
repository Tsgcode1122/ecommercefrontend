import React from "react";
import styled from "styled-components";
import { calculateSalePrice } from "../constant/Saleprice";
import { useCartContext } from "../context/CartContext";

const AddToCartButton = ({
  selectedColor,
  selectedDimension,
  quantity,
  selectedVariant,
  singleProduct,
}) => {
  const { addToCart, cart } = useCartContext();

  const handleAddToCart = () => {
    if (!singleProduct) {
      return;
    }

    const selectedVariant = singleProduct.variants.find(
      (v) =>
        v.color === selectedColor &&
        v.sizes.some((s) => s.size === selectedDimension),
    );

    if (!selectedVariant) {
      alert("Please select a valid color and size.");
      return;
    }

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

    const remainingStock = selectedVariant.stock - totalQuantityInCart;

    if (remainingStock > 0) {
      addToCart(
        singleProduct,
        selectedVariant,
        productImage,
        selectedDimension,
        selectedColor,
        Math.min(quantity, remainingStock),
      );
    } else {
      alert(
        `You cannot add that amount to the cart - we have ${selectedVariant.stock} in stock and you already have ${totalQuantityInCart} in your cart.`,
      );
    }
  };

  return (
    <Button
      disabled={quantity <= 0 || !selectedColor || !selectedDimension}
      onClick={handleAddToCart}
    >
      {selectedVariant && selectedVariant.stock === 0
        ? "Out of Stock"
        : "Add to Cart"}
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
const addToCart = (productDetails, sin) => {
  const itemId = singleProduct._id + selectedColor + selectedSize;
  const existingItemIndex = cart.findIndex((item) => item.id === itemId);

  if (existingItemIndex !== -1) {
    const updatedCart = cart.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      return item;
    });
    setCart(updatedCart);
  } else {
    const newItem = {
      id: itemId,
      productDetails,
    };
    setCart([...cart, newItem]);
  }
};
