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

  const editSalePopup = async (salePopupId, updatedSalePopupData) => {
    try {
      const response = await axios.put(
        `http://localhost:5005/api/salePopup/${salePopupId}`,
        updatedSalePopupData,
      );
      return response.data;
    } catch (error) {
      console.error("Error editing sale popup:", error);
      setError("Failed to edit sale popup");
      throw error;
    }
  };

  const pauseSalePopup = async (salePopupId) => {
    try {
      const response = await axios.put(
        `http://localhost:5005/api/salePopup/pause/${salePopupId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error pausing sale popup:", error);
      setError("Failed to pause sale popup");
      throw error;
    }
  };

  const getSalePopup = async (salePopupId) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/salePopup/${salePopupId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error getting sale popup:", error);
      setError("Failed to get sale popup");
      throw error;
    }
  };

  const getAllSalePopups = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/salePopup/");
      return response.data;
    } catch (error) {
      console.error("Error getting all sale popups:", error);
      setError("Failed to get all sale popups");
      throw error;
    }
  };

  return (
    <SalePopupContext.Provider
      value={{
        createSalePopup,
        editSalePopup,
        pauseSalePopup,
        getSalePopup,
        getAllSalePopups,
        error,
      }}
    >
      {children}
    </SalePopupContext.Provider>
  );
};

export const useSalePopupContext = () => useContext(SalePopupContext);
