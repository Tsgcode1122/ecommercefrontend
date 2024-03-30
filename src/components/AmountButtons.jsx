import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useProductContext } from "../context/ProductContext";
const AmountButtons = () => {
  const { id } = useParams();
  const { loading, products } = useProductContext();
  const singleProduct = products.find((product) => product._id === id);
  const [quantity, setQuantity] = useState(singleProduct?.stock === 0 ? 0 : 1);
  const handleIncreaseQuantity = () => {
    // Ensure quantity doesn't exceed available stock
    setQuantity((prevQuantity) =>
      Math.min(prevQuantity + 1, singleProduct.stock),
    );
  };

  const handleDecreaseQuantity = () => {
    // Ensure quantity doesn't go below 1
    setQuantity((prevQuantity) =>
      Math.max(prevQuantity - 1, singleProduct.stock === 0 ? 0 : 1),
    );
  };
  return (
    <QuantityControl>
      <button
        type="button"
        className="amount-btn"
        onClick={handleDecreaseQuantity}
      >
        -
      </button>
      {quantity}
      <button
        type="button"
        className="amount-btn"
        onClick={handleIncreaseQuantity}
      >
        +
      </button>
    </QuantityControl>
  );
};
const QuantityControl = styled.div`
  margin-bottom: 10px;
`;
const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
