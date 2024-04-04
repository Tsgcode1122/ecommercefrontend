// forgetPasswordContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ForgetPasswordContext = createContext();

export const ForgetPasswordProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const forgotPassword = async (email, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/forgot-password",
        { email, newPassword },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    forgotPassword,
    loading,
    error,
  };

  return (
    <ForgetPasswordContext.Provider value={contextValue}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export const useForgetPassword = () => useContext(ForgetPasswordContext);
