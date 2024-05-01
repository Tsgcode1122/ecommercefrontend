import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const PercentageContext = createContext();

export const PercentageProvider = ({ children }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchPercentages();
  }, []);

  const fetchPercentages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/discountRoutes/percentage-off",
      );
      const activePercentage = response.data.find(
        (percentage) => percentage.active,
      );
      if (activePercentage) {
        setPercentage(activePercentage.percentageOff);
      } else {
        setPercentage(0); // Set percentage to 0 if no active percentage found
      }
    } catch (error) {
      console.error("Error fetching percentages:", error);
    }
  };

  return (
    <PercentageContext.Provider value={percentage}>
      {children}
    </PercentageContext.Provider>
  );
};

export default PercentageContext;
