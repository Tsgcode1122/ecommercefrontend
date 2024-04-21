import React from "react";
import { List, Button, Space, Modal, Rate, message, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useReviewContext } from "../../context/ReviewContext";
import { useProductContext } from "../../context/ProductContext";

const StyledProduct = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  margin: 1rem;
  background-color: #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  margin-right: 10px;
  width: 100px;
  height: 100px;
`;

const ReviewItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
`;

const Reviews = () => {
  const { reviews, error, deleteReview } = useReviewContext();
  const { products } = useProductContext();

  const showDeleteConfirm = (reviewId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteReview(reviewId);
      },
    });
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      message.success("Review deleted successfully");
    } catch (error) {
      message.error("Failed to delete review");
    }
  };

  const renderReviewItem = (review) => (
    <ReviewItem key={review._id}>
      <p>
        <strong>Posted by:</strong> {review.fullName}
      </p>
      <p>
        <strong>Star rating:</strong>{" "}
        <Rate disabled allowHalf defaultValue={review.rating} />
      </p>
      <p>
        <strong>Review comment:</strong> {review.comment}
      </p>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={() => showDeleteConfirm(review._id)}
      >
        Delete
      </Button>
    </ReviewItem>
  );

  const calculateTotalReviews = (productId) => {
    return reviews.filter((review) => review.productId === productId).length;
  };

  return (
    <div>
      <h2>All Reviews</h2>
      {error && <p>{error}</p>}
      {products.map((product) => (
        <StyledProduct key={product._id}>
          <h3>{product.name}</h3>
          <ProductImage src={product.images[0]} alt={product.name} />
          <p>Total Reviews: {calculateTotalReviews(product._id)}</p>
          <Divider />
          <List
            itemLayout="vertical"
            dataSource={reviews.filter(
              (review) => review.productId === product._id,
            )}
            renderItem={renderReviewItem}
            pagination={{
              pageSize: 2,
            }}
          />
          {/* {calculateTotalReviews(product._id) === 0 && <p>No reviews</p>} */}
        </StyledProduct>
      ))}
    </div>
  );
};

export default Reviews;
