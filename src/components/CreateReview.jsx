import React, { useState } from "react";
import { Rate, Form, Button, Input, message } from "antd";
import axios from "axios";
import { useProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";

const CreateReview = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { products } = useProductContext();
  const productId = products.find((product) => product._id === id);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5005/api/reviews", {
        rating,
        comment,
        productId,
      });
      // Handle successful submission
      console.log("Review created:", response.data);
      // Show success message
      setSuccessMessage("Review submitted successfully!");
      // Reset form fields
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error creating review:", error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Create a Review</h2>
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
      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CreateReview;
