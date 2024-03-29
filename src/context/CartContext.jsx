import { setDriver } from "mongoose";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { id } = useParams();
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

  const addToCart = (
    singleProduct,
    selectedColor,
    quantity,
    productPrice,
    selectedDimension,
  ) => {
    const itemId = singleProduct._id + selectedColor + selectedDimension;
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (
          item.id === itemId &&
          item.selectedColor === selectedColor &&
          item.selectedDimension === selectedDimension
        ) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      const newItem = {
        id: itemId,
        name: singleProduct.name,
        selectedColor,
        selectedDimension,
        productPrice,
        image: singleProduct.images[0],
        quantity,
        stock: singleProduct.stock,
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

  const increaseQuantity = (itemId) => {
    const selectedItem = cart.find((item) => item.id === itemId);
    if (selectedItem.quantity < selectedItem.stock) {
      const updatedCart = cart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    }
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
