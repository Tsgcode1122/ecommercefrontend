import React from "react";
import styled from "styled-components";
import heroImage from "../Images/hero.jpg";
import heroImage1 from "../Images/hero1.jpg";

const HeroContainer = styled.div`
  max-width: 100%;
  position: relative;
  height: 600px;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled.div`
  z-index: 1;
  color: white;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 40px;
`;

const CTAButton = styled.button`
  padding: 15px 30px;
  font-size: 20px;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff6347;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <Overlay />
      <HeroContent>
        <Title>Welcome to Our Gym Wear Store</Title>
        <Description>
          Discover the latest trends in fitness apparel.
        </Description>
        <CTAButton>Shop Now</CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
