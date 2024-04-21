// context/SalePopupContext.js

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const SalePopupContext = createContext();

export const SalePopupProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const createSalePopup = async (salePopupData) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/salePopup/",
        salePopupData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating sale popup:", error);
      setError("Failed to create sale popup");
      throw error;
    }
  };

  return (
    <SalePopupContext.Provider
      value={{
        createSalePopup,
        error,
      }}
    >
      {children}
    </SalePopupContext.Provider>
  );
};

export const useSalePopupContext = () => useContext(SalePopupContext);
