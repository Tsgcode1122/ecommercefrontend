import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useSalePopupContext } from "../context/SalePopupContext";
import styled from "styled-components";

const SalePopupModal = () => {
  const [visible, setVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const { getAllSalePopups } = useSalePopupContext();

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const allPopups = await getAllSalePopups();
        const livePopup = allPopups.find((popup) => popup.liveNow === true);
        if (livePopup) {
          setPopupData(livePopup);
          setVisible(true);
        }
      } catch (error) {
        console.error("Error fetching sale popup data:", error);
        message.error("Failed to fetch sale popup data");
      }
    };

    const delay = setTimeout(() => {
      fetchPopupData();
    }, 60 * 100);

    const interval = setInterval(
      () => {
        fetchPopupData();
      },
      3 * 60 * 100000,
    ); // 30 minutes in milliseconds

    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [getAllSalePopups]);

  const handleClose = () => {
    setVisible(false);
  };

  const renderPopupContent = () => {
    if (!popupData) return null;

    const { heading, content, deliveryMethod, images, coupon } = popupData;

    return (
      <PopupContentWrapper>
        <ImageWrapper>
          <img src={images} alt="Sale Popup" style={{ maxWidth: "100%" }} />
        </ImageWrapper>
        <ContentWrapper>
          <Heading>{heading}</Heading>
          <Content>{content}</Content>
          {deliveryMethod === "emailInput" && (
            <Form layout="vertical">
              <Form.Item label="Enter your email">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          )}
          {deliveryMethod === "couponGiving" && (
            <CouponWrapper>
              <CouponCodeWrapper>
                <CouponCode>{coupon}</CouponCode>
              </CouponCodeWrapper>
            </CouponWrapper>
          )}
        </ContentWrapper>
      </PopupContentWrapper>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      footer={null}
      centered
      width={800}
      bodyStyle={{ padding: 0 }}
    >
      {renderPopupContent()}
    </Modal>
  );
};

const PopupContentWrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  flex: 2;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CouponWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const CouponCodeWrapper = styled.div`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const CouponCode = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export default SalePopupModal;
