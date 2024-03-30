import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CiHeart } from "react-icons/ci";
import { useProductContext } from "../context/ProductContext";
import { calculateSalePrice } from "../constant/Saleprice";
import Reviews from "../components/Reviews";
import ShareProduct from "../components/ShareProduct";
import RelatedProducts from "../components/RelatedProducts";
import { FaPlus, FaMinus } from "react-icons/fa";
import AddToCartButton from "../constant/AddToCartButton";

const SingleProductPage = () => {
  const { id } = useParams();
  const { loading, products } = useProductContext();
  const singleProduct = products.find((product) => product._id === id);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (singleProduct && singleProduct.variants.length > 0) {
      setSelectedColor(singleProduct.variants[0].color);
      setSelectedSize(singleProduct.variants[0].sizes[0].size);
    }
  }, [singleProduct]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setQuantity(1);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };
  const handleIncreaseQuantity = () => {
    const maxQuantity =
      selectedColor && selectedSize
        ? singleProduct.variants
            .find((variant) => variant.color === selectedColor)
            ?.sizes.find((size) => size.size === selectedSize)?.stock || 0
        : singleProduct.stock;
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxQuantity));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
    // Check if selected variant exists and has stock
    const selectedVariant = singleProduct.variants.find(
      (variant) =>
        variant.color === selectedColor &&
        variant.sizes.some((s) => s.size === selectedSize),
    );
    if (!selectedVariant) {
      alert("Please select a valid variant.");
      return;
    }

    if (quantity > selectedVariant.stock) {
      alert("Quantity exceeds available stock.");
      setQuantity(selectedVariant.stock); // Set quantity to available stock
      return;
    }

    // Add to cart logic here
    alert(`Added ${quantity} ${singleProduct.name} to cart.`);
  };
  const disableButton = () =>
    selectedColor && selectedSize
      ? singleProduct.variants
          .find((variant) => variant.color === selectedColor)
          ?.sizes.find((size) => size.size === selectedSize)?.stock === 0
      : true;

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
              {selectedColor && selectedSize ? (
                // Display price based on selected color and size
                singleProduct.onSale ? (
                  <SalePrice>
                    <span className="new-price">
                      $
                      {calculateSalePrice(
                        singleProduct.variants
                          .find((variant) => variant.color === selectedColor)
                          ?.sizes.find((size) => size.size === selectedSize)
                          ?.price || singleProduct.price,
                      )}
                    </span>
                    <span className="old-price">
                      $
                      {singleProduct.variants
                        .find((variant) => variant.color === selectedColor)
                        ?.sizes.find((size) => size.size === selectedSize)
                        ?.price || singleProduct.price}
                    </span>
                  </SalePrice>
                ) : (
                  <span>
                    $
                    {singleProduct.variants
                      .find((variant) => variant.color === selectedColor)
                      ?.sizes.find((size) => size.size === selectedSize)
                      ?.price || "Price not available"}
                  </span>
                )
              ) : (
                "Price not available"
              )}
            </Price>

            <ColorPicker>
              {singleProduct.variants.map((variant) => (
                <ColorOption
                  key={variant.color}
                  color={variant.color}
                  onClick={() => handleColorSelection(variant.color)}
                  selected={selectedColor === variant.color}
                />
              ))}
            </ColorPicker>

            {selectedColor && (
              <SizePicker>
                {singleProduct.variants
                  .find((variant) => variant.color === selectedColor)
                  ?.sizes.map((size) => (
                    <SizeOption
                      key={size.size}
                      onClick={() => handleSizeSelection(size.size)}
                      selected={selectedSize === size.size}
                    >
                      {size.size}
                    </SizeOption>
                  ))}
              </SizePicker>
            )}

            {/* button to increase and descrease, and it should not be more than the available in stock of that particular variants color size */}
            {/* Quantity control */}
            <QuantityControl>
              <button
                type="button"
                className="amount-btn"
                onClick={handleDecreaseQuantity}
                disabled={disableButton()}
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                className="amount-btn"
                onClick={handleIncreaseQuantity}
                disabled={disableButton()}
              >
                <FaPlus />
              </button>
            </QuantityControl>
            <p>
              Availability:{" "}
              {selectedColor && selectedSize
                ? singleProduct.variants
                    .find((variant) => variant.color === selectedColor)
                    ?.sizes.find((size) => size.size === selectedSize)?.stock
                : singleProduct.stock}{" "}
              in stock{" "}
            </p>
            <AddToCartButton
              singleProduct={singleProduct}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />
          </ProductInfo>
          <div className="productdetail">
            <Reviews />
            <ShareProduct />
          </div>
          <div className="related">
            <RelatedProducts />
          </div>
        </>
      ) : (
        <div>Product not found.</div>
      )}
    </Container>
  );
};

const Container = styled.div``;
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90px;

  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 0.5rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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

const SizeOption = styled.span`
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
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
