import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { useProductContext } from "../context/ProductContext";
import { calculateSalePrice } from "../constant/Saleprice";
import Reviews from "../components/Reviews";
import ShareProduct from "../components/ShareProduct";
import RelatedProducts from "../components/RelatedProducts";
import AmountButtons from "../components/AmountButtons";
import AddToCartButton from "../components/AddtoCartButton";

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
            <AmountButtons quantity={quantity} setQuantity={setQuantity} />
            <p>Availability: {singleProduct.stock} in stock </p>
            <AddToCartButton
              selectedColor={selectedColor}
              selectedDimension={selectedDimension}
              quantity={quantity}
              singleProduct={singleProduct}
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
