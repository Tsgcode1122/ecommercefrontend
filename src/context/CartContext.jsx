import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color, dimension, currentPrice) => {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === product._id &&
        item.color === color &&
        item.dimension === dimension,
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newItem = {
        id: product._id,
        name: product.name,
        color,
        dimension,
        image,
        price: currentPrice,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => useContext(CartContext);
