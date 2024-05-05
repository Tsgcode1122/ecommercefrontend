import React from "react";
import { Tabs } from "antd";
import { WhatsAppOutlined, InstagramOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { TabPane } = Tabs;

const AboutPage = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
  };

  return (
    <StyledTabs defaultActiveKey="1">
      <TabPane tab="About Us" key="1">
        <AboutContent>
          <p>
            Welcome to our gym wear store! We are dedicated to providing
            high-quality activewear for your fitness journey. Our mission is to
            empower you to achieve your fitness goals while looking and feeling
            your best.
          </p>
          <SocialIcons>
            <a href="https://wa.me/your-whatsapp-number">
              <WhatsAppOutlined />
            </a>
            <a href="https://www.instagram.com/your-instagram-handle">
              <InstagramOutlined />
            </a>
          </SocialIcons>
        </AboutContent>
      </TabPane>
      <TabPane tab="Contact Us" key="2">
        <ContactContent>
          <form onSubmit={handleFormSubmit}>
            <FormGroup>
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" name="fullName" required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
              ></textarea>
            </FormGroup>
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </ContactContent>
      </TabPane>
      <TabPane tab="Store Policy" key="3">
        <PolicyContent>
          <h3>Return Policy</h3>
          <p>
            We want you to be completely satisfied with your purchase. If you
            are not happy with your order for any reason, you may return it
            within 30 days for a full refund.
          </p>
          <h3>Cancellation Policy</h3>
          <p>
            You may cancel your order at any time before it has been shipped.
            Once your order has been shipped, it cannot be canceled.
          </p>
        </PolicyContent>
      </TabPane>
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 20px;
  }
`;

const AboutContent = styled.div`
  padding: 20px;
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  font-size: 24px;

  a {
    margin-right: 10px;
    color: #000;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ContactContent = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  textarea {
    resize: vertical;
    height: 100px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;

const PolicyContent = styled.div`
  padding: 20px;
`;

export default AboutPage;
