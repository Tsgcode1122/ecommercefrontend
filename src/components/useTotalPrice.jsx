import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const useTotalPrice = (cart, discount) => {
  const [totalPrice, setTotalPrice] = useState(0);

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
  }, [cart, discount]);

  return totalPrice;
};

export default useTotalPrice;
