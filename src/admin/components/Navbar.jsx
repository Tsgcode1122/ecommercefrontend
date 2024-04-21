import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  FileOutlined,
  OrderedListOutlined,
  TagOutlined,
  FormOutlined,
  UserOutlined,
  BellOutlined,
  StarOutlined,
  DownOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const { SubMenu } = Menu;

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <>
      <StyledNavbar style={{ top: visible ? 0 : "-5rem" }}>
        <Inner>
          <NotificationCount>21</NotificationCount>
          <BellOutlined style={{ fontSize: "24px", color: "#000000" }} />
        </Inner>
        <MenuToggle onClick={toggleSidebar}>
          <MenuOutlined />
        </MenuToggle>
      </StyledNavbar>
      <NavHeight></NavHeight>
      <Sidebar isOpen={isSidebarOpen} ref={sidebarRef}>
        <SidebarContent>
          <Menu mode="inline" defaultSelectedKeys={["0"]} theme="light">
            <Menu.Item key="0" icon={<FormOutlined />}>
              <Link to="/admin" onClick={closeSidebar}>
                Overview
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<ShoppingCartOutlined />}
              title="Products"
            >
              <Menu.Item key="1">
                <Link to="/admin/manage-products" onClick={closeSidebar}>
                  Manage Products
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/admin/create-products" onClick={closeSidebar}>
                  Create Products
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              <Link to="/admin/manage-orders" onClick={closeSidebar}>
                Manage Orders
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="4">
                <Link to="/admin/create-orders" onClick={closeSidebar}>
                  Create Orders
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/admin/new-orders" onClick={closeSidebar}>
                  New Orders
                </Link>
              </Menu.Item> */}

            <Menu.Item key="6" icon={<LineChartOutlined />}>
              <Link to="/admin/salesReport" onClick={closeSidebar}>
                Sales Report
              </Link>
            </Menu.Item>

            <SubMenu key="sub4" icon={<TagOutlined />} title="Discount">
              <Menu.Item key="7">
                <Link to="/admin/create-discount" onClick={closeSidebar}>
                  Create discount
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/admin/create-coupon" onClick={closeSidebar}>
                  Create Coupon
                </Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link
                  to="/admin/create-sales-percentage"
                  onClick={closeSidebar}
                >
                  Create sales Percentage
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<FileOutlined />} title="Reports">
              <Menu.Item key="10">
                <Link to="/admin/transactions" onClick={closeSidebar}>
                  Transactions
                </Link>
              </Menu.Item>

              <Menu.Item key="11">
                <Link to="/admin/total-orders" onClick={closeSidebar}>
                  Total Orders
                </Link>
              </Menu.Item>

              <Menu.Item key="12">
                <Link to="/admin/page-visits" onClick={closeSidebar}>
                  Page visitors
                </Link>
              </Menu.Item>
              <Menu.Item key="13">
                <Link to="/admin/cancelled-orders" onClick={closeSidebar}>
                  Cancelled Orders
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="14" icon={<UserOutlined />}>
              <Link to="/admin/customers" onClick={closeSidebar}>
                Customers
              </Link>
            </Menu.Item>
            <Menu.Item key="15" icon={<TagsOutlined />}>
              <Link to="/admin/customers-Requests" onClick={closeSidebar}>
                Customers Requests
              </Link>
            </Menu.Item>
            <Menu.Item key="16" icon={<UsergroupAddOutlined />}>
              <Link to="/admin/registered-users" onClick={closeSidebar}>
                Registered Users
              </Link>
            </Menu.Item>
            <Menu.Item key="17" icon={<SolutionOutlined />}>
              <Link to="/admin/create-sales-pop" onClick={closeSidebar}>
                Create Sales PopUp
              </Link>
            </Menu.Item>
            <Menu.Item key="18" icon={<StarOutlined />}>
              <Link to="/admin/reviews" onClick={closeSidebar}>
                Reviews
              </Link>
            </Menu.Item>
          </Menu>
        </SidebarContent>
      </Sidebar>
      {isSidebarOpen && <Overlay onClick={closeSidebar} />}
    </>
  );
};
const NavHeight = styled.div`
  height: 3rem;
`;
// Styled components
const Inner = styled.div`
  position: relative;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
`;
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  right: 0;
  height: 3rem;
  gap: 20px;
  margin: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 1px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: top 0.3s;
`;

const MenuToggle = styled.div`
  margin: 0;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: 300px;
  height: 100vh;
  background-color: #ffffff;
  border-radius: 0 20px 20px 0;
  border-right: 0.5px solid #313538;
  transition: left 0.5s ease-in-out;
  z-index: 1000; /* Ensure Sidebar is on top */
  overflow-x: hidden;
`;

const SidebarContent = styled.div`
  padding: 10px;
  padding-top: 3rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998; /* Ensure Overlay is below Sidebar */
`;

export default Navbar;
