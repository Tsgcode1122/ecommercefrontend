import React, { useState, useEffect, useContext } from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { calculateSalePrice } from "../constant/Saleprice";
import { Link } from "react-router-dom";
import AddToWishlist from "../components/AddToWishlist";
import PercentageContext from "../context/PercentageContext";
const FeaturedProducts = () => {
  const percentage = useContext(PercentageContext);
  const { featuredProducts } = useProductContext();

  return (
    <Wrapper>
      <h2>Featured Products</h2>
      <ProductContainer>
        {featuredProducts.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <div className="icon-container">
              <div className="icon-container">
                <AddToWishlist productId={product._id} />
              </div>
            </div>
            <Link to={`/products/${product._id}`} className="link">
              <div className="order">
                <p>Select Options</p>
                <div className="eye-icon">
                  <IoEyeOutline />
                </div>
              </div>
              <div className="cart-name">
                <h5>{product.name}</h5>{" "}
                {product.onSale ? (
                  <SalePrice>
                    <span className="new-price">
                      ${calculateSalePrice(product.price, percentage)}
                    </span>
                    <span className="old-price">${product.price}</span>
                  </SalePrice>
                ) : (
                  <p>${product.price}</p>
                )}
              </div>
              {product.stock === 0 && (
                <OutOfStock className="out-of-stock">Out of stock</OutOfStock>
              )}
            </Link>
          </ProductCard>
        ))}
      </ProductContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: black;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  position: relative;
  @media screen and (max-width: 499px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const ProductCard = styled.div`
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Align icons vertically at the bottom
  position: relative;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #666666;
    margin: 0;
  }
  .cart-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    padding: 0;
    margin: 0;
  }
  .icon-container {
    position: absolute;
    top: 5%;
    right: 1px;

    display: flex;
    /* justify-content: space-around; */
    flex-direction: column;
    gap: 240px;
    align-items: center;
    height: 100%;
  }

  .wishlist-icon {
    font-size: 25px;
    height: 30px;
    width: 30px;
    display: flex;

    justify-content: center;
    align-items: center;
    color: #666666;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
    border-radius: 50%;
    margin-bottom: 10px; // Add margin between icons
  }

  .cart-icon {
    font-size: 22px;
  }
  .wishlist-icon:hover,
  .cart-icon:hover,
  .eye-icon:hover {
    color: #ff4500; // Change color on hover
  }
  .order {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    align-items: center;
    justify-content: space-between;
    margin-top: -22px;
    margin-bottom: 12px;

    cursor: pointer;
    padding: 4px;
    display: flex;
    background-color: white;
    text-align: center;
  }
`;

const OnSaleLabel = styled.div`
  position: absolute;
  top: 5%;
  left: 10px;
  background-color: red;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;
const OutOfStock = styled.div`
  color: red;

  font-size: 14px;
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

export default FeaturedProducts;
