import React, { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve encrypted user data from local storage
    const storedEncryptedUserData = localStorage.getItem("user");

    // Decrypt and set user data
    if (storedEncryptedUserData) {
      const bytes = CryptoJS.AES.decrypt(
        storedEncryptedUserData,
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      );
      const decryptedUserData = bytes.toString(CryptoJS.enc.Utf8);
      setUserData(JSON.parse(decryptedUserData));
    }
  }, []);

  // Function to handle logout
  // const logoutUser = () => {
  //   // Clear user data from local storage
  //   localStorage.removeItem("user");
  //   // Set user data to null
  //   setUserData(null);
  // };

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};
