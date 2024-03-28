import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import {
  FacebookOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const ShareProduct = () => {
  const { id } = useParams();
  const { products } = useProductContext(); // Access products from your context
  const productId = products.find((product) => product._id === id);

  // Define the productUrl
  const productUrl = productId ? `http://localhost:5173/products/${id}` : "";

  console.log(productUrl);
  const handleShare = (platform) => {
    // Logic to handle sharing based on the platform
    switch (platform) {
      case "facebook":
        shareOnFacebook();
        break;
      case "twitter":
        shareOnTwitter();
        break;
      case "whatsapp":
        shareOnWhatsapp();
        break;
      // case "instagram":
      //   shareOnInstagram();
      //   break;
      // default:
      //   break;
    }
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`);
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?status=${productUrl}`);
  };

  const shareOnWhatsapp = () => {
    window.open(`https://wa.me/?text=${productUrl}`);
  };

  const shareOnInstagram = () => {
    window.open(`https://www.instagram.com/?url=${productUrl}`);
  };

  return (
    <div>
      <span>Share:</span>
      <FacebookOutlined onClick={() => handleShare("facebook")} />
      <TwitterOutlined onClick={() => handleShare("twitter")} />
      <WhatsAppOutlined onClick={() => handleShare("whatsapp")} />
      {/* <InstagramOutlined onClick={() => handleShare("instagram")} /> */}
    </div>
  );
};

export default ShareProduct;
