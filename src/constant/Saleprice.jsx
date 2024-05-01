import React, { useContext } from "react";
import PercentageContext from "../context/PercentageContext";

export const calculateSalePrice = (price) => {
  const percentage = useContext(PercentageContext);

  return Math.round(price - (percentage / 100) * price);
};
