// forgetPasswordContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ForgetPasswordContext = createContext();

export const ForgetPasswordProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newPasswords = async (email, newPassword) => {
    console.log(email, newPassword);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/new-password",
        { email, newPassword },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgetPasswordContext.Provider value={{ loading, error, newPasswords }}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};

export const useForgetPassword = () => useContext(ForgetPasswordContext);
