import React, { useState } from "react";
import { Rate, Form, Button, Input, message, Alert } from "antd";
import axios from "axios";
import { useProductContext } from "../context/ProductContext";
import { useParams, Link } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

const CreateReview = () => {
  const { id } = useParams();
  const { userData } = useUserData();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { products } = useProductContext();
  const productId = products.find((product) => product._id === id);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = userData ? userData._id : null;
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!userData) {
        throw new Error("Please log in to write a review.");
      }

      const response = await axios.post("http://localhost:5005/api/reviews", {
        rating,
        comment,
        productId,
        userId,
      });

      // Handle successful submission
      console.log("Review created:", response.data);
      // Show success message
      setSuccessMessage("Review submitted successfully!");
      // Reset form fields
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error creating review:", error.message);
      // Set error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Create a Review</h2>

      {errorMessage && <Alert message={errorMessage} type="error" />}

      {userData && (
        <Form onFinish={handleSubmit}>
          <Form.Item label="Rating">
            <Rate value={rating} onChange={handleRatingChange} required />
          </Form.Item>
          <Form.Item label="Comment">
            <Input.TextArea
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              required
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

      {!userData && (
        <Alert
          message={
            <>
              Kindly <Link to="/login">login</Link> to write a review.
            </>
          }
          type="warning"
          showIcon
          style={{ marginTop: "16px" }}
        />
      )}

      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CreateReview;
