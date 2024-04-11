import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import cart from "../Images/cart.png";
import CartItems from "./CartItems";
import TotalInCart from "./TotalInCart";
import { useUserData } from "../context/UserDataContext";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userData } = useUserData(); // Retrieve userData from UserData
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };
    // to click on the outsidebody and close the sidebar
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <StyledNavbar>
        <MenuToggle onClick={toggleSidebar} />

        {/* Conditionally render login/logout link */}
        {userData ? <LogoutButton /> : <Link to="/login">Login</Link>}

        <Logo>
          <div>{userData && <h3>{userData.fullName}</h3>}</div>
        </Logo>
        <CartIcon onClick={toggleSidebar}>
          <CartIconInner>
            <CartIconImage src={cart} alt="Cart" />
            <ItemCount>
              <TotalInCart />
            </ItemCount>
          </CartIconInner>
        </CartIcon>
      </StyledNavbar>
      <div style={{ height: "5rem" }}></div>

      <Sidebar isOpen={isSidebarOpen} ref={sidebarRef}>
        <CloseButton onClick={closeSidebar}>Close</CloseButton>
        {/* i sent the closesidebar to the cartitems also */}
        <CartItems closeSidebar={closeSidebar} />
      </Sidebar>

      {isSidebarOpen && <Overlay onClick={closeSidebar} />}
    </>
  );
};
// Styled components
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;

  right: 0;
  margin: 0;

  align-items: center;
  justify-content: space-between;
  padding: 1px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const navHeight = styled.div`
  height: 500rem;
`;
const MenuToggle = styled.div`
  margin: 0;
`;

const Logo = styled.div`
  margin: 0;
  padding: 0;
`;

const CartIcon = styled.div`
  margin: 0;
  cursor: pointer;
`;

const CartIconInner = styled.div`
  position: relative;
`;

const CartIconImage = styled.img`
  width: 30px;
  height: 30px;
`;

const ItemCount = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: 300px;
  height: 100vh;
  background-color: #f0f0f0;
  transition: right 0.5s ease-in-out;
  z-index: 999;
  overflow-x: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export default Navbar;
