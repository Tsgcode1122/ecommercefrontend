import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const useTotalPrice = (cart, discount) => {
  const [totalPrice, setTotalPrice] = useState(() => {
    // Retrieve total price from local storage, decrypt, and parse
    const encryptedTotalPrice = localStorage.getItem("encryptedTotalPrice");
    if (encryptedTotalPrice) {
      const bytes = CryptoJS.AES.decrypt(
        encryptedTotalPrice,
        "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
      );
      const decryptedTotalPrice = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedTotalPrice);
    } else {
      return 0;
    }
  });

  useEffect(() => {
    const calculateTotalPrice = () => {
      return (
        cart.reduce((total, item) => {
          return total + item.displayedPrice * item.quantity;
        }, 0) *
        (1 - discount)
      ); // Apply discount
    };

    const newTotalPrice = calculateTotalPrice().toFixed(2);
    setTotalPrice(newTotalPrice);

    // Encrypt and store total price to local storage
    const encryptedTotalPrice = CryptoJS.AES.encrypt(
      JSON.stringify(newTotalPrice),
      "b2116e7e6e4646b3713b7c3f225729987baedc5c98dbefc6b2d4cfc9ee246eb5",
    ).toString();
    localStorage.setItem("encryptedTotalPrice", encryptedTotalPrice);
  }, [cart, discount]);

  return totalPrice;
};

export default useTotalPrice;
