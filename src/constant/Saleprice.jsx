// Function to calculate sale price
export const calculateSalePrice = (price) => {
  // Calculate 25% off the original price
  return Math.round(price - (25 / 100) * price);
};
