import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import SalesOrderSummary from "../components/SalesOrderSummary";
import ManageSummary from "../components/ManageSummary";
const Overview = () => {
  return (
    <Container>
      <Welcome />
      <SalesOrderSummary />
      <ManageSummary />
    </Container>
  );
};

const Container = styled.body`
  position: relative;
  background-color: transparent;
`;
export default Overview;
