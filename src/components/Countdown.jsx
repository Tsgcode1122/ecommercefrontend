import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const CountdownContainer = styled.div`
  position: fixed;
  left: 0;
  align-items: center;
  transform: translateY(-50%);
  font-weight: bold;
`;

const ContentContainer = styled.div`
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  animation: moveLeft 20s linear infinite;
  @keyframes moveLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const Content = styled.div`
  font-size: 12px;
  z-index: -1;
`;
const FixedContain = styled.div`
  background-color: white !important;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 9999;

  transform: skewX(-2deg);
`;

const Countdown = () => {
  const [saleData, setSaleData] = useState(null);

  useEffect(() => {
    fetchSaleData();
  }, []);

  const fetchSaleData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/onSaleMotionSlide",
      );
      setSaleData(response.data);
    } catch (error) {
      console.error("Error fetching sale data:", error);
    }
  };

  const calculateTimeLeft = () => {
    if (!saleData || !saleData.startDate || !saleData.endDate) return {};

    const startDate = new Date(saleData.startDate);
    const endDate = new Date(saleData.endDate);
    const difference = endDate - startDate;
    const currentTime = new Date() - startDate;
    const timeLeft = difference - currentTime;

    let timeLeftObj = {};

    if (timeLeft > 0) {
      timeLeftObj = {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeLeft / 1000 / 60) % 60),
        seconds: Math.floor((timeLeft / 1000) % 60),
      };
    }

    return timeLeftObj;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <CountdownContainer>
      {saleData && saleData.enabled ? (
        <>
          <ContentContainer>
            <Content>{saleData.text}</Content>
          </ContentContainer>
          <FixedContain>
            {timeLeft.days} D {timeLeft.hours} Hr {timeLeft.minutes} Min{" "}
            {timeLeft.seconds} Sec Left
          </FixedContain>
        </>
      ) : null}
    </CountdownContainer>
  );
};

export default Countdown;
