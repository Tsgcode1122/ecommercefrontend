// FeaturedProducts.jsx
import React from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";

const FeaturedProducts = () => {
  const { featuredProducts } = useProductContext();

  return (
    <Container>
      <h2>Featured Products</h2>
      <ProductList>
        {featuredProducts.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.images[0]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </ProductCard>
        ))}
      </ProductList>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
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

export default FeaturedProducts;
