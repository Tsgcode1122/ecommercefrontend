import React from "react";

import styled from "styled-components";
import { useUserData } from "../../context/UserDataContext";
import colors from "../colors";

// Styled container component
const Container = styled.div`
  padding: 20px;
  background-color: transparent; /* Set background color */
  border-radius: 5px;
  color: ${colors.white};
`;

const Welcome = () => {
  const { userData } = useUserData();
  return (
    <Container>
      <h3>Welcome to Your Dashboard</h3> {/* Update the heading */}
      <p>
        Hey {userData && <strong>{userData.fullName}</strong>}, welcome back to
        your dashboard. Here is a quick overview of your store. Use the
        navigation bar to perform more tasks as the admin.
      </p>
    </Container>
  );
};

export default Welcome;
