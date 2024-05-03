import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const CouponCodeContext = createContext();

export const CouponCodeProvider = ({ children }) => {
  const [couponCodes, setCouponCodes] = useState([]);

  useEffect(() => {
    fetchCouponCodes();
  }, []);

  const fetchCouponCodes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/discountRoutes/coupon-code",
      );
      setCouponCodes(response.data);
    } catch (error) {
      console.error("Error fetching coupon codes:", error);
    }
  };

  return (
    <CouponCodeContext.Provider value={couponCodes}>
      {children}
    </CouponCodeContext.Provider>
  );
};

export default CouponCodeContext;
