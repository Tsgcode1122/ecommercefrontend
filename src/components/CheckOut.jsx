// Checkout.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, Input, Select, Button, message } from "antd";
import axios from "axios";
import ShippingForm from "./ShippingForm";
import ReturningCustomerLogin from "./ReturningCustomerLogin";
import CryptoJS from "crypto-js";
import { useUserData } from "../context/UserDataContext";
import { useCartContext } from "../context/CartContext";
import CartItemCheckoutSummary from "./CartItemCheckoutSummary";
import PaymentMethod from "../../payment/PaymentMethod";

const Checkout = () => {
  const { cart } = useCartContext();
  const { userData } = useUserData();

  const { TextArea } = Input;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [payOnDeliveryOption, setPayOnDeliveryOption] = useState(null);
  const [totalPrice, setTotalPrice] = useState();

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

  const handleSubmit = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields

      // Check if payment method and shipping method are selected
      if (!paymentMethod || !payOnDeliveryOption) {
        message.error("Please select payment and shipping methods");
        return;
      }

      console.log("Form values:", values);
      console.log("Payment Method:", paymentMethod);
      console.log("Pay on Delivery Option:", payOnDeliveryOption);
      console.log("total price", totalPrice);
      // Map cart items with unique keys
      cart.forEach((item, index) => {
        console.log(`Order ${index + 1}:`);
        console.log("Name:", item.productName);
        console.log("Details:", {
          Color: item.selectedColor,
          Size: item.selectedSize,
          Price: item.displayedPrice,
          Quantity: item.quantity,
          Image: item.productImage,
        });
      });

      const userData = localStorage.getItem("user");
      if (userData) {
        // Decrypt user data
        const bytes = CryptoJS.AES.decrypt(
          userData,
          "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
        );
        const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("User ID:", decryptedUserData._id);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };
  const [form] = Form.useForm();

  return (
    <>
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
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please select your country" },
              ]}
            >
              <Select
                showSearch
                onChange={handleCountryChange}
                placeholder="Select country"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
                  required: true,
                  message: "Please enter your street address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Town/City"
              name="townCity"
              rules={[
                { required: true, message: "Please enter your town/city" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
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
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="short note" name="text">
              <TextArea rows={4} placeholder="short note" />
            </Form.Item>
            <ViewSummaryButton onClick={toggleSummary}>
              View Summary
            </ViewSummaryButton>

            <CartItemCheckoutSummary
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              closeSummary={toggleSummary}
            />

            <ShippingForm
              onPaymentMethodChange={setPaymentMethod}
              onPayOnDeliveryOptionChange={setPayOnDeliveryOption}
            />
            <hr />
            <PaymentMethod total={totalPrice} setTotalPrice={setTotalPrice} />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Proceed to payment ${totalPrice}
              </Button>
            </Form.Item>
          </Form>
        </LoginForm>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const LoginForm = styled.div`
  margin-top: 20px;
`;
const ViewSummaryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Checkout;
