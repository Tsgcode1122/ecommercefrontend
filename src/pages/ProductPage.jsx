// ProductPage.jsx
import React from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";

const ProductPage = () => {
  const { products } = useProductContext();

  return (
    <Wrapper>
      <h2>All Products</h2>
      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media screen and (max-width: 499px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #666666;
  }
`;

export default ProductPage;
