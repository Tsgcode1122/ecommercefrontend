import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  HeartOutlined,
  ShoppingOutlined,
  InfoCircleOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useUserData } from "../src/context/UserDataContext";
import ProfileModal from "./ProfileModal";

const Footer = () => {
  const [activeLink, setActiveLink] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { userData } = useUserData();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleProfileClick = () => {
    setActiveLink("profile");
    setModalVisible(true);
  };

  return (
    <>
      <StyledFooter>
        <StyledLink
          to="/"
          active={activeLink === "home"}
          onClick={() => handleLinkClick("home")}
        >
          <IconWrapper>
            <HomeOutlined />
            <IconName>Home</IconName>
          </IconWrapper>
        </StyledLink>
        <StyledLink
          to="/wishlist"
          active={activeLink === "wishlist"}
          onClick={() => handleLinkClick("wishlist")}
        >
          <IconWrapper>
            <HeartOutlined />
            <IconName>Wishlist</IconName>
          </IconWrapper>
        </StyledLink>
        <StyledLink
          to="/products"
          active={activeLink === "products"}
          onClick={() => handleLinkClick("products")}
        >
          <ProductIconWrapper>
            <ShoppingOutlined />
            <IconName>Products</IconName>
          </ProductIconWrapper>
        </StyledLink>
        <StyledLink
          to="/about"
          active={activeLink === "about"}
          onClick={() => handleLinkClick("about")}
        >
          <IconWrapper>
            <InfoCircleOutlined />
            <IconName>About</IconName>
          </IconWrapper>
        </StyledLink>
        {userData ? (
          <StyledLink
            active={activeLink === "profile"}
            onClick={handleProfileClick}
          >
            <IconWrapper className="profile-style">
              <UserOutlined />
              <IconName>Profile</IconName>
            </IconWrapper>
          </StyledLink>
        ) : (
          <StyledLink to="/login">
            <IconWrapper>
              <LoginOutlined />
              <IconName>Login</IconName>
            </IconWrapper>
          </StyledLink>
        )}
      </StyledFooter>
      <ProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  overflow-y: hidden;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ active }) => (active ? "red" : "black")};

  svg {
    color: ${({ active }) => (active ? "red" : "black")};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductIconWrapper = styled(IconWrapper)`
  position: relative;
  z-index: 2;

  ::before {
    content: "";
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    /* clip-path: circle(0 20%, 100% 0, 100% 100%, 0 100%); */

    z-index: -1;
  }
`;

const IconName = styled.span`
  font-size: 12px;
  margin-top: 5px;
`;

export default Footer;
