import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";
import ReturningCustomerLogin from "./ReturningCustomerLogin";
import CryptoJS from "crypto-js";
import { useUserData } from "../context/UserDataContext";

const Checkout = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);
  const { userData } = useUserData();
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      // Decrypt user data
      const bytes = CryptoJS.AES.decrypt(
        userData,
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      );
      const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      // Set form values from user data
      form.setFieldsValue({
        fullName: decryptedUserData.fullName,
        email: decryptedUserData.email,
        phone: decryptedUserData.phone,
        // Add other fields here
      });
    }
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryNames = response.data.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: country },
      );
      const { states } = response.data.data || [];
      const stateNames = states.map((state) => state.name); // Extracting state names
      setStates(stateNames || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    fetchStates(value);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Handle form submission
  };

  const [form] = Form.useForm();

  return (
    <Container>
      <h2>Checkout</h2>
      <LoginForm>
        {!userData && (
          <p>
            Returning customer?{" "}
            <Link
              onClick={(e) => {
                e.preventDefault();
                setLoginDropdownVisible(!loginDropdownVisible);
              }}
            >
              Click here to login
            </Link>
            {loginDropdownVisible && <ReturningCustomerLogin />}
          </p>
        )}
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select your country" }]}
          >
            <Select
              showSearch
              onChange={handleCountryChange}
              placeholder="Select country"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {countries.map((country) => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please select your state" }]}
          >
            <Select
              showSearch
              onChange={(value) => setSelectedState(value)}
              placeholder="Select state"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {states.map((state) => (
                <Select.Option key={state} value={state}>
                  {state}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[
              { required: true, message: "Please enter your street address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Town/City"
            name="townCity"
            rules={[{ required: true, message: "Please enter your town/city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const LoginForm = styled.div`
  margin-top: 20px;
`;

const ReturningCustomerLoginContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
`;

export default Checkout;
