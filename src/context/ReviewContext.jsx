import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, []);

  const getReviewsByProductId = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        error,
        getReviewsByProductId,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);
