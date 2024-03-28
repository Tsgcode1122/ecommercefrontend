import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useProductContext } from "../context/ProductContext";
import { calculateSalePrice } from "../constant/Saleprice";
import Reviews from "../components/Reviews";

const SingleProductPage = () => {
  const { id } = useParams();
  const { loading, products } = useProductContext();
  const singleProduct = products.find((product) => product._id === id);

  // initial selected color to the first color option
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDimension, setSelectedDimension] = useState("");
  const [quantity, setQuantity] = useState(singleProduct?.stock === 0 ? 0 : 1);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleDimensionSelection = (dimension) => {
    setSelectedDimension(dimension);
  };

  const handleIncreaseQuantity = () => {
    // Ensure quantity doesn't exceed available stock
    setQuantity((prevQuantity) =>
      Math.min(prevQuantity + 1, singleProduct.stock),
    );
  };

  const handleDecreaseQuantity = () => {
    // Ensure quantity doesn't go below 1
    setQuantity((prevQuantity) =>
      Math.max(prevQuantity - 1, singleProduct.stock === 0 ? 0 : 1),
    );
  };

  // Calculate price to display based on color selection

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : singleProduct ? (
        <>
          <div className="namewishlist">
            <h2>{singleProduct.name}</h2>
            <div className="wishlist-icon">
              <CiHeart />
            </div>
          </div>
          <ProductImages>
            {singleProduct.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${index + 1}`} />
            ))}
          </ProductImages>
          <ProductInfo>
            <Price>
              {singleProduct.onSale ? (
                <SalePrice>
                  <span className="new-price">
                    $
                    {calculateSalePrice(
                      selectedColor
                        ? singleProduct.variants.find(
                            (v) => v.color === selectedColor,
                          )?.price || singleProduct.price
                        : singleProduct.price,
                    )}
                  </span>
                  <span className="old-price">
                    $
                    {selectedColor
                      ? singleProduct.variants.find(
                          (v) => v.color === selectedColor,
                        )?.price || singleProduct.price
                      : singleProduct.price}
                  </span>
                </SalePrice>
              ) : singleProduct.price ? (
                <span>
                  $
                  {selectedColor
                    ? singleProduct.variants.find(
                        (v) => v.color === selectedColor,
                      )?.price || singleProduct.price
                    : singleProduct.price}
                </span>
              ) : (
                "Price not available"
              )}
            </Price>

            <ColorPicker>
              {singleProduct.variants.map((variant) => (
                <ColorOption
                  key={variant._id}
                  color={variant.color}
                  onClick={() => handleColorSelection(variant.color)}
                  selected={selectedColor === variant.color}
                />
              ))}
            </ColorPicker>
            <SizePicker>
              {singleProduct.dimensions.map((dimension) => (
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
            <p>Availability: {singleProduct.stock} in stock </p>
            <AddToCartButton
              disabled={quantity <= 0 || !selectedColor || !selectedDimension}
            >
              {singleProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </AddToCartButton>
          </ProductInfo>
          <div className="productdetail">
            <Reviews />
          </div>
        </>
      ) : (
        <div>Product not found.</div>
      )}
    </Container>
  );
};

const Container = styled.div``;

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
  text-decoration: none;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
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
const SalePrice = styled.div`
  margin: 0;
  padding: 0;
  .new-price {
    font-weight: bold;
    color: red;
  }

  .old-price {
    text-decoration: line-through;
    color: #666666;
    margin-left: 5px;
  }
`;
export default SingleProductPage;
