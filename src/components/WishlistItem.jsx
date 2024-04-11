import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { message, Alert, Empty, Button, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { calculateSalePrice } from "../constant/Saleprice";
import { useWishlistContext } from "../context/WishlistContext";
import { useUserData } from "../context/UserDataContext";

const WishlistItem = () => {
  const { getWishlist, removeFromWishlist, clearWishlist } =
    useWishlistContext();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const wishlistData = await getWishlist();
        setWishlistProducts(wishlistData.wishlist);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Make sure to set loading to false on error
      }
    };
    if (userData) {
      fetchWishlist();
    }
  }, [getWishlist, userData]);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    message.success("Item removed from wishlist");
  };

  const handleClearWishlist = async () => {
    try {
      await clearWishlist();
      message.success("Wishlist cleared successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds delay (2 seconds)
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      message.error("Failed to clear wishlist");
    }
  };

  return (
    <>
      {!userData && (
        <Alert
          message={
            <>
              Please <Link to="/login">login</Link> to view your wishlist
            </>
          }
          type="warning"
          showIcon
          style={{ marginTop: "16rem" }}
        />
      )}
      {userData && (
        <>
          <WishlistContainer>
            {loading ? (
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Spin size="large" />
              </div>
            ) : wishlistProducts.length === 0 ? (
              <Empty
                imageStyle={{ height: 60 }}
                description={
                  <span>
                    Oops! No items in your wishlist.{" "}
                    <Link to="/products">Add items to your wishlist</Link> so
                    you can always see them for shopping.
                  </span>
                }
              />
            ) : (
              <>
                {wishlistProducts.map((wishlistItem) => (
                  <ProductCard key={wishlistItem.productId}>
                    {wishlistItem.product.onSale && (
                      <OnSaleLabel>On Sale</OnSaleLabel>
                    )}
                    <img
                      src={wishlistItem.product.images[0]}
                      alt={wishlistItem.product.name}
                    />
                    <Link
                      to={`/products/${wishlistItem.product._id}`}
                      className="link"
                    >
                      <div className="order">
                        <p>Select Options</p>
                        <div className="eye-icon">
                          <IoEyeOutline />
                        </div>
                      </div>

                      <div className="cart-name">
                        <h5>{wishlistItem.product.name}</h5>{" "}
                        {wishlistItem.product.onSale ? (
                          <SalePrice>
                            <span className="new-price">
                              ${calculateSalePrice(wishlistItem.product.price)}
                            </span>
                            <span className="old-price">
                              ${wishlistItem.product.price}
                            </span>
                          </SalePrice>
                        ) : (
                          <p>${wishlistItem.product.price}</p>
                        )}
                      </div>
                      {wishlistItem.product.variants.length > 0 &&
                        wishlistItem.product.variants[0].sizes.length > 0 &&
                        wishlistItem.product.variants[0].sizes[0].stock ===
                          0 && (
                          <OutOfStock className="out-of-stock">
                            Out of stock
                          </OutOfStock>
                        )}
                    </Link>
                    <RemoveButton
                      onClick={() =>
                        handleRemoveFromWishlist(wishlistItem.productId)
                      }
                    >
                      Remove
                    </RemoveButton>
                  </ProductCard>
                ))}
              </>
            )}
          </WishlistContainer>
          {wishlistProducts.length > 0 && (
            <Space
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "5rem",
              }}
            >
              <Button danger onClick={handleClearWishlist}>
                Clear Wishlist
              </Button>
            </Space>
          )}
        </>
      )}
    </>
  );
};

const WishlistContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  position: relative;
  @media screen and (max-width: 499px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  .link {
    text-decoration: none !important;
    color: none !important;
  }
`;

const ProductCard = styled.div`
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Align icons vertically at the bottom
  position: relative;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
    color: black !important;
  }

  p {
    font-size: 16px;
    color: #666666 !important;
    margin: 0;
  }
  .cart-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    padding: 0;
    margin: 0;
  }
  .icon-container {
    position: absolute;
    top: 5%;
    right: 1px;

    display: flex;
    /* justify-content: space-around; */
    flex-direction: column;
    gap: 240px;
    align-items: center;
    height: 100%;
  }

  .cart-icon {
    font-size: 22px;
  }

  .cart-icon:hover,
  .eye-icon:hover {
    color: #ff4500; // Change color on hover
  }
  .eye-icon {
    color: #666666 !important;
  }
  .order {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    align-items: center;
    justify-content: space-between;
    margin-top: -22px;
    margin-bottom: 12px;

    cursor: pointer;
    padding: 4px;
    display: flex;
    background-color: white;
    text-align: center;
  }
`;

const OnSaleLabel = styled.div`
  position: absolute;
  top: 5%;
  left: 10px;
  background-color: red;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;
const OutOfStock = styled.div`
  color: red;

  font-size: 14px;
`;

const SalePrice = styled.div`
  margin: 0;
  padding: 0;
  .new-price {
    font-weight: bold;
    color: red;
  }

  .old-price {
    text-decoration: line-through;
    color: #666666;
    margin-left: 5px;
  }
`;

const RemoveButton = styled.button`
  /* Add styles as needed */
`;

const ClearButton = styled.button`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 7rem;
`;

export default WishlistItem;
