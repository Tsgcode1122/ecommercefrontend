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
import StripePaymentModal from "../../payment/StripePaymentModal";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import DirectTransfer from "../../payment/DirectTransfer";

const stripePromise = loadStripe(
  "pk_test_51OuEOcP5VD7BOW3SqV5IuUrwEjGl5KoH8uzQrxHEbGjDqUk8Pf6CuKCR0W5gYIeZI392vqhQI6KTJflhl0rTcxPr00BWkzDpIb",
);

const Checkout = ({ setOrderConfirmed, orderConfirmed }) => {
  // console.log(setOrderConfirmed);
  const { cart, clearCart } = useCartContext();
  const { userData } = useUserData();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loginDropdownVisible, setLoginDropdownVisible] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [payOnDeliveryOption, setPayOnDeliveryOption] = useState(null);
  const [totalPrice, setTotalPrice] = useState();
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showDirectModal, setShowDirectModal] = useState(false);

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
  const handleModal = async (values) => {
    try {
      await form.validateFields(); // Validate all form fields

      // Check if payment method is selected
      if (!paymentMethod) {
        message.error("Please select a payment method");
        return;
      }
      if (!ShippingForm) {
        message.error("Please select a shipping fee option");
        return;
      }

      if (paymentMethod === "stripe") {
        setShowStripeModal(true);
      } else if (paymentMethod === "directTransfer") {
        setShowDirectModal(true);
      } else {
        // Handle other payment methods
        // For example, pay on delivery, etc.
      }
    } catch (error) {
      console.error("modal:", error);
      message.error("kindly fill all the form to proceed");
    }
  };
  const handleCloseModal = () => {
    setShowStripeModal(false);
  };
  const handleDirectModal = () => {
    setShowDirectModal(false);
  };

  const handleSubmit = async (paymentMethod, values) => {
    console.log(values);
    console.log(paymentMethod);
    const amountInCents = totalPrice * 100;

    event.preventDefault();
    try {
      await form.validateFields(); // Validate all form fields
      const { id, card, billing_details } = paymentMethod;
      const { brand, exp_month, exp_year, last4 } = card;
      const { address, email, name, phone } = billing_details;
      const response = await axios.post(
        "http://localhost:5005/api/payments/create-payment-intent",
        {
          amount: amountInCents,
          currency: "USD",
          email: values.email,
          paymentMethod: {
            id: id,
            brand: brand,
            exp_month: exp_month,
            exp_year: exp_year,
            last4: last4,
            billing_details: {
              address: address,
              email: email,
              name: name,
              phone: phone,
            },
          },
        },
      );
      console.log(response.data);
      if (!response) {
        console.error("Payment confirmation error:", error);

        message.error("Payment failed. Please try again.");
      } else {
        // Payment successful
        console.log("Payment successful");

        await sendOrderDetailsToBackend(values);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      // Handle validation or other errors
      message.error("Payment processing error. Please try again.");
    }
  };

  const sendOrderDetailsToBackend = async (values) => {
    event.preventDefault();
    try {
      // Fetch user data from local storage
      const userData = localStorage.getItem("user");
      let userId = null;
      if (userData) {
        // Decrypt user data
        const bytes = CryptoJS.AES.decrypt(
          userData,
          "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
        );
        const decryptedUserData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        userId = decryptedUserData._id;
      }

      const orderData = {
        userId: userId,
        paymentMethod: paymentMethod,
        shippingMethod: shippingMethod,
        payOnDeliveryOption: payOnDeliveryOption,
        totalPrice: totalPrice,
        cartItems: cart.map((item, index) => ({
          name: item.productName,
          details: {
            Color: item.selectedColor,
            Size: item.selectedSize,
            Price: item.displayedPrice,
            Quantity: item.quantity,
            Image: item.productImage,
          },
        })),
        formData: values,
      };
      console.log(orderData);

      const response = await axios.post(
        "http://localhost:5005/api/orders",
        orderData,
      );

      if (response.status === 201) {
        // Clear cart data from local storage
        localStorage.removeItem("cart");
        clearCart();
        if (paymentMethod === "stripe") {
          handleCloseModal();
        } else if (paymentMethod === "directTransfer") {
          handleDirectModal();
        }
        setOrderConfirmed(true);
        navigate("/success-message");
      } else {
        message.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error sending order details to backend:", error);
      // Handle error
      message.error("Error placing order. Please try again.");
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
          <Form form={form}>
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
              onPaymentMethodChange={setShippingMethod}
              onPayOnDeliveryOptionChange={setPayOnDeliveryOption}
            />
            <hr />
            <PaymentMethod
              total={totalPrice}
              setTotalPrice={setTotalPrice}
              onPaymentMethodChange={setPaymentMethod}
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleModal}
                disabled={cart.length === 0}
              >
                Proceed to payment ${totalPrice}
              </Button>
            </Form.Item>
          </Form>
        </LoginForm>
        {showStripeModal && (
          <Elements stripe={stripePromise}>
            <StripePaymentModal
              totalPrice={totalPrice}
              handleSubmit={handleSubmit}
              onClose={handleCloseModal}
              values={form.getFieldsValue()}
            />
          </Elements>
        )}
        {showDirectModal && (
          <DirectTransfer
            totalPrice={totalPrice}
            handleDirectSubmit={handleSubmit}
            sendOrderDetailsToBackend={sendOrderDetailsToBackend}
            onClose={handleDirectModal}
            values={form.getFieldsValue()}
          />
        )}
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
