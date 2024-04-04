// UserContext.js

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/register",
        userData,
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/login",
        userData,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/forgot-password",
        { email },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{ registerUser, loginUser, forgotPassword, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
