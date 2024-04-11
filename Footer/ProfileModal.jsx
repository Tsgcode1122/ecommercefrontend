import React from "react";
import { Modal, Menu } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const ProfileModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      maskClosable={false}
    >
      <Menu theme="light" mode="vertical">
        <Menu.Item key="1" icon={<UserOutlined />}>
          Personal Information
        </Menu.Item>
        <Menu.Item key="2" icon={<SolutionOutlined />}>
          My Orders
        </Menu.Item>
        <Menu.Item key="3" icon={<LockOutlined />}>
          Change Password
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Modal>
  );
};

export default ProfileModal;
