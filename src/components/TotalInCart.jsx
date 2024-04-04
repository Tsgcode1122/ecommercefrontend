import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";

const TotalInCart = () => {
  const { cart } = useCartContext();
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Calculate total quantity whenever cart changes
  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  return totalQuantity;
};

export default TotalInCart;
