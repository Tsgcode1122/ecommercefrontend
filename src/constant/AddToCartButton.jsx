import React from "react";
import styled from "styled-components";
import { calculateSalePrice } from "../constant/Saleprice";
import { useCartContext } from "../context/CartContext";

const AddToCartButton = ({
  singleProduct,
  selectedColor,
  selectedSize,
  quantity,
}) => {
  const { addToCart, cart } = useCartContext();
  const handleAddToCart = () => {
    const getDisplayedPrice = (singleProduct, selectedColor, selectedSize) => {
      const variant = singleProduct.variants.find(
        (variant) => variant.color === selectedColor,
      );
      if (variant) {
        const size = variant.sizes.find((size) => size.size === selectedSize);
        if (size) {
          const price = singleProduct.onSale
            ? calculateSalePrice(size.price)
            : size.price;
          return price;
        }
      }
      return "Price not available";
    };

    const getAvailableInStock = (
      singleProduct,
      selectedColor,
      selectedSize,
    ) => {
      const variant = singleProduct.variants.find(
        (variant) => variant.color === selectedColor,
      );
      if (variant) {
        const size = variant.sizes.find((size) => size.size === selectedSize);
        if (size) {
          return size.stock;
        }
      }
      return "Stock not available";
    };
    const displayedPrice = getDisplayedPrice(
      singleProduct,
      selectedColor,
      selectedSize,
    );
    const availableStock = getAvailableInStock(
      singleProduct,
      selectedColor,
      selectedSize,
    );

    const productDetails = {
      singleProduct,
      productName: singleProduct.name,
      selectedColor,
      selectedSize,
      displayedPrice,
      quantity,
      productImage: singleProduct.images[0],
      availableStock,
    };
    const itemId = singleProduct._id + selectedColor + selectedSize;

    const totalQuantityInCart = cart.reduce((total, item) => {
      if (
        item.id === itemId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      ) {
        return total + item.quantity;
      }
      return total;
    }, 0);

    const remainingStock = availableStock - totalQuantityInCart;
    console.log("Product added to cart:", productDetails);
    if (remainingStock > 0) {
      addToCart(
        singleProduct,

        selectedColor,
        selectedSize,
        displayedPrice,
        quantity,

        availableStock,
        Math.min(quantity, remainingStock),
        totalQuantityInCart,
      );
    } else {
      alert(
        `You cannot add that amount to the cart - we have ${availableStock} in stock and you already have ${totalQuantityInCart} in your cart.`,
      );
    }
  };

  // Function to get the displayed price based on selected color and size

  const disableButton = () =>
    selectedColor && selectedSize
      ? singleProduct.variants
          .find((variant) => variant.color === selectedColor)
          ?.sizes.find((size) => size.size === selectedSize)?.stock === 0
      : true;
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!selectedColor || !selectedSize || disableButton()}
    >
      {selectedColor && selectedSize
        ? singleProduct.variants
            .find((variant) => variant.color === selectedColor)
            ?.sizes.find((size) => size.size === selectedSize)?.stock === 0
          ? "Out of Stock"
          : "Add to Cart"
        : "Select Color & Size"}
    </button>
  );
};

export default AddToCartButton;
