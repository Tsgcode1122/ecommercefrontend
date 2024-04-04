import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the SendEmailContext
const SendEmailContext = createContext();

// Create the SendEmailProvider component
export const SendEmailProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5005/api/email/send-verification-code",
        email,
      );
      console.log(response.data); // Log success message or handle response
      localStorage.setItem(
        "verificationToken",
        JSON.stringify(response.data.token),
      );
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error.message || "An error occurred while sending the email");
    } finally {
      setLoading(false);
    }
  };

  // Expose the sendEmail function to the context value
  const contextValue = {
    sendEmail,
    loading,
    error,
  };

  return (
    <SendEmailContext.Provider
      value={{
        contextValue,
        SendEmailContext,
        SendEmailProvider,
        sendEmail,
      }}
    >
      {children}
    </SendEmailContext.Provider>
  );
};
// Create a custom hook to use the SendEmailContext
export const useSendEmail = () => useContext(SendEmailContext);
