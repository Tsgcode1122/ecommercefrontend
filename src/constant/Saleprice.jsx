import React, { useContext } from "react";
import PercentageContext from "../context/PercentageContext";

export const calculateSalePrice = (price, percentage) => {
  return Math.round(price - (percentage / 100) * price);
};
