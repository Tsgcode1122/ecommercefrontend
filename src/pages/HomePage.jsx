import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

import SalePopupModal from "../salespop/SalePopupModal";
import Hero from "../components/Hero";
import NewestRelease from "../components/NewestRelease";

const HomePage = () => {
  return (
    <>
      <Hero />
      <SalePopupModal />
      <NewestRelease />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
