// context/ReviewContext.js

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

  const createReview = async (newReviewData) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/reviews",
        newReviewData,
      );
      const newReview = response.data;
      setReviews([...reviews, newReview]);
    } catch (error) {
      console.error("Error creating review:", error);
      setError("Failed to create review");
    }
  };

  const updateReview = async (reviewId, updatedReviewData) => {
    try {
      reviewId = reviewId.trim();
      const response = await axios.put(
        `http://localhost:5005/api/reviews/${reviewId}`,
        updatedReviewData,
      );
      const updatedReview = response.data;
      setReviews(
        reviews.map((review) =>
          review._id === reviewId ? updatedReview : review,
        ),
      );
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Failed to update review");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5005/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review");
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        error,
        getReviewsByProductId,
        createReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);
