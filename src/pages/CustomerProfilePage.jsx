import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, message } from "antd";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useUserData } from "../context/UserDataContext";

const CustomerProfilePage = () => {
  const { userData } = useUserData();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [form] = Form.useForm();
  const userId = userData ? userData._id : null;
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
      console.log(decryptedUserData);
      // Set form values from user data
      form.setFieldsValue({
        fullName: decryptedUserData.fullName,
        country: decryptedUserData.country,
        state: decryptedUserData.state,
        phone: decryptedUserData.phoneNumber,
        streetAddress: decryptedUserData.streetAddress,
        townCity: decryptedUserData.city,
      });
    }
  }, [userData]);
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
      const stateNames = states.map((state) => state.name);
      setStates(stateNames || []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleCountryChange = (value) => {
    // Fetch states for the selected country
    fetchStates(value);
  };

  const updateProfile = async (values) => {
    try {
      const { fullName, country, state, streetAddress, townCity, phone } =
        values;

      // Make API call to update user profile
      const response = await axios.put(
        `http://localhost:5005/api/auth/update-user/${userId}`,
        {
          fullName,
          country,
          state,
          streetAddress,
          city: townCity,
          phoneNumber: phone,
        },
      );

      // Update user data in local storage
      const storedEncryptedUserData = localStorage.getItem("user");
      if (storedEncryptedUserData) {
        const bytes = CryptoJS.AES.decrypt(
          storedEncryptedUserData,
          "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
        );
        const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        // Update only the changed fields
        const updatedUserData = {
          ...decryptedUserData,
          fullName,
          country,
          state,
          streetAddress,
          city: townCity,
          phoneNumber: phone,
        };

        const encryptedUserData = CryptoJS.AES.encrypt(
          JSON.stringify(updatedUserData),
          "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
        ).toString();

        localStorage.setItem("user", encryptedUserData);
      }

      message.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  return (
    <Container>
      <Form form={form} onFinish={updateProfile}>
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
          rules={[{ message: "Please select your country" }]}
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
          rules={[{ message: "Please select your state" }]}
        >
          <Select
            showSearch
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
            {
              message: "Please enter your street address",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Town/City"
          name="townCity"
          rules={[{ message: "Please enter your town/city" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              message: "Please enter your phone number",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

export default CustomerProfilePage;
