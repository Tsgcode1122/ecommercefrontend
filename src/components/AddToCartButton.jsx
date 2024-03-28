import React from "react";
import styled from "styled-components";
import { calculateSalePrice } from "../constant/Saleprice";

const AddToCartButton = ({
  selectedColor,
  selectedDimension,
  quantity,
  singleProduct,
}) => {
  const AddtoCart = () => {
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

    console.log("Product ID:", singleProduct._id);
    console.log("Product Name:", singleProduct.name);
    console.log("Product Dimension:", selectedDimension);
    console.log("Product Color:", selectedColor);
    console.log("Product Quantity:", quantity);
    console.log("Product price:", productPrice);
  };

  return (
    <Button
      disabled={quantity <= 0 || !selectedColor || !selectedDimension}
      onClick={AddtoCart}
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
