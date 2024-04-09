import React from "react";
import styled from "styled-components";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const ProfileModal = ({ visible, onClose }) => {
  return (
    <Overlay visible={visible} onClick={onClose}>
      <ModalContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <ModalContent>
          <MenuItem>
            <UserOutlined />
            <ItemText>Personal Information</ItemText>
          </MenuItem>
          <MenuItem>
            <SolutionOutlined />
            <ItemText>My Orders</ItemText>
          </MenuItem>
          <MenuItem>
            <LockOutlined />
            <ItemText>Change Password</ItemText>
          </MenuItem>
          <MenuItem>
            <LogoutOutlined />
            <ItemText>Logout</ItemText>
          </MenuItem>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ visible }) => (visible ? "100%" : "0")};
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000000; /* Set the close button text color */
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  svg {
    margin-right: 12px;
  }
`;

const ItemText = styled.span`
  font-size: 16px;
`;

export default ProfileModal;
