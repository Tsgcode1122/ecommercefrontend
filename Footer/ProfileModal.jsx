import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUserData } from "../src/context/UserDataContext";
import LogoutButton from "../src/components/LogoutButton";

const ProfileModal = ({ visible, onClose }) => {
  const { userData } = useUserData();

  const handleItemClick = () => {
    onClose(); // Close the modal when any item is clicked
  };

  return (
    <ModalOverlay visible={visible} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Menu>
          <MenuItem onClick={handleItemClick}>
            <StyledLink to="/profile">
              <IconWrapper>
                <UserOutlined />
              </IconWrapper>
              <span>Personal Information</span>
              {userData && (
                <FullName>
                  {userData.fullName && userData.fullName.split(" ")[0]}
                </FullName>
              )}
            </StyledLink>
          </MenuItem>
          <MenuItem onClick={handleItemClick}>
            <StyledLink to="/my-orders">
              <IconWrapper>
                <SolutionOutlined />
              </IconWrapper>
              My Orders
            </StyledLink>
          </MenuItem>
          <MenuItem onClick={handleItemClick}>
            <StyledLink to="/reset-password">
              <IconWrapper>
                <LockOutlined />
              </IconWrapper>
              Change Password
            </StyledLink>
          </MenuItem>
          <MenuItem onClick={handleItemClick}>
            <StyledLink>
              <IconWrapper>
                <LogoutOutlined />
              </IconWrapper>
              <LogoutButton />
            </StyledLink>
          </MenuItem>
        </Menu>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 5rem;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #ffff;
  width: 100%;
  padding: 20px;
  margin-bottom: 55px;
  border-radius: 35px 35px 0 0;
  box-shadow: 0px -10px 10px -10px rgba(0, 0, 0, 0.5);
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const FullName = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export default ProfileModal;
