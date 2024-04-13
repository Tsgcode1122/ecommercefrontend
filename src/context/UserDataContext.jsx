import React, { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve encrypted user data from local storage
    const storedEncryptedUserData = localStorage.getItem("user");
    if (storedEncryptedUserData) {
      // Decrypt and set user data
      const bytes = CryptoJS.AES.decrypt(
        storedEncryptedUserData,
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      );
      const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);
      try {
        const parsedUserData = JSON.parse(decryptedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};
