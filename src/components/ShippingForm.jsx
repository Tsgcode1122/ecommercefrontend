import React, { useState } from "react";
import { Radio, Select } from "antd";

const { Option } = Select;

const ShippingForm = ({
  onPaymentMethodChange,
  onPayOnDeliveryOptionChange,
}) => {
  const [shippingMethod, setShippingMethod] = useState(null);
  const [payOnDeliveryOption, setPayOnDeliveryOption] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setShippingMethod(e.target.value);
    onPaymentMethodChange(e.target.value);
  };

  const handlePayOnDeliveryChange = (value) => {
    setPayOnDeliveryOption(value);
    onPayOnDeliveryOptionChange(value);
  };

  return (
    <div>
      <p>Shipping:</p>
      <Radio.Group onChange={handlePaymentMethodChange} value={shippingMethod}>
        <Radio value="payOnDelivery">Pay on Delivery</Radio>
        <Radio value="payNow">Pay Now</Radio>
      </Radio.Group>
      {shippingMethod === "payOnDelivery" && (
        <div style={{ marginTop: "10px" }}>
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={handlePayOnDeliveryChange}
          >
            <Option value="cash">Cash on delivery</Option>
            <Option value="transfer">Bank Transfer</Option>
          </Select>
        </div>
      )}
      {shippingMethod === "payNow" && (
        <p>
          Kindly proceed to pay for your items. The shipping fee will be sent to
          your email. Thank you.
        </p>
      )}
    </div>
  );
};

export default ShippingForm;
