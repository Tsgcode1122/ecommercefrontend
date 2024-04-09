import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserData } from "./UserDataContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { id } = useParams();
  const { userData } = useUserData();
  const [cart, setCart] = useState([]);

  const userId = userData ? userData._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          setCart([]);
          const response = await axios.get(
            `http://localhost:5005/api/cart/getUserItems`,

            {
              params: {
                userId: userId,
              },
            },
          );
          const userDataCart = response.data.items;
          // i have to think on how i can always get items from database for register user, so when they login in new device, their cart will be updated
          if (userDataCart) {
            setCart(userDataCart);
          }
        } else {
          const storedCart = localStorage.getItem("cart");
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, [userId, userData]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (
    singleProduct,
    selectedColor,
    selectedSize,
    displayedPrice,
    quantity,
    availableStock,
    totalQuantityInCart,
  ) => {
    const itemId = singleProduct._id + selectedColor + selectedSize;

    // Check if the item exists in the cart
    const existingItemIndex = cart.findIndex((item) => item.id === itemId);

    if (existingItemIndex !== -1) {
      // If the item exists in the cart, update its quantity
      const updatedCart = cart.map((item, index) => {
        if (index === existingItemIndex) {
          const newQuantity = item.quantity + quantity;
          if (newQuantity > availableStock) {
            alert(
              `Cannot add more than available stock (${availableStock}) you have (${
                availableStock - totalQuantityInCart
              }) in your cart already`,
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

      if (userData) {
        // If user is logged in, update the cart in the database
        try {
          await axios.put(`http://localhost:5005/api/cart/update`, {
            userId: userId,
            itemId: itemId,
            quantity: updatedCart[existingItemIndex].quantity,
          });
          setCart(updatedCart);
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
      } else {
        setCart(updatedCart);
      }
    } else {
      // If the item does not exist in the cart, add it as a new item
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

      // Update the local cart state
      setCart([...cart, newItem]);

      if (userData) {
        // If user is logged in, add the new item to the cart in the database
        try {
          await axios.post(`http://localhost:5005/api/cart/addToCart`, {
            userId: userId,
            id: newItem.id,
            quantity: newItem.quantity,
            selectedColor: newItem.selectedColor,
            selectedSize: newItem.selectedSize,
            displayedPrice: newItem.displayedPrice,
            productImage: newItem.productImage,
            productName: newItem.productName,
            availableStock: newItem.availableStock,
          });
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      }
    }
  };

  const removeFromCart = async (productId) => {
    // If user is logged in, remove item from cart in the database
    if (userData) {
      try {
        await axios.delete(`http://localhost:5005/api/cart/remove`, {
          data: { userId: userId, productId },
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  const clearCart = async () => {
    // If user is logged in, clear cart in the database
    if (userData) {
      try {
        await axios.delete(`http://localhost:5005/api/cart/clear`, {
          data: { userId: userId },
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
      setCart([]);
    } else {
      setCart([]);
    }
  };

  const increaseQuantity = async (itemId) => {
    let selectedItem;
    if (userData) {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/cart/singleItem`,
          {
            params: {
              userId: userId,
              itemId: itemId,
            },
          },
        );
        selectedItem = response.data;
        console.log(selectedItem);
      } catch (error) {
        console.error("Error fetching item details:", error);
        return;
      }
    } else {
      // If user is not logged in, find the selected item from the local cart
      selectedItem = cart.find((item) => item.id === itemId);
    }

    // Ensure the selected item exists
    if (!selectedItem) {
      console.error("Selected item not found");
      return;
    }
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
      if (userData) {
        try {
          await axios.put(`http://localhost:5005/api/cart/update`, {
            userId: userId,
            quantity:
              selectedItem.quantity < selectedItem.availableStock
                ? selectedItem.quantity + 1
                : selectedItem.quantity,
            itemId: itemId,
          });
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
        setCart(updatedCart);
      } else {
        setCart(updatedCart);
      }

      // If user is logged in, update quantity in the database
    } else {
      console.log("you cant add more than available stock");
    }
  };

  const decreaseQuantity = async (itemId) => {
    let selectedItem;
    if (userData) {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/cart/singleItem`,
          {
            params: {
              userId: userId,
              itemId: itemId,
            },
          },
        );
        selectedItem = response.data;
      } catch (error) {
        console.error("Error fetching item details:", error);
        return;
      }
    } else {
      // If user is not logged in, find the selected item from the local cart
      selectedItem = cart.find((item) => item.id === itemId);
    }

    // Ensure the selected item exists
    if (!selectedItem) {
      console.error("Selected item not found");
      return;
    }

    // Decrease the quantity if it's greater than 1
    if (selectedItem.quantity > 1) {
      const updatedCart = cart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });

      if (userData) {
        try {
          await axios.put(`http://localhost:5005/api/cart/update`, {
            userId: userId,
            quantity: selectedItem.quantity - 1,
            itemId: itemId,
          });
        } catch (error) {
          console.error("Error updating cart item:", error);
        }
        setCart(updatedCart);
      } else {
        setCart(updatedCart);
      }
    }
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
