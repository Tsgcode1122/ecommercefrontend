import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import styled from "styled-components";

const LoginPage = () => {
  const { loginUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { token, user } = await loginUser(values);
      message.success("Login successful");

      // Encrypt user data
      const encryptedUserData = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      ).toString();

      // Store token and encrypted user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", encryptedUserData);

      navigate(-1);
    } catch (error) {
      console.error("Error logging in:", error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderEyeIcon = (visible) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

  return (
    <LoginPageContainer>
      <LoginForm
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <LoginFormTitle>Login</LoginFormTitle>
        {/* Email */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" iconRender={renderEyeIcon} />
        </Form.Item>

        {/* Forgot Password? */}
        <ForgotPasswordLink to="/reset-password">
          Forgot Password?
        </ForgotPasswordLink>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>

        {/* Register Now */}
        <RegisterNowText>
          Don't have an account? <Link to="/register">Register Now</Link>
        </RegisterNowText>
      </LoginForm>
    </LoginPageContainer>
  );
};
const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled(Form)`
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const LoginFormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: right;
  margin-bottom: 10px;
  color: #1890ff;
`;

const RegisterNowText = styled.span`
  display: block;
  text-align: center;
  margin-top: 10px;
`;

export default LoginPage;
