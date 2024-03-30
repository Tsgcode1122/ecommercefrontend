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
    selectedSize,
    displayedPrice,
    quantity,
    availableStock,
    totalQuantityInCart,
  ) => {
    const itemId = singleProduct._id + selectedColor + selectedSize;
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingItemIndex) {
          const newQuantity = item.quantity + quantity;
          if (newQuantity > availableStock) {
            alert(
              `Cannot add more than available stock (${availableStock}) you have (${totalQuantityInCart}) in your cart already`,
            );
            return item;
          } else {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      if (quantity > availableStock) {
        alert(
          `Cannot add more than available stock (${availableStock}) you have (${quantity}) in your cart`,
        );
        return;
      }

      const newItem = {
        id: itemId,
        productName: singleProduct.name,
        selectedColor,
        selectedSize,
        displayedPrice,
        quantity,
        productImage: singleProduct.images[0],
        availableStock,
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
    if (selectedItem.quantity < selectedItem.availableStock) {
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
