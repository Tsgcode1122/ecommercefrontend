import React, { useState, useEffect } from "react";

const PageVisits = () => {
  const [pageVisits, setPageVisits] = useState(0);

  useEffect(() => {
    // Retrieve page visits count from localStorage
    const storedVisits = localStorage.getItem("pageVisits");
    if (storedVisits) {
      setPageVisits(parseInt(storedVisits));
    }
  }, []);

  // Increment page visits count when component mounts
  useEffect(() => {
    // Increment page visits count
    const updatedVisits = pageVisits + 1;
    // Update page visits count in localStorage
    localStorage.setItem("pageVisits", updatedVisits);
    // Update state
    setPageVisits(updatedVisits);
  }, []);

  return <div>Total Page Visits: {pageVisits}</div>;
};

export default PageVisits;
