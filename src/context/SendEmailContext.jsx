import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SendEmailContext = createContext();

export const SendEmailProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationToken, setVerificationToken] = useState(null);

  useEffect(() => {
    if (verificationToken) {
      localStorage.setItem(
        "verificationToken",
        JSON.stringify(verificationToken),
      );
    }
  }, [verificationToken]);

  const sendEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/email/send-verification-code",
        email,
      );
      setVerificationToken(response.data.token);
      console.log(response.data); // Log success message or handle response
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error.message || "An error occurred while sending the email");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    sendEmail,
    loading,
    error,
  };

  return (
    <SendEmailContext.Provider value={contextValue}>
      {children}
    </SendEmailContext.Provider>
  );
};

export const useSendEmail = () => useContext(SendEmailContext);
