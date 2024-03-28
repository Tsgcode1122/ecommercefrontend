import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { Collapse, Tabs } from "antd";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const Reviews = () => {
  const { id } = useParams();
  const { products } = useProductContext();
  const product = products.find((product) => product._id === id);

  const reviewEntails = () => {
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={`${product.reviews.length} reviews`} key="1">
          reviews array map here
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Write a review</span>} key="2">
          write a review
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
          <p>{product.description}</p>
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

export default Reviews;
