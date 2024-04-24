import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

import SalePopupModal from "../salespop/SalePopupModal";

const HomePage = () => {
  return (
    <div>
      <SalePopupModal />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
