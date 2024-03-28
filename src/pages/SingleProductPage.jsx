import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";

const SingleProductPage = () => {
  const { id } = useParams();
  const { products } = useProductContext();
  const product = products.find((product) => product._id === id);

  // initial selected color to the first color option
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color || "",
  );
  const [selectedDimension, setSelectedDimension] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleDimensionSelection = (dimension) => {
    setSelectedDimension(dimension);
  };

  const handleIncreaseQuantity = () => {
    // to  Ensure quantity doesn't exceed available stock
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, product.stock));
  };

  const handleDecreaseQuantity = () => {
    // to  Ensure quantity doesn't go below 1
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  // Calculate the price to display based on color selection
  const displayPrice = selectedColor
    ? product.variants.find((v) => v.color === selectedColor)?.price ||
      product.price
    : product.price;

  return (
    <Container>
      <ProductImages>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </ProductImages>
      <ProductInfo>
        <h2>{product.name}</h2>
        <Price>
          {displayPrice ? `$${displayPrice}` : "Price not available"}
        </Price>
        <ColorPicker>
          {product.variants.map((variant) => (
            <ColorOption
              key={variant._id}
              color={variant.color}
              onClick={() => handleColorSelection(variant.color)}
              selected={selectedColor === variant.color}
            />
          ))}
        </ColorPicker>
        <SizePicker>
          {product.dimensions.map((dimension) => (
            <DimensionOption
              key={dimension}
              onClick={() => handleDimensionSelection(dimension)}
              selected={selectedDimension === dimension}
            >
              {dimension}
            </DimensionOption>
          ))}
        </SizePicker>
        <QuantityControl>
          Quantity: <button onClick={handleDecreaseQuantity}>-</button>
          {quantity}
          <button onClick={handleIncreaseQuantity}>+</button>
        </QuantityControl>
        <AddToCartButton
          disabled={quantity <= 0 || !selectedColor || !selectedDimension}
        >
          Add to Cart
        </AddToCartButton>
      </ProductInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ProductImages = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-right: 10px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;
`;

const ColorPicker = styled.div`
  margin-bottom: 10px;
`;

const ColorOption = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
`;

const SizePicker = styled.div`
  margin-bottom: 10px;
`;

const DimensionOption = styled.span`
  margin-right: 10px;
  cursor: pointer;
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};
`;

const QuantityControl = styled.div`
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
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

const Price = styled.div`
  margin-bottom: 10px;
`;

export default SingleProductPage;
