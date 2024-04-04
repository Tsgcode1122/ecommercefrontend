import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useUserContext } from "../context/UserContext";
import { useSendEmail } from "../context/SendEmailContext";
import Swal from "sweetalert2";
import axios from "axios";
const RegisterPage = () => {
  const { registerUser } = useUserContext();
  const { sendEmail } = useSendEmail();
  const [form] = Form.useForm();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [existingProfile, setExistingProfile] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const validatePassword = (_, value) => {
    if (!value || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      return Promise.reject(
        "Password must contain at least one special character",
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      const emailExistsResponse = await axios.post(
        "http://localhost:5005/api/auth/check-exists",
        {
          email: values.email,
        },
      );
      // check for existing email
      if (emailExistsResponse.data.exists) {
        setExistingProfile(true);
        return; // Exit early if the email already exists
      }
      // Send verification code to the email
      const response = await sendVerificationCode(values.email);
      // Store the token in local storage
      localStorage.setItem("verificationToken", response.token);
      setModalVisible(true); // Open the verification modal
    } catch (error) {
      console.error("Error sending verification code:", error);
      message.error("Failed to send verification code");
    }
  };

  const handleVerification = async () => {
    try {
      // Validate the verification code
      if (!verificationCode) {
        message.error("Please enter the verification code");
        return;
      }
      // Verify the code
      const response = await verifyCode(verificationCode); // Added verificationCode parameter here
      if (response && response.success) {
        // If code is verified successfully, proceed with registration
        await registerUser(form.getFieldsValue());
        setExistingProfile(false);
        setRegistrationSuccess(true);
        message.success("Registration Successful");
        form.resetFields();

        setModalVisible(false);
      } else {
        // If code is incorrect, show error message
        message.error("Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      message.error("Failed to verify code");
    }
  };

  const sendVerificationCode = async (email) => {
    try {
      const response = await sendEmail({ email });
      message.info("Verification code sent to your email");
      return response.data; // Return the response from the backend
    } catch (error) {
      throw error;
    }
  };

  const verifyCode = async (verificationCode) => {
    try {
      // Call your backend API to verify the code
      const response = await axios.post(
        "http://localhost:5005/api/email/verify-code",
        { verificationCode },
      );
      return response.data; // Assuming your backend sends { success: true } if the code is correct
    } catch (error) {
      throw error;
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        {/* Full Name */}
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Please enter a valid email" },
            { required: true, message: "Please enter your email" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9]+$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 7, message: "Password must be at least 7 characters long" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      {/* Verification Modal */}
      <Modal
        title="Enter Verification Code"
        visible={modalVisible}
        onOk={handleVerification}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </Modal>

      {registrationSuccess && (
        <p style={{ color: "green" }}>Registration successful</p>
      )}
      {existingProfile && (
        <p style={{ color: "red" }}>Profile already exists</p>
      )}
    </div>
  );
};

export default RegisterPage;
