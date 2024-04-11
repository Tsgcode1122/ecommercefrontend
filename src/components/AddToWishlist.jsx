import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CiHeart } from "react-icons/ci";
import { message, Spin } from "antd";
import { useWishlistContext } from "../context/WishlistContext";
import { useUserData } from "../context/UserDataContext";

const AddToWishlist = ({ productId }) => {
  const { addToWishlist, removeFromWishlist, checkProductInWishlist } =
    useWishlistContext();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  useEffect(() => {
    const fetchWishlistState = async () => {
      if (userData) {
        try {
          const isInWishlist = await checkProductInWishlist(productId);
          setAddedToWishlist(isInWishlist);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchWishlistState();
  }, [checkProductInWishlist, productId, userData]);
  const handleAddToWishlist = async () => {
    if (userData) {
      try {
        setLoading(true);
        if (addedToWishlist) {
          await removeFromWishlist(productId);
          message.success("Item removed from wishlist");
        } else {
          await addToWishlist(productId);
          message.success("Item added to wishlist");
        }
        setAddedToWishlist(!addedToWishlist);
      } catch (error) {
        console.error(error);
        message.error(
          addedToWishlist
            ? "Failed to remove item from wishlist"
            : "Failed to add item to wishlist",
        );
      } finally {
        setLoading(false); // Set loading to false after the operation completes
      }
    } else {
      message.error(
        <span>
          Please <a href="/login">login</a> to add item to wishlist.
        </span>,
      );
    }
  };

  return (
    <WishlistIcon onClick={handleAddToWishlist}>
      {loading && <Spin size="small" />}{" "}
      {/* Show loading spinner when loading is true */}
      <CiHeart color={addedToWishlist ? "red" : "grey"} />
    </WishlistIcon>
  );
};

const WishlistIcon = styled.div`
  font-size: 25px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666 !important;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
  border-radius: 50%;
  margin-bottom: 10px; // Add margin between icons

  &:hover {
    color: #ff4500;
  }
`;

export default AddToWishlist;
