import React from "react";
import styled from "styled-components";
import { useUserData } from "../context/UserDataContext";

const LogoutButton = ({ onClick }) => {
  const userData = useUserData(); // Retrieve userData from context

  const handleLogout = () => {
    // Call the logoutUser function to handle logout
    localStorage.removeItem("user");

    window.location.reload();

    // If onClick prop is provided, call it
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  /* Add your button styling here */
`;

export default LogoutButton;
