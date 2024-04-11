import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserData } from "./UserDataContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const { userData } = useUserData();
  const userId = userData ? userData._id : null;

  const addToWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:5005/api/wishlist", {
        productId,
        userId,
      });
      setWishlist([...wishlist, productId]);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete("http://localhost:5005/api/wishlist/removeWishlist", {
        data: { productId, userId },
      });
      setWishlist(wishlist.filter((id) => id !== productId));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete(
        "http://localhost:5005/api/wishlist/clearAllWishlist",
        {
          data: { userId },
        },
      );
      setWishlist([]);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/wishlist/getAllWishlist?userId=${userId}`,
      );

      return response.data;
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const checkProductInWishlist = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/wishlist/single/${userId}/${productId}`,
      );
      return response.data.isInWishlist;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        error,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlist,
        checkProductInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
