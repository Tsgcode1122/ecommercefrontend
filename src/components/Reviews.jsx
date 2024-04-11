import React from "react";
import { useParams } from "react-router-dom";
import { useReviewContext } from "../context/ReviewContext";
import { Collapse, Tabs, Rate } from "antd";
import styled from "styled-components";
import CreateReview from "./CreateReview";

const { Panel } = Collapse;

const Reviews = () => {
  const { id } = useParams();
  const { reviews, loading, getReviewsByProductId } = useReviewContext();
  const productReviews = getReviewsByProductId(id);
  console.log(productReviews);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const reviewEntails = () => {
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={`${productReviews.length} reviews`} key="1">
          {loading ? (
            <p>Loading reviews...</p>
          ) : productReviews.length > 0 ? (
            <ReviewsContainer>
              {productReviews.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewContent>
                    <ReviewTitle>User Review</ReviewTitle>
                    <Rate disabled defaultValue={review.rating} />
                    <p>{review.comment}</p>
                    <p>posted : {formatDate(review.createdAt)}</p>
                    <p>
                      Posted by:{" "}
                      {review.fullName && review.fullName.split(" ")[0]}
                    </p>
                  </ReviewContent>
                </ReviewItem>
              ))}
            </ReviewsContainer>
          ) : (
            <p>No reviews available</p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Write a review</span>} key="2">
          <CreateReview />
        </Tabs.TabPane>
      </Tabs>
    );
  };

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  return (
    <div className="review">
      <Collapse accordion>
        <Panel header="Product Details" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="Reviews" key="2">
          {reviewEntails()}
        </Panel>
        <Panel header="Shipping Details" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
};

const ReviewsContainer = styled.div`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

const ReviewContent = styled.div`
  padding: 10px;
`;

const ReviewTitle = styled.h3`
  margin-bottom: 10px;
`;

export default Reviews;
