import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import SalesOrderSummary from "../components/SalesOrderSummary";
const Overview = () => {
  return (
    <Container>
      <Welcome />
      <SalesOrderSummary />
    </Container>
  );
};

const Container = styled.body`
  position: relative;
  background-color: transparent;
`;
export default Overview;
